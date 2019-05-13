import { Blockchain } from './../../core/blockchain';
import { WalletEventEmitter, WalletEventType } from '../../core/wallet-event-emitter';
import { GenericTransaction, ITransactionOptions, TransactionStatus } from '../../core/transaction';
import { BN, Long } from '@zilliqa-js/util';
import { util as ZilliqaJsAccountUtil } from "@zilliqa-js/account";
import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";

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
        return {
            version: ( this.chainId << 16 ) + this.version, // add replay protection
            toAddr: ZilliqaJsCrypto.toChecksumAddress( this.to  ).replace("0x", ""),
            nonce: this.nonce,
            pubKey: subPubKey || "",
            amount: new BN( this.amount ),
            gasPrice: new BN( this.gasPrice ),
            gasLimit: Long.fromNumber(this.gasLimit),
            code: '',
            data: '',
            signature: "",
        };
    }

    public serialize() {
        throw new Error('moonlet-core:ZilliqaTransaction.serialize() not implemented');
    }

    public setLedgerSignResult() {
        throw new Error('moonlet-core:ZilliqaTransaction.setLedgerSignResult() not implemented');
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
