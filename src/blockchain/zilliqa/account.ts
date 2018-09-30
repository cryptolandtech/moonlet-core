import { GenericAccount, IaccountOptions } from "../../core/account";
// import { ZilliqaNode } from "./node";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { ZilliqaAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";

export class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {

    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }

    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance( this.address );
    }

    public getNonce(): Promise<number> {
        return this.node.getNonce(this.address);
    }

    public signTransaction(transaction: ZilliqaTransaction): boolean {
        throw new Error("Method not implemented.");
    }
    public signMessage(message: string): boolean {
        throw new Error("Method not implemented.");
    }

    public buildTransferTransaction(to: string, amount: number, nonce: number, options?: IZilliqaTransactionOptions): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public buildCancelTransaction(nonce: number,  priceInZil?: number): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public buildTransaction(): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public send(transaction: ZilliqaTransaction): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
