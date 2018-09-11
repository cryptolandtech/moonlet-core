import { GenericTransaction, ITransactionOptions } from '../../core/transaction';

export interface IEthereumTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
}

export class EthereumTransaction extends GenericTransaction<IEthereumTransactionOptions> {

}
