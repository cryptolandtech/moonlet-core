import { Ethereum } from './src/blockchain/ethereum/class.index';
import Wallet from './src/core/wallet';
import Zilliqa from './src/blockchain/zilliqa/class.index';
import { Blockchain } from './src/core/blockchain';


const x = new Wallet();
x.loadBlockchain(Ethereum);
x.loadBlockchain(Zilliqa);

x.createAccount(Blockchain.ETHEREUM);
x.createAccount(Blockchain.ZILLIQA);

const json = x.toJSON();

const w = Wallet.fromJson(json, [Ethereum, Zilliqa]);