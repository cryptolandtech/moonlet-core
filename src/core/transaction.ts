import { ITransactionOptions } from './transaction';
import BigNumber from 'bignumber.js';

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
    public data: Buffer;

    public receipt: any;
    public txn: string = "";
    public raw: Buffer = Buffer.from("");
    public status: TransactionStatus = TransactionStatus.NEW;

    constructor(from: string, to: string, nonce: number, options: TO) {
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;
    }

    public setSignedResult( data: Buffer ) {
        this.status = TransactionStatus.SIGNED;
        this.raw = data;
    }

    public setPending() {
        this.status = TransactionStatus.PENDING;
    }

    public setTxn( txn: string ) {
        this.status = TransactionStatus.FINAL;
        this.txn = txn;
    }

    public setReceiptStatus( receipt: any ) {
        this.receipt = receipt;
    }

    public getNumberToHex( num: number ): string {
        return "0x" + num.toString(16);
    }

    public abstract toParams();
}
