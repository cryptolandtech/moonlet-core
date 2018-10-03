import { ITransactionOptions } from './transaction';

export interface ITransactionOptions {
    //
}

export enum TransactionStatus {
    NEW = "NEW",
    SIGNED = "SIGNED",
    PENDING = "PENDING",
    FINAL = "FINAL",
}

export abstract class GenericTransaction<TO extends ITransactionOptions = ITransactionOptions> {

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Transaction";
    }

    public from: string;
    public to: string;
    public nonce: number;
    public options: TO;

    public txn: string = ""; // transaction id from blockchain
    public raw: Buffer = Buffer.from("");
    public status: TransactionStatus = TransactionStatus.NEW;

    constructor(from: string, to: string, amount: number, nonce: number, options: TO) {
        //
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;
    }
}
