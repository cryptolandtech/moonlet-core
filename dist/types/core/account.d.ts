/// <reference types="node" />
import { GenericTransaction, ITransactionOptions } from './transaction';
import { GenericNode } from "./node";
import HDKey from './utils/hdkey';
import { GenericAccountUtils } from './account-utils';
import { BigNumber } from "bignumber.js";
export declare enum AccountType {
    HD = "HD",
    LOOSE = "LOOSE",
    HARDWARE = "HARDWARE"
}
export interface IaccountOptions {
    node: GenericNode;
    privateKey?: string;
    publicKey?: string;
    address?: string;
    type: AccountType;
    hd?: any;
}
export declare abstract class GenericAccount<T extends GenericTransaction = GenericTransaction, TO extends ITransactionOptions = ITransactionOptions> {
    static getImplementedClassName(name: string): string;
    node: GenericNode;
    address: string;
    publicKey: string;
    privateKey: string;
    type: AccountType;
    hd: HDKey | any;
    utils: GenericAccountUtils | any;
    supportsCancel: boolean;
    private transactions;
    /**
     * Creates an instance of generic account.
     * @param accountOptions
     */
    constructor(accountOptions: IaccountOptions);
    /**
     * Trys hd wallet setup
     */
    tryHdWalletSetup(): void;
    /**
     * Gets transactions
     * @returns transactions
     */
    getTransactions(): T[];
    /**
     * Sends generic account
     * @param transaction
     * @param [cb]
     * @param [cbtype]
     * @returns send
     */
    send(transaction: T, cb?: any, cbtype?: string): Promise<{
        txn: any;
        receipt: any;
    }>;
    /**
     * Gets balance
     * @returns balance
     */
    abstract getBalance(): Promise<BigNumber>;
    /**
     * Gets nonce
     * @returns nonce
     */
    abstract getNonce(): Promise<number>;
    /**
     * Builds cancel transaction if supported by the implementation
     *
     * @remarks
     * Sending a transaction with the same nonce but with higher gas price
     * will cancel an existing non mined transaction if included into a block.
     *
     * @param nonce         - account nonce
     * @param txGasPrice    - gas price in lowest denominator
     * @returns a new cancel transaction
     */
    abstract buildCancelTransaction(nonce: number, txGasPrice: number): GenericTransaction | false;
    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasLimit
     * @param txGasPrice
     * @returns transfer transaction
     */
    abstract buildTransferTransaction(to: string, amount: number, nonce: number, txGasPrice: number, txGasLimit: number): T;
    /**
     * Estimates transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [txGasPrice]
     * @param [txGasLimit]
     * @returns a cost estimate
     */
    abstract estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txGasPrice?: number, txGasLimit?: number): Promise<number>;
    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param gasLimit
     * @param gasPrice
     * @returns transaction
     */
    abstract buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, gasPrice: number, gasLimit: number): GenericTransaction;
    /**
     * Signs transaction
     * @param transaction
     * @returns serialized data
     */
    abstract signTransaction(transaction: T): Buffer;
}
