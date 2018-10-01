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
    txn: string;
    raw: Buffer;
    status: TransactionStatus;
    constructor(from: string, to: string, amount: number, nonce: number, options: TO);
}
