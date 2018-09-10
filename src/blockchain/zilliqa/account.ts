import { GenericAccount, IAccountInfo } from "../../core/account";
import { ZilliqaNode } from "./node";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";

export class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {

    constructor(node: ZilliqaNode, accountInfo: IAccountInfo) {
        super(node, accountInfo);
    }

    public signTransaction(transaction: ZilliqaTransaction): boolean {
        throw new Error("Method not implemented.");
    }
    public signMessage(message: string): boolean {
        throw new Error("Method not implemented.");
    }

    public buildTransferTransaction(to: string, amount: number, options?: IZilliqaTransactionOptions): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public buildCancelTransaction(): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public buildTransaction(): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public send(transaction: ZilliqaTransaction): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
