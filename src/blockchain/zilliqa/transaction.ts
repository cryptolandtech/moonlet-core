import { isBech32 } from '@zilliqa-js/util/dist/validation';
import { Blockchain } from './../../core/blockchain';
import { WalletEventEmitter, WalletEventType } from '../../core/wallet-event-emitter';
import { GenericTransaction, ITransactionOptions, TransactionStatus } from '../../core/transaction';
import { BN, Long } from '@zilliqa-js/util';
import * as ZilliqaJsAccountUtil from "@zilliqa-js/account/dist/util";
import { fromBech32Address } from "@zilliqa-js/crypto/dist/bech32"

export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
    pubKey?: string;
    code?: Buffer;
    data?: Buffer;
}

export class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    public version: number = 1;
    public pubKey: string;
    public code: Buffer;

    public chainId: number;
    public gasPrice: number;
    public gasLimit: number;
    public usedGas: number;

    public TXObject: any;


    /**
     * Creates an instance of a zilliqa transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from: string, to: string, amount: string, nonce: number, options: IZilliqaTransactionOptions) {
        super(from, to, amount, nonce, options);

        this.pubKey = options.pubKey || "";
        this.code = options.code || Buffer.from("");

        this.chainId = options.chainId;
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
    }

    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    public toParams( subPubKey?: string ) {
        let toAddr = isBech32(this.to) ? fromBech32Address(this.to) : this.to;
        return {
            version: ( this.chainId << 16 ) + this.version, // add replay protection
            toAddr: toAddr.replace("0x", ""),
            nonce: this.nonce,
            pubKey: subPubKey || this.pubKey || "",
            amount: new BN( this.amount ),
            gasPrice: new BN( this.gasPrice ),
            gasLimit: Long.fromNumber(this.gasLimit),
            code: this.options.code.toString(),
            data: this.options.data.toString(),
            signature: "",
        };
    }

    public serialize() {
        const params = this.toParams();

        return {
            ...params,
            amount: params.amount.toString(),
            gasPrice: params.gasPrice.toString(),
            gasLimit: params.gasLimit.toString()
        }
    }

    public setLedgerSignResult(params) {
        const TXObject = this.toParams( this.pubKey.replace("0x", "") );

        // the address should be checksummed and we need to lowercase it for signing
        // add 0x back to signing payload
        TXObject.toAddr = TXObject.toAddr.toLowerCase();

        TXObject.signature = params.sig;

        const serialized = Buffer.from(JSON.stringify(TXObject));
        this.TXObject = TXObject;
        this.setSignedResult(serialized);
    }

    /**
     * Gets proto encoded tx
     * @param TXObject
     * @returns proto encoded tx
     */
    public getProtoEncodedTx(TXObject): Buffer {
        return ZilliqaJsAccountUtil.encodeTransactionProto(TXObject);
    }

    public setTxn(data: any) {
        super.setTxn(data);
        if (data.TranID) {
            this.id = data.TranID;
        }
    }

    public updateData(data: any) {
        if (data.ID === this.id) {
            if (data.receipt) {
                this.usedGas = data.receipt.cumulative_gas;
                this.setStatus(data.receipt.success ? TransactionStatus.SUCCESS : TransactionStatus.FAILED);
                WalletEventEmitter.emit(WalletEventType.TRANSACTION_UPDATE, {
                    blockchain: Blockchain.ZILLIQA,
                    address: this.from,
                    transactionId: this.id,
                    status: this.status
                });
            }
        }
    }
}
