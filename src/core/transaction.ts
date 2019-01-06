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
    public times: any = [];

    constructor(from: string, to: string, nonce: number, options: TO) {
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;

        this.addTime("creation");
    }

    /**
     * Sets transaction status to signed, adds raw data and indexes event
     * @param data
     */
    public setSignedResult( data: Buffer ) {
        this.addTime("signed");
        this.status = TransactionStatus.SIGNED;
        this.raw = data;
    }

    /**
     * Sets transaction status to pending and indexes event
     * @param data
     */
    public setPending() {
        this.addTime("pending");
        this.status = TransactionStatus.PENDING;
    }

    /**
     * Sets transaction status to final, adds txn and indexes event
     * @param data
     */
    public setTxn( txn: string ) {
        this.addTime("final");
        this.status = TransactionStatus.FINAL;
        this.txn = txn;
    }

    /**
     * Sets transaction receipt and indexes event
     * @param data
     */
    public setReceiptStatus( receipt: any ) {
        this.addTime("receipt");
        this.receipt = receipt;
    }

    /**
     * Converts number to hex string
     * @param num
     * @returns hex representation
     */
    public getNumberToHex( num: number ): string {
        return "0x" + num.toString(16);
    }

    /**
     * Adds time to current event
     * @param eventName
     */
    public addTime(eventName: string) {
        this.times.push({
            name: eventName,
            unixtime: Math.round((new Date()).getTime() / 1000),
        });
    }

    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    public abstract toParams();
}
