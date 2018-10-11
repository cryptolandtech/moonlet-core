import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        network_id: 0,
        name: "Main net",
        chainId: 1,
        blockchain: Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://mainnet.infura.io/",
        HDCoinValue: 60, // 60 = Ethereum Main Network!
    },
    {
        network_id: 1,
        name: "Ropsten",
        chainId: 3,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://ropsten.infura.io/",
        HDCoinValue: 1, // Test Net
    },
    {
        network_id: 2,
        name: "Rinkeby",
        chainId: 4,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://rinkeby.infura.io/",
        HDCoinValue: 1, // Test Net
    },
    {
        network_id: 3,
        name: "Kovan",
        chainId: 42,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://kovan.infura.io/",
        HDCoinValue: 1, // Test Net
    },
    {
        network_id: 4,
        name: "Ganache - TestRPC",
        chainId: 15,
        blockchain: Blockchain.ETHEREUM,
        mainNet: false,
        url: "http://127.0.0.1:8545/",
        HDCoinValue: 60, // 60 since ganache wants to emulate Main Net
    },
];

export default networks;
