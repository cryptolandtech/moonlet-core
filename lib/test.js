"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_1 = require("./core/wallet");
const blockchain_1 = require("./core/blockchain");
// create new wallet, without mnemonics
let wallet = new wallet_1.default();
// const x = wallet.getAccountsMap();
// create new wallet from mnemonics
wallet = new wallet_1.default("word1 word2 ... wordN");
// create an account
const accountTest = wallet.createAccount(blockchain_1.Blockchain.ETHEREUM);
console.log(accountTest.address);
// get all available accounts
const account = wallet.getAccounts(blockchain_1.Blockchain.ETHEREUM)[0];
// create transaction
let transaction = account.buildTransferTransaction("0x02", 1);
transaction.options.gasLimit = 50000;
transaction.options.gasPrice = 1;
// or
transaction = account.buildTransferTransaction("0x02", 1, { gasLimit: 50000, gasPrice: 1, chainId: 1 });
// sign transaction
account.signTransaction(transaction);
// post transaction to blockchain
account.send(transaction);
/*
// call method on node
wallet.getNode(Blockchain.ETHEREUM).getBalance(account.address);

// add a new account in wallet (an account that is not generated from the mnemonics of the wallet)
const newAccount = new EthereumAccount(wallet.getNode(Blockchain.ETHEREUM), {privateKey: "private key...", type: AccountType.LOOSE});
wallet.importAccount(newAccount);

// hardware wallet
const hwAccount = new EthereumAccount(wallet.getNode(Blockchain.ETHEREUM), {address: "0x132", type: AccountType.HARDWARE});
wallet.importAccount(hwAccount);
const hwTransaction = hwAccount.buildTransferTransaction("0x321", 1);
// send sign request to hardware wallet device
hwTransaction.raw = new Buffer(12); // output from hardware device
hwAccount.send(hwTransaction);

// a more simple approach, to
const eth = wallet.getBlockchain(Blockchain.ETHEREUM);
const acc = eth.createAccount();
eth.getNode().getBalance(acc.address);

*/
//# sourceMappingURL=test.js.map