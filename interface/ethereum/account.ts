import { GenericAccount } from "../core/account";
import { EthereumNode } from "./node";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
   
    constructor(node: EthereumNode, accountInfo) {
        super(node, accountInfo);
    }

    signTransaction(transaction: EthereumTransaction) {
        throw new Error("Method not implemented.");
    }
    signMessage(message: string) {
        throw new Error("Method not implemented.");
    }

    buildTransferTransaction(to: string, amount: number, options?: IEthereumTransactionOptions): EthereumTransaction {
        throw new Error("Method not implemented.");
    }

    buildCancelTransaction(): EthereumTransaction{
        throw new Error("Method not implemented.");
    }

    buildTransaction(): EthereumTransaction{
        throw new Error("Method not implemented.");
    }

    send(transaction: EthereumTransaction): Promise<string> {
        throw new Error("Method not implemented.");
    }
}