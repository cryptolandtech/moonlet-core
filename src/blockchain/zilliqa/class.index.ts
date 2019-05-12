import { ZilliqaAccountUtils } from './account-utils';
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
    ZilliqaAccountUtils
};

export const Zilliqa: IBlockchainImplementation = {
    AvailableClasses,
    config,
    networks,
};

export default Zilliqa;
