import { WalletEventEmitter, WalletEventType, WalletEventData } from './src/core/wallet-event-emitter';
import { TransactionTracker } from './src/core/transactions-tracker';
import { ZilliqaTransaction } from './src/blockchain/zilliqa/transaction';
import { Ethereum } from './src/blockchain/ethereum/class.index';
import Wallet from './src/core/wallet';
import Zilliqa from './src/blockchain/zilliqa/class.index';
import { Blockchain } from './src/core/blockchain';


WalletEventEmitter.subscribe((type: WalletEventType, data: WalletEventData) => {
    console.log('Event', type, data);
});

(async function () {

    
    const x = new Wallet('gadget clean certain tiger abandon prevent light pluck muscle obtain mobile agree');
    x.loadBlockchain(Ethereum);
    x.loadBlockchain(Zilliqa);
    
    const eth = x.createAccount(Blockchain.ETHEREUM, 2);
    const eth2 = x.createAccount(Blockchain.ETHEREUM, 2);
    
    const zil = x.createAccount(Blockchain.ZILLIQA, 1);
    const zil2 = x.createAccount(Blockchain.ZILLIQA, 1);
    
    x.switchNetwork(Blockchain.ETHEREUM, 2);
    x.switchNetwork(Blockchain.ZILLIQA, 1);
    
    console.log(x.getBlockchain(Blockchain.ETHEREUM).getAccounts().map(a => a.address));
    console.log(x.getBlockchain(Blockchain.ZILLIQA).getAccounts().map(a => a.address));
    
    
    // const zilTx = zil.buildTransferTransaction(
    //     zil2.address,
    //     1 * Math.pow(10, 12),
    //     21,
    //     1000000000,
    //     1
    // );
    // zil.signTransaction(zilTx);
    // zil.send(zilTx);


    const ethTx = eth.buildTransferTransaction(
        eth2.address,
        0.1 * Math.pow(10, 18),
        9,
        20 * Math.pow(10, 9),
        21000
    );
    eth.signTransaction(ethTx);
    eth.send(ethTx);
})();