import { ZilliqaAccount } from "./account";
import { ZilliqaNode } from "./node";
import { ZilliqaTransaction } from "./transaction";

import config from "./config";
import networks from "./networks";
import { IBlockchainImplementation } from "../../core/blockchain-implementation";

const AvailableClasses = {
    ZilliqaAccount,
    ZilliqaNode,
    ZilliqaTransaction,
};

export const Zilliqa: IBlockchainImplementation = {
    AvailableClasses,
    config,
    networks,
};

export default Zilliqa;
