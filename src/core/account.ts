import { GenericTransaction, ITransactionOptions } from './transaction';
import { GenericNode } from "./node";

export enum AccountType {
    HD = "HD",
    LOOSE = "LOOSE",
    HARDWARE = "HARDWARE",
}

export interface IAccountInfo {
    privateKey?: string;
    publicKey?: string;
    address?: string;
    type: AccountType;
    // TODO: need to clarify fields for each account type
}

export abstract class GenericAccount<T extends GenericTransaction = GenericTransaction, TO extends ITransactionOptions = ITransactionOptions> {
    [key: string]: any;

    public node: GenericNode;
    public address: string;
    public publicKey: string;
    public privateKey: string;

    private transactions: T[] = [];

    constructor(node: GenericNode, accountInfo: IAccountInfo) {
        this.node = node;

        if (!(accountInfo.privateKey && accountInfo.address && accountInfo.publicKey)) {
            throw new Error("Private key, public key or address is mandatory.");
        }

        switch (accountInfo.type) {
            case AccountType.HD:
                this.privateKey = accountInfo.privateKey;
                this.publicKey = accountInfo.publicKey;
                this.address = accountInfo.address;
                // add path

                //
                break;
            case AccountType.LOOSE:
                this.privateKey = accountInfo.privateKey;
                this.publicKey = "";
                this.address = "";
                break;
            case AccountType.HARDWARE:
                this.privateKey = "";
                this.publicKey = "";
                this.address = accountInfo.address;
                break;

            default:
                throw new Error("accountInfo.type" + accountInfo.type + " not found");
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
