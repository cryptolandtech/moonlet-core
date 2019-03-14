import { Ethereum } from './src/blockchain/ethereum/class.index';
import Wallet from './src/core/wallet';
import Zilliqa from './src/blockchain/zilliqa/class.index';
import { Blockchain } from './src/core/blockchain';


const x = new Wallet('gadget clean certain tiger abandon prevent light pluck muscle obtain mobile agree');
x.loadBlockchain(Ethereum);
x.loadBlockchain(Zilliqa);

x.createAccount(Blockchain.ETHEREUM);
x.createAccount(Blockchain.ETHEREUM);
x.createAccount(Blockchain.ETHEREUM, 1);
x.createAccount(Blockchain.ETHEREUM);



x.switchNetwork(Blockchain.ETHEREUM,0);
console.log(x.getBlockchain(Blockchain.ETHEREUM).getAccounts().map(a => a.address));
