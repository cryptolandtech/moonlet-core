import { TransactionTracker } from './transactions-tracker';
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

export enum HWDevice {
    LEDGER = 'LEDGER'
}

export interface IaccountOptions {
    node: GenericNode;
    privateKey?: string;
    publicKey?: string;
    address?: string;
    type: AccountType;
    hd?: any;
    //hw specifics to identify an account
    deviceType?: HWDevice;
    accountIndex?: string;
    derivationIndex?: string;
    derivationPath?: string;
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

    public name: string;
    public node: GenericNode;
    public address: string = "";
    public publicKey: string = "";
    public privateKey: string = "";
    public type: AccountType;
    public hd: HDKey | any;
    public deviceType: HWDevice;
    public accountIndex: string = "";
    public derivationIndex: string = "";
    public derivationPath: string = "";
    public utils: GenericAccountUtils | any;
    public supportsCancel: boolean = false;
    public transactions: T[] = [];
    public disabled = false;
    public addressFormats: {[format:string]: string};

    /**
     * Creates an instance of generic account.
     * @param accountOptions
     */
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
                if (!accountOptions.deviceType) {
                    throw new Error("accountOptions.deviceType parameter missing");
                }
                this.deviceType = accountOptions.deviceType;

                if (!accountOptions.address) {
                    throw new Error("accountOptions.address parameter missing");
                }
                this.address = accountOptions.address;

                if (!accountOptions.accountIndex) {
                    throw new Error("accountOptions.accountIndex parameter missing");
                }               
                this.accountIndex = accountOptions.accountIndex;

                if (!accountOptions.derivationIndex) {
                    throw new Error("accountOptions.derivationIndex parameter missing");
                }
                this.derivationIndex = accountOptions.derivationIndex;

                this.publicKey = accountOptions.publicKey;
                this.derivationPath = accountOptions.derivationPath;
                break;

            default:
                throw new Error("accountOptions.type '" + accountOptions.type + "' not found");
        }

        this.type = accountOptions.type;
        this.addressFormats = {
            default: this.address
        };
    }

    /**
     * Trys hd wallet setup
     */
    public tryWalletSetup() {
        if (this.type === AccountType.HD && this.hd !== undefined ) {
            this.privateKey = this.utils.bufferToHex( this.hd.getPrivateKey() );
            this.publicKey = this.utils.bufferToHex( this.utils.privateToPublic( this.hd.getPrivateKey() ) );
            this.address = this.utils.toChecksumAddress( this.utils.privateToAddress( this.hd.getPrivateKey() ).toString("hex") );
        } else if (this.type === AccountType.LOOSE) {
            this.publicKey = this.utils.bufferToHex( this.utils.privateToPublic( Buffer.from( this.privateKey, "hex" ) ) );
            this.address = this.utils.toChecksumAddress( this.utils.privateToAddress( Buffer.from( this.privateKey, "hex" ) ).toString("hex") );
        }
        this.addressFormats.default = this.address;
    }

    /**
     * Gets transactions
     * @returns transactions
     */
    public getTransactions(): T[] {
        return this.transactions;
    }

    /**
     * Sends transaction
     * @param transaction
     * @param [cb]
     * @param [cbtype]
     * @returns send
     */
    public send(transaction: T): Promise<{txn, receipt}> {
        this.transactions.push( transaction );

        if (transaction.status === TransactionStatus.SIGNED) {
            transaction.setPending();
            return this.node.send( transaction ).then( (txndata) => {
                transaction.setTxn( txndata );
                TransactionTracker.register(this, transaction);
                
                // kaya does not throw this error properly..
                if (txndata === "Invalid Tx Json") {
                    throw new Error("Invalid Tx Json");
                }

                // load extra transaction details
                return this.node.getTransactionReceipt( transaction ).then(receiptdata => {
                    return Promise.resolve( { txn: txndata, receipt: receiptdata} );
                }).catch(error => {
                    return Promise.resolve( { txn: txndata, receipt: undefined } );
                });

            }).catch( (error) => {
                return Promise.reject( new Error(error) );
            });

        }
        return Promise.reject( new Error("Transaction status needs to be SIGNED") );
    }

    /**
     * Gets balance
     * @returns balance
     */
    public abstract getBalance(): Promise<BigNumber>;

    /**
     * Gets nonce
     * @returns nonce
     */
    public abstract getNonce(): Promise<number>;

    /**
     * Builds cancel transaction if supported by the implementation
     *
     * @remarks
     * Sending a transaction with the same nonce but with higher gas price
     * will cancel an existing non mined transaction if included into a block.
     *
     * @param nonce         - account nonce
     * @param txGasPrice    - gas price in lowest denominator
     * @returns a new cancel transaction
     */
    public abstract buildCancelTransaction(nonce: number, txGasPrice: number): GenericTransaction | false;

    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasLimit
     * @param txGasPrice
     * @returns transfer transaction
     */
    public abstract buildTransferTransaction(to: string, amount: string, nonce: number, txGasPrice: number, txGasLimit: number): T;

    /**
     * Estimates transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [txGasPrice]
     * @param [txGasLimit]
     * @returns a cost estimate
     */
    public abstract estimateTransaction(to: string, amount: string, nonce: number, txdata: Buffer, txGasPrice?: number, txGasLimit?: number): Promise<number>;

    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param gasLimit
     * @param gasPrice
     * @returns transaction
     */
    public abstract buildTransaction(to: string, amount: string, nonce: number, gasPrice: number, gasLimit: number, extra: {}): GenericTransaction;

    /**
     * Signs transaction
     * @param transaction
     * @returns serialized data
     */
    public abstract signTransaction(transaction: T): Buffer;

    public abstract signMessage(msg: Buffer | string): string;

}
