import { GenericTransaction, ITransactionOptions } from '../core/transaction';

export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    pubKey: string;
    code: string;
}

export class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    public version: number = 0.1;
    public pubKey: string;
    public code: string;

    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions) {
        super(from, to, amount, nonce, options);

        this.pubKey = options.pubKey;
        this.code = options.code;

    }
}
