import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    pubKey: string;
    code: string;
}
export declare class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    version: number;
    pubKey: string;
    code: string;
    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions);
}
