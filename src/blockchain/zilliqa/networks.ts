import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        name: "Main net",
        networkId: 1,
        blockchain: Blockchain.ZILLIQA,
        mainNet: true,
        url: "https://...",
        HDCoinValue: 10018, // 10018 = Proposed as Zilliqa Main Network!
    },
    {
        name: "Test net",
        networkId: 2,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "https://...",
        HDCoinValue: 1,
    },
];

export default networks;
