import { Blockchain } from '../core/blockchain';
import { Network } from '../core/network';

const networks: Network[] = [
    {
        name: "Main net",
        blockchain: Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://...",
    },
];

export default networks;
