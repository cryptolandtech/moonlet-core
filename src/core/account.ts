import { GenericTransaction, ITransactionOptions } from './transaction';
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

    public abstract getBalance(): Promise<BigNumber>;
    public abstract getNonce(): Promise<number>;

    public abstract buildTransferTransaction(to: string, amount: number, nonce: number, priceInNativeBase?: number): T;
    public abstract buildCancelTransaction(nonce: number, priceInNativeBase?: number): T;
    public abstract buildTransaction(): T;

    public abstract signTransaction(transaction: T): boolean;
    public abstract signMessage(message: string): boolean;

    public abstract send(transaction: T): Promise<string>;
}
