import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        name: "Main net",
        chainId: 1,
        blockchain: Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://mainnet.infura.io/",
        HDCoinValue: 60, // 60 = Ethereum Main Network!
    },
    {
        name: "Ropsten",
        chainId: 3,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://ropsten.infura.io/",
        HDCoinValue: 1, // Test Net
    },
    {
        name: "Rinkeby",
        chainId: 4,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://rinkeby.infura.io/",
        HDCoinValue: 1, // Test Net
    },
    {
        name: "Kovan",
        chainId: 42,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://kovan.infura.io/",
        HDCoinValue: 1, // Test Net
    },
];

export default networks;
