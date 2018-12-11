/// <reference types="node" />
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
    supportsCancel: boolean;
    private transactions;
    constructor(accountOptions: IaccountOptions);
    tryHdWalletSetup(): void;
    getTransactions(): T[];
    send(transaction: T, cb?: any, cbtype?: string): Promise<{
        txn: any;
        receipt: any;
    }>;
    abstract getBalance(): Promise<BigNumber>;
    abstract getNonce(): Promise<number>;
    buildCancelTransaction(nonce: number): any;
    abstract estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number>;
    abstract buildTransferTransaction(to: string, amount: number, nonce: number, gasLimit: number, gasPrice: number): T;
    abstract estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer): Promise<number>;
    abstract buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, gasLimit: number, priceInGWei: number): GenericTransaction;
    abstract signTransaction(transaction: T): Buffer;
    abstract signMessage(message: string): Buffer;
}
