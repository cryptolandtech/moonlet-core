/// <reference types="node" />
import { ITransactionOptions } from './transaction';
export interface ITransactionOptions {
}
export declare enum TransactionStatus {
    NEW = "NEW",
    SIGNED = "SIGNED",
    PENDING = "PENDING",
    FINAL = "FINAL"
}
export declare abstract class GenericTransaction<TO extends ITransactionOptions = ITransactionOptions> {
    static getImplementedClassName(name: string): string;
    from: string;
    to: string;
    nonce: number;
    options: TO;
    data: Buffer;
    receipt: any;
    txn: string;
    raw: Buffer;
    status: TransactionStatus;
    times: any;
    constructor(from: string, to: string, nonce: number, options: TO);
    /**
     * Sets transaction status to signed, adds raw data and indexes event
     * @param data
     */
    setSignedResult(data: Buffer): void;
    /**
     * Sets transaction status to pending and indexes event
     * @param data
     */
    setPending(): void;
    /**
     * Sets transaction status to final, adds txn and indexes event
     * @param data
     */
    setTxn(txn: string): void;
    /**
     * Sets transaction receipt and indexes event
     * @param data
     */
    setReceiptStatus(receipt: any): void;
    /**
     * Converts number to hex string
     * @param num
     * @returns hex representation
     */
    getNumberToHex(num: number): string;
    /**
     * Adds time to current event
     * @param eventName
     */
    addTime(eventName: string): void;
    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    abstract toParams(): any;
}
