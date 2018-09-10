import { GenericTransaction, ITransactionOptions } from '../../core/transaction';

export interface IEthereumTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
}

export class EthereumTransaction extends GenericTransaction<IEthereumTransactionOptions> {

}
