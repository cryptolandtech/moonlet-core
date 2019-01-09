/// <reference types="node" />
import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { BigNumber } from "bignumber.js";
export declare class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {
    /**
     * Creates an instance of zilliqa account.
     * @param accountOptions
     */
    constructor(accountOptions: IaccountOptions);
    /**
     * Gets balance
     * @returns a promise of a balance
     */
    getBalance(): Promise<BigNumber>;
    /**
     * Gets nonce
     * @returns a promise of a nonce
     */
    getNonce(): Promise<number>;
    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasLimit
     * @param txGasPrice
     * @returns transfer transaction
     */
    buildTransferTransaction(to: string, amount: number, nonce: number, txGasLimit: number, txGasPrice: number): ZilliqaTransaction;
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
    estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txGasPrice?: number, txGasLimit?: number): Promise<number>;
    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param txGasPrice
     * @param txGasLimit
     * @returns transaction
     */
    buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txGasPrice?: number, txGasLimit?: number): ZilliqaTransaction;
    /**
     * Signs transaction
     * @param transaction
     * @returns serialized data
     */
    signTransaction(transaction: ZilliqaTransaction): Buffer;
    /**
     * not supported
     */
    buildCancelTransaction(nonce: number, txGasPrice: number): ZilliqaTransaction | false;
}
