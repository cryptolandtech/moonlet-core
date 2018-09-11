import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        name: "Main net",
        chainId: 1,
        blockchain: Blockchain.ZILLIQA,
        mainNet: true,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 10018, // 10018 = Proposed as Zilliqa Main Network!
    },
    {
        name: "Test net",
        chainId: 2,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 1, // testnet
    },
];

export default networks;
