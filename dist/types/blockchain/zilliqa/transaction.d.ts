/// <reference types="node" />
/// <reference types="bn.js" />
/// <reference types="long" />
import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
import { BN, Long } from '@zilliqa-js/util';
export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
    pubKey?: string;
    code?: Buffer;
    data?: Buffer;
}
export declare class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    version: number;
    pubKey: string;
    code: Buffer;
    amount: number;
    chainId: number;
    gasPrice: number;
    gasLimit: number;
    TXObject: any;
    txn: any;
    /**
     * Creates an instance of a zilliqa transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions);
    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    toParams(subPubKey?: string): {
        version: number;
        toAddr: string;
        nonce: number;
        pubKey: string;
        amount: BN;
        gasPrice: BN;
        gasLimit: Long;
        code: string;
        data: string;
        signature: string;
    };
    /**
     * Gets proto encoded tx
     * @param TXObject
     * @returns proto encoded tx
     */
    getProtoEncodedTx(TXObject: any): Buffer;
}
