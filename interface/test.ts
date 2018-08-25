import Wallet from "./core/wallet";
import Ethereum from "./ethereum";
import { Blockchain } from "./core/blockchain";

// create new wallet, without mnemonics
let wallet = new Wallet();

// create new wallet from mnemonics
wallet = new Wallet("word1 word2 ... wordN");

// create an account
let account = wallet.createAccount(Blockchain.ETHEREUM);

// get all available accounts
account = wallet.getAccounts(Blockchain.ETHEREUM)[0];

// sign a transaction
let transaction = account.signTransaction();

// post transaction to blockchain
wallet.getNode(Blockchain.ETHEREUM).send(transaction);

// call method on node
wallet.getNode(Blockchain.ETHEREUM).getBalance(account);

// add a new account in wallet (an account that is not generated from the mnemonics of the wallet)
let newAccount = new Ethereum.Account("private key...");
wallet.import(newAccount);

// a more simple approach, to 
let eth = wallet.getBlockchain(Blockchain.ETHEREUM);
let acc = eth.createAccount();
eth.getNode().getBalance(acc);

transaction = acc.signTransaction();
eth.getNode().send(transaction);



