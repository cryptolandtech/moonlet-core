import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        name: "Main net",
        networkId: 1,
        blockchain: Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://...",
        HDCoinValue: 60, // 60 = Ethereum Main Network!
    },
    {
        name: "Test net",
        networkId: 2,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://...",
        HDCoinValue: 1, // Test Net
    },
];

export default networks;
