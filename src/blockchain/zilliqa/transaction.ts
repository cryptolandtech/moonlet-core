import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
import { BN, Long } from '@zilliqa-js/util';
import { util as ZilliqaJsAccountUtil } from "@zilliqa-js/account";

import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";
import Signature from 'elliptic/lib/elliptic/ec/signature';

export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
    pubKey?: string;
    code?: Buffer;
}

export class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    public version: number = 1;
    public pubKey: string;
    public code: Buffer;
    public amount: number;

    public chainId: number;
    public gasPrice: number;
    public gasLimit: number;
    public TXObject: any;

    public txn: any;

    /**
     * Creates an instance of a zilliqa transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions) {
        super(from, to, nonce, options);

        this.amount = amount;
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
            version: (( this.chainId << 16 ) + this.version).toString(), // add replay protection
            toAddr: this.to.replace("0x", ""),
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

    /**
     * Gets proto encoded tx
     * @param TXObject
     * @returns proto encoded tx
     */
    public getProtoEncodedTx(TXObject): Buffer {
        return ZilliqaJsAccountUtil.encodeTransactionProto(TXObject);
    }

    /**
     * Validates zilliqa transaction
     * @param params
     * @param signature
     * @param publicKey
     * @returns true if valid, otherwise false
     */
    public validate(params: any, signature: string, publicKey: string ): boolean {

        return ZilliqaJsCrypto.schnorr.verify(
            this.getProtoEncodedTx( params ),
            new Signature({
                r: new BN(signature.slice(0, 64), 16),
                s: new BN(signature.slice(64), 16),
            }),
            Buffer.from(publicKey.replace("0x", ""), 'hex'),
        );
    }
}
