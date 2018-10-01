import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { BigNumber } from "bignumber.js";
export declare class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
    defaultGasPriceInGwei: number;
    constructor(accountOptions: IaccountOptions);
    getBalance(): Promise<BigNumber>;
    getNonce(): Promise<number>;
    GWeiToWei(input: number): number;
    signTransaction(transaction: EthereumTransaction): boolean;
    signMessage(message: string): boolean;
    buildTransferTransaction(to: string, amount: number, nonce: number, options?: IEthereumTransactionOptions): EthereumTransaction;
    buildCancelTransaction(nonce: number, priceInGWei?: number): EthereumTransaction;
    buildTransaction(): EthereumTransaction;
    send(transaction: EthereumTransaction): Promise<string>;
}
