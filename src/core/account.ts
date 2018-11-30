import { GenericTransaction, ITransactionOptions, TransactionStatus } from './transaction';
import { GenericNode } from "./node";
import HDKey from './utils/hdkey';
import { GenericAccountUtils } from './account-utils';
import { BigNumber } from "bignumber.js";

export enum AccountType {
    HD = "HD",
    LOOSE = "LOOSE",
    HARDWARE = "HARDWARE",
}

export interface IaccountOptions {
    node: GenericNode;
    privateKey?: string;
    publicKey?: string;
    address?: string;
    type: AccountType;
    hd?: any;
    // TODO: need to clarify fields for each account type
}

export abstract class GenericAccount<
        T extends GenericTransaction = GenericTransaction,
        TO extends ITransactionOptions = ITransactionOptions,
    > {

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Account";
    }

    public node: GenericNode;
    public address: string = "";
    public publicKey: string = "";
    public privateKey: string = "";
    public type: AccountType;
    public hd: HDKey | any;
    public utils: GenericAccountUtils | any;
    public supportsCancel: boolean = false;

    private transactions: T[] = [];

    constructor(accountOptions: IaccountOptions) {
        this.node = accountOptions.node;

        switch (accountOptions.type) {
            case AccountType.HD:
                if (!accountOptions.hd) {
                    throw new Error("accountOptions.hd parameter missing");
                }
                this.hd = accountOptions.hd;
                break;
            case AccountType.LOOSE:
                if (!accountOptions.privateKey) {
                    throw new Error("accountOptions.privateKey parameter missing");
                }
                this.privateKey = accountOptions.privateKey;
                break;
            case AccountType.HARDWARE:
                if (!accountOptions.address) {
                    throw new Error("accountOptions.address parameter missing");
                }
                this.address = accountOptions.address;
                break;

            default:
                throw new Error("accountOptions.type '" + accountOptions.type + "' not found");
        }

        this.type = accountOptions.type;
    }

    public tryHdWalletSetup() {
        if (this.type === AccountType.HD && this.hd !== undefined ) {
            this.privateKey = this.utils.bufferToHex( this.hd.getPrivateKey() );
            this.publicKey = this.utils.bufferToHex( this.utils.privateToPublic( this.hd.getPrivateKey() ) );
            this.address = this.utils.toChecksumAddress( this.utils.privateToAddress( this.hd.getPrivateKey() ).toString("hex") );
        }
    }

    public getTransactions(): T[] {
        return this.transactions;
    }

    public send(transaction: T, cb?: any, cbtype?: string): Promise<{txn, receipt}> {
        this.transactions.push( transaction );

        if (transaction.status === TransactionStatus.SIGNED) {
            transaction.setPending();
            return this.node.send( transaction ).then( (txndata) => {
                transaction.setTxn( txndata );
                if (cb !== undefined && cbtype === "txn") {
                    cb(null, txndata);
                }

                // kaya does not throw this error properly..
                if (transaction.txn === "Invalid Tx Json") {
                    throw new Error("Invalid Tx Json");
                }

                // load extra transaction details
                return this.node.getTransactionReceipt( transaction ).then(receiptdata => {
                    if (cb !== undefined && cbtype === undefined) {
                        cb(null, receiptdata);
                    }
                    return Promise.resolve( { txn: txndata, receipt: receiptdata} );
                });

            }).catch( (error) => {
                if (cb !== undefined) {
                    cb(error);
                }
                return Promise.reject( new Error(error) );
            });

        }
        return Promise.reject( new Error("Transaction status needs to be SIGNED") );
    }

    public abstract getBalance(): Promise<BigNumber>;
    public abstract getNonce(): Promise<number>;

    public buildCancelTransaction(nonce: number): any {
        //
    }
    // transfer transactions
    public abstract estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number>;
    public abstract buildTransferTransaction(to: string, amount: number, nonce: number, gasLimit: number, gasPrice: number): T;

    // future custom transactions
    public abstract estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer): Promise<number>;
    public abstract buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, gasLimit: number, priceInGWei: number): GenericTransaction;

    public abstract signTransaction(transaction: T): Buffer;
    public abstract signMessage(message: string): Buffer;
}
