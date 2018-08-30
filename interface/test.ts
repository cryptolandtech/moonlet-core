import Wallet from "./core/wallet";
import { Blockchain } from "./core/blockchain";
import { AccountType } from "./core/account";
import { EthereumAccount } from "./ethereum/account";

// create new wallet, without mnemonics
let wallet = new Wallet();

// create new wallet from mnemonics
wallet = new Wallet("word1 word2 ... wordN");

// create an account
let accountTest = wallet.createAccount(Blockchain.ETHEREUM);

// get all available accounts
let account = <EthereumAccount>(wallet.getAccounts(Blockchain.ETHEREUM)[0]);


// create transaction
let transaction  = account.buildTransferTransaction("0x02", 1);
transaction.options.gasLimit = 50000;
transaction.options.gasPrice = 1;
// or 
transaction = account.buildTransferTransaction("0x02", 1, {gasLimit: 50000, gasPrice: 1});

// sign transaction
account.signTransaction(transaction);

// post transaction to blockchain
account.send(transaction);

// call method on node
wallet.getNode(Blockchain.ETHEREUM).getBalance(account.address);

// add a new account in wallet (an account that is not generated from the mnemonics of the wallet)
let newAccount = new EthereumAccount(wallet.getNode(Blockchain.ETHEREUM), {privateKey: "private key...", type: AccountType.LOOSE});
wallet.import(newAccount);

// hardware wallet
let hwAccount = new EthereumAccount(wallet.getNode(Blockchain.ETHEREUM), {address: "0x132", type: AccountType.HW});
wallet.import(hwAccount);
let hwTransaction = hwAccount.buildTransferTransaction("0x321", 1);
// send sign request to hardware wallet device
hwTransaction.raw = new ArrayBuffer(12); // output from hardware device
hwAccount.send(hwTransaction);

// a more simple approach, to 
let eth = wallet.getBlockchain(Blockchain.ETHEREUM);
let acc = eth.createAccount();
eth.getNode().getBalance(acc.address);



