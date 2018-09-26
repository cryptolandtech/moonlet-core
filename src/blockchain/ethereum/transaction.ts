import { GenericTransaction, ITransactionOptions } from '../../core/transaction';

export interface IEthereumTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
}

export class EthereumTransaction extends GenericTransaction<IEthereumTransactionOptions> {
    public value: number;
    public chainId: number;

    constructor(from: string, to: string, amount: number, nonce: number, options: IEthereumTransactionOptions) {
        super(from, to, amount, nonce, options);

        this.chainId = options.chainId;
        this.value = amount;

    }
}
