import { ZilliqaAccount } from "./account";
import { ZilliqaNode } from "./node";
import { ZilliqaTransaction } from "./transaction";
declare const AvailableClasses: {
    ZilliqaAccount: typeof ZilliqaAccount;
    ZilliqaNode: typeof ZilliqaNode;
    ZilliqaTransaction: typeof ZilliqaTransaction;
};
export { AvailableClasses, };
