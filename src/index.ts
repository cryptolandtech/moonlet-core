
// import Storage from "./base/storage/storage";
// const appStorage = new Storage();
// appStorage.set("test", "value");

import HDWallet from "./base/wallet/HDWallet";
const { Zilliqa } = require("zilliqa.js");

const APIURL = "https://scillaprod-api.aws.zilliqa.com";

const zilliqa = new Zilliqa({
    nodeUrl: APIURL,
});

const node = zilliqa.getNode();

// const wallet = new HDWallet();
const wallet = new HDWallet({
    hdPathString: `m/44'/10018'/0'/0`, // update https://github.com/satoshilabs/slips/blob/master/slip-0044.md once ID is agreed upon
    mnemonic:"between culture long bounce pact oxygen panel fun assist favorite symptom floor",
});

const ReceiverAddres = "5FC7409B4B41E06E73BA1AA7F3127D93C76BD557";

const HowManyAccounts = 2; // how many accounts do we want to generate ?

async function doTest() {

    await wallet.addAccounts( HowManyAccounts );

    let accounts = await wallet.getAccounts();
    console.log("accounts: ", accounts);

    let addr = accounts[0];
    const privateKey = wallet.getPrivateKeyForAccount(addr);

    console.log( "Address:", addr );
    node.getBalance({ address: addr }, function(err: any, balance: any) {

        console.log("balance:", balance);

        let nextNonce = parseInt(balance.result.nonce);

        let txnDetails = {
            version: 0,
            nonce: nextNonce + 1,
            to: ReceiverAddres,
            amount: 1,
            gasPrice: 1,
            gasLimit: 1
        };
        
        console.log("txnDetails:", txnDetails);

        let txn = zilliqa.util.createTransactionJson(privateKey, txnDetails);
        console.log("genTx:", txn);

        // send txn into network
        /*

        https://explorer-scilla.zilliqa.com/transactions/788603582a1f9f37b4f051e15c08a669774de7a3c9414b46fe73e80532c96330

        node.createTransaction(txn, function(err: any, data: any) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log(data);
            }
        }); 
        */
    });

}

doTest();
