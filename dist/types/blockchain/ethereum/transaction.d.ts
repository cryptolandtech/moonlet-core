/// <reference types="node" />
import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
export interface IEthereumTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
    data?: Buffer;
}
export declare class EthereumTransaction extends GenericTransaction<IEthereumTransactionOptions> {
    value: number;
    chainId: number;
    gasPrice: number;
    gasLimit: number;
    constructor(from: string, to: string, amount: number, nonce: number, options: IEthereumTransactionOptions);
    toParams(): {
        nonce: any;
        gasPrice: string;
        gasLimit: string;
        to: string;
        value: string;
        data: string;
        chainId: string;
    };
}
