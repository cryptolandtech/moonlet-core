import { GenericTransaction, ITransactionOptions } from './transaction';
import { GenericNode } from "./node";
import HDKey from './utils/hdkey';
import { GenericAccountUtils } from './account-utils';
import { BigNumber } from "bignumber.js";
export declare enum AccountType {
    HD = "HD",
    LOOSE = "LOOSE",
    HARDWARE = "HARDWARE"
}
export interface IaccountOptions {
    node: GenericNode;
    privateKey?: string;
    publicKey?: string;
    address?: string;
    type: AccountType;
    hd?: any;
}
export declare abstract class GenericAccount<T extends GenericTransaction = GenericTransaction, TO extends ITransactionOptions = ITransactionOptions> {
    static getImplementedClassName(name: string): string;
    node: GenericNode;
    address: string;
    publicKey: string;
    privateKey: string;
    type: AccountType;
    hd: HDKey | any;
    utils: GenericAccountUtils | any;
    private transactions;
    constructor(accountOptions: IaccountOptions);
    tryHdWalletSetup(): void;
    getTransactions(): T[];
    abstract getBalance(): Promise<BigNumber>;
    abstract getNonce(): Promise<number>;
    abstract buildTransferTransaction(to: string, amount: number, nonce: number, options?: TO): T;
    abstract buildCancelTransaction(nonce: number, priceInGWei: number): T;
    abstract buildTransaction(): T;
    abstract signTransaction(transaction: T): boolean;
    abstract signMessage(message: string): boolean;
    abstract send(transaction: T): Promise<string>;
}
