/// <reference types="node" />
import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { BigNumber } from "bignumber.js";
export declare class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
    defaultGasPriceInGwei: number;
    supportsCancel: boolean;
    constructor(accountOptions: IaccountOptions);
    getBalance(): Promise<BigNumber>;
    getNonce(): Promise<number>;
    GWeiToWei(input: number): number;
    buildCancelTransaction(nonce: number, priceInGWei?: number): EthereumTransaction;
    estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number>;
    buildTransferTransaction(to: string, amount: number, nonce: number, priceInGWei?: number): EthereumTransaction;
    estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, priceInGWei?: number): Promise<number>;
    buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txgasLimit: number, priceInGWei: number): EthereumTransaction;
    signTransaction(transaction: EthereumTransaction): Buffer;
    signMessage(message: string): Buffer;
}
