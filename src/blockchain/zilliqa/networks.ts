import { Blockchain } from '../../core/blockchain';
import { Network } from '../../core/network';

const networks: Network[] = [
    {
        network_id: 0,
        name: "Main net",
        chainId: 1,
        blockchain: Blockchain.ZILLIQA,
        mainNet: true,
        url: "https://api.zilliqa.com/",
        explorerTxPattern: "https://viewblock.io/zilliqa/tx/{txn}",
        explorerAccountPattern: 'https://viewblock.io/zilliqa/address/{addr}',
        HDCoinValue: 313,
    },
    {
        network_id: 1,
        name: "Dev",
        chainId: 333,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "https://dev-api.zilliqa.com/",
        explorerTxPattern: "https://viewblock.io/zilliqa/tx/{txn}?network=testnet",
        explorerAccountPattern: 'https://viewblock.io/zilliqa/address/{addr}?network=testnet',
        HDCoinValue: 1, // testnet
    },
    {
        network_id: 2,
        name: "Kaya - TestRPC",
        chainId: 2,
        blockchain: Blockchain.ZILLIQA,
        mainNet: false,
        url: "http://127.0.0.1:4200/",
        HDCoinValue: 1, // Test Net
    },
];

export default networks;
