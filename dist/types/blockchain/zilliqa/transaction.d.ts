/// <reference types="node" />
/// <reference types="bn.js" />
/// <reference types="long" />
import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
import { BN, Long } from '@zilliqa-js/util';
export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    pubKey?: string;
    code?: Buffer;
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
    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions);
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
    getProtoEncodedTx(TXObject: any): Buffer;
    validate(params: any, signature: string, publicKey: string): boolean;
}
