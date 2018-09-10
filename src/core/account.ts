import { GenericTransaction, ITransactionOptions } from './transaction';
import { GenericNode } from "./node";

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
    // TODO: need to clarify fields for each account type
}

export abstract class GenericAccount<T extends GenericTransaction = GenericTransaction, TO extends ITransactionOptions = ITransactionOptions> {
    // [key: string]: any;

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Account";
    }

    public node: GenericNode;
    public address: string;
    public publicKey: string;
    public privateKey: string;

    private transactions: T[] = [];

    constructor(accountOptions: IaccountOptions) {
        this.node = accountOptions.node;

        switch (accountOptions.type) {
            case AccountType.HD:
                if (!accountOptions.privateKey) {
                    throw new Error("accountOptions.privateKey parameter missing");
                }
                this.privateKey = accountOptions.privateKey;
                this.publicKey = "";
                this.address = "";
                // add path

                //
                break;
            case AccountType.LOOSE:
                if (!accountOptions.privateKey) {
                    throw new Error("accountOptions.privateKey parameter missing");
                }
                this.privateKey = accountOptions.privateKey;
                this.publicKey = "";
                this.address = "";
                break;
            case AccountType.HARDWARE:
                if (!accountOptions.address) {
                    throw new Error("accountOptions.address parameter missing");
                }
                this.privateKey = "";
                this.publicKey = "";
                this.address = accountOptions.address;
                break;

            default:
                throw new Error("accountOptions.type '" + accountOptions.type + "' not found");
        }

    }

    public getTransactions(): T[] {
        return this.transactions;
    }

    public abstract buildTransferTransaction(to: string, amount: number, options?: TO): T;
    public abstract buildCancelTransaction(): T;
    public abstract buildTransaction(): T;

    public abstract signTransaction(transaction: T): boolean;
    public abstract signMessage(message: string): boolean;

    public abstract send(transaction: T): Promise<string>;
}
