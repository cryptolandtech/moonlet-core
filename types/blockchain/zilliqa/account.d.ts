import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { BigNumber } from "bignumber.js";
export declare class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {
    constructor(accountOptions: IaccountOptions);
    getBalance(): Promise<BigNumber>;
    getNonce(): Promise<number>;
    signTransaction(transaction: ZilliqaTransaction): boolean;
    signMessage(message: string): boolean;
    buildTransferTransaction(to: string, amount: number, nonce: number, options?: IZilliqaTransactionOptions): ZilliqaTransaction;
    buildCancelTransaction(nonce: number, priceInZil?: number): ZilliqaTransaction;
    buildTransaction(): ZilliqaTransaction;
    send(transaction: ZilliqaTransaction): Promise<string>;
}
