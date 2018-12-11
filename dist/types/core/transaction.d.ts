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
    setSignedResult(data: Buffer): void;
    setPending(): void;
    setTxn(txn: string): void;
    setReceiptStatus(receipt: any): void;
    getNumberToHex(num: number): string;
    addTime(eventName: string): void;
    abstract toParams(): any;
}
