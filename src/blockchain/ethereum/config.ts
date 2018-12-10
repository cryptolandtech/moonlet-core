import { Blockchain } from './../../core/blockchain';
import { IBlockchainConfig } from '../../core/blockchain-config';

export const EthereumConfig: IBlockchainConfig = {
    blockchain: Blockchain.ETHEREUM,
    mainCoin: "ETH",
    units: {
        WEI: 18,
        GWEI: 9,
    },
};

export default EthereumConfig;
