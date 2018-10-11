import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        network_id: 0,
        name: "Main net",
        chainId: 1,
        blockchain: Blockchain.ZILLIQA,
        mainNet: true,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 10018, // 10018 = Proposed as Zilliqa Main Network!
    },
    {
        network_id: 1,
        name: "Test net",
        chainId: 2,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 1, // testnet
    },
    {
        network_id: 2,
        name: "Kaya - TestRPC",
        chainId: 15,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "http://127.0.0.1:4200/",
        HDCoinValue: 1, // Test Net
    },
];

export default networks;
