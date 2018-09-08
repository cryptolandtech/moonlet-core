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
    public from: string;
    public to: string;
    public amount: number; // switch to BN
    public nonce: number;
    public options: TO;

    public txn: string = ""; // transaction id from blockchain
    public raw: Buffer = new Buffer("");
    public status: TransactionStatus = TransactionStatus.NEW;

    constructor(from: string, to: string, amount: number, nonce: number, options: TO) {
        //
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.nonce = nonce;
        this.options = options;
    }
}
