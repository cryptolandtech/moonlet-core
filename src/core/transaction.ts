import { BigNumber } from 'bignumber.js';
import { ITransactionOptions } from './transaction';

export interface ITransactionOptions {
    //
}

export enum TransactionStatus {
    CREATED = "CREATED",
    SIGNED = "SIGNED",
    SUBMITTED = "SUBMITTED",
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export abstract class GenericTransaction<TO extends ITransactionOptions = ITransactionOptions> {

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Transaction";
    }

    public id: string = "";
    public from: string;
    public to: string;
    public nonce: number;
    public amount: string;
    public options: TO;
    public data: Buffer;

    // public receipt: any;
    public raw: Buffer = Buffer.from("");
    public status: TransactionStatus = TransactionStatus.CREATED;
    public times: any = [];

    constructor(from: string, to: string, amount: string, nonce: number, options: TO) {
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;
        this.amount = amount;

        this.addTime(TransactionStatus.CREATED);
    }

    /**
     * Sets transaction status to signed, adds raw data and indexes event
     * @param data
     */
    public setSignedResult( data: Buffer ) {
        this.addTime(TransactionStatus.SIGNED);
        this.status = TransactionStatus.SIGNED;
        this.raw = data;
    }

    /**
     * Sets transaction status to pending and indexes event
     * @param data
     */
    public setPending() {
        this.addTime(TransactionStatus.PENDING);
        this.status = TransactionStatus.PENDING;
    }

    public setStatus(status: TransactionStatus) {
        this.addTime(status);
        this.status = status;
    };

      /**
     * Sets transaction status to final, adds txn and indexes event
     * @param data
     */
    public setTxn( txn: string ) {
        this.addTime(TransactionStatus.SUBMITTED);
        this.status = TransactionStatus.PENDING;
    }

    /**
     * Converts number to hex string
     * @param num
     * @returns hex representation
     */
    public getNumberToHex( num: number | BigNumber ): string {
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

    public abstract updateData(data: any);
    public abstract serialize();
    public abstract setLedgerSignResult(params);
}
