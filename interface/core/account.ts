import { GenericTransaction, ITransactionOptions } from './transaction';
import { GenericNode } from "./node";

export enum AccountType {
    HD = "HD", 
    LOOSE = "LOOSE",
    HW = "HW"
}

interface IAccountInfo {
    privateKey?: string, 
    publicKey?: string,
    address?: string,
    type: AccountType,
    // TODO: need to clarify fields for each account type
}

export abstract class GenericAccount<T extends GenericTransaction = GenericTransaction, TO extends ITransactionOptions = ITransactionOptions> {
    node: GenericNode;
    address: string;
    publicKey: string;
    privateKey: string;

    private transactions: T[];

    constructor(node: GenericNode, accountInfo: IAccountInfo) {
        if (!(accountInfo.privateKey || accountInfo.address || accountInfo.publicKey)) {
            throw new Error("Private key, public key or address is mandatory.");
        }

        this.privateKey = accountInfo.privateKey;
        this.publicKey = accountInfo.publicKey;
        this.address = accountInfo.address;
    }

    getTransactions(): T[] {
        return this.transactions;
    }

    abstract buildTransferTransaction(to: string, amount: number, options?: TO): T;
    abstract buildCancelTransaction(): T;
    abstract buildTransaction(): T;

    abstract signTransaction(transaction: T);
    abstract signMessage(message: string);

    abstract send(transaction: T): Promise<string>;
}
