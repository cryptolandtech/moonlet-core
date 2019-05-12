import { IBlockchainImplementation } from "../../core/blockchain-implementation";

import { EthereumAccount } from "./account";
import { EthereumNode } from "./node";
import { EthereumTransaction } from "./transaction";

import config from "./config";
import networks from "./networks";
import { EthereumAccountUtils } from "./account-utils";

const AvailableClasses = {
    EthereumAccount,
    EthereumNode,
    EthereumTransaction,
    EthereumAccountUtils
};

export const Ethereum: IBlockchainImplementation = {
    AvailableClasses,
    config,
    networks,
};

export default Ethereum;
