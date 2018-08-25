import { Network } from '../core/network';
import { Blockchain } from '../core/blockchain';

const networks: Network[] = [
    {
        name: "Main net",
        blockchain: Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://..."
    }
];

export default networks;