/// <reference types="node" />
import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { BigNumber } from "bignumber.js";
export declare class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {
    minGasPriceInZil: number;
    minGasLimit: number;
    constructor(accountOptions: IaccountOptions);
    getBalance(): Promise<BigNumber>;
    getNonce(): Promise<number>;
    estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number>;
    buildTransferTransaction(to: string, amount: number, nonce: number, txgasLimit: number, priceInZil: number): ZilliqaTransaction;
    estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, priceInGWei?: number): Promise<number>;
    buildTransaction(): ZilliqaTransaction;
    signTransaction(transaction: ZilliqaTransaction): Buffer;
    signMessage(message: string): Buffer;
}
