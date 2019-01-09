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
    amount: number;
    /**
     * Creates an instance of an ethereum transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from: string, to: string, amount: number, nonce: number, options: IEthereumTransactionOptions);
    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
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
