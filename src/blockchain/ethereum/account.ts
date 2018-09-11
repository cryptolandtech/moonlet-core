import { GenericAccount, IaccountOptions, AccountType } from "../../core/account";
import { EthereumNode } from "./node";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { EthereumAccountUtils } from "./account-utils";

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {

    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new EthereumAccountUtils();
        this.tryHdWalletSetup();
    }

    public signTransaction(transaction: EthereumTransaction): boolean {
        throw new Error("Method not implemented.");
    }
    public signMessage(message: string): boolean {
        throw new Error("Method not implemented.");
    }

    public buildTransferTransaction(to: string, amount: number, options?: IEthereumTransactionOptions): EthereumTransaction {
        throw new Error("Method not implemented.");
    }

    public buildCancelTransaction(): EthereumTransaction {
        throw new Error("Method not implemented.");
    }

    public buildTransaction(): EthereumTransaction {
        throw new Error("Method not implemented.");
    }

    public send(transaction: EthereumTransaction): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
