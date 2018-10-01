import { EthereumAccount } from "./account";
import { EthereumNode } from "./node";
import { EthereumTransaction } from "./transaction";
declare const AvailableClasses: {
    EthereumAccount: typeof EthereumAccount;
    EthereumNode: typeof EthereumNode;
    EthereumTransaction: typeof EthereumTransaction;
};
export { AvailableClasses, };
