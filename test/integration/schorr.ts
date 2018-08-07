import { Zilliqa } from "zilliqa.js";

const zilliqa = new Zilliqa({ nodeUrl: "https://scillaprod-api.aws.zilliqa.com" });

const txnDetails = {
    version: 0,
    nonce: 1,
    to: "5FC7409B4B41E06E73BA1AA7F3127D93C76BD557",
    amount: 1,
    gasPrice: 1,
    gasLimit: 1,
};

// address 0xBFFB05370B9B00ADE22E43F74461D3019C80E2A0
const privateKey = "3C44987879FA78F7523558179E6C9A52ECE396044C6D5137BE08D2C54E2AF55D";

// console.log("txnDetails:", txnDetails);

const txn = zilliqa.util.createTransactionJson( privateKey, txnDetails );

console.log(txn);

/*
const node = zilliqa.getNode();

// const wallet = new HDWallet();
const wallet = new HDWallet({
    coin: "ZIL", // update https://github.com/satoshilabs/slips/blob/master/slip-0044.md once ID is agreed upon
    mnemonic: "between culture long bounce pact oxygen panel fun assist favorite symptom floor",
    // mnemonic: "awake book subject inch gentle blur grant damage process float month clown",
});

const ReceiverAddres = "5FC7409B4B41E06E73BA1AA7F3127D93C76BD557";

const HowManyAccounts = 2; // how many accounts do we want to generate ?

async function doTest() {

    await wallet.addAccounts( HowManyAccounts );
    const accounts = await wallet.getAccounts();
    // console.log("getAccounts done", accounts);

    const addr = accounts[0];
    const privateKey = wallet.getPrivateKeyForAccount(addr);

    console.log( "privateKey:", privateKey );
    console.log( "Address:", addr );

    node.getBalance({ address: addr }, ( err: any, balance: any ) => {

        console.log("balance:", balance);

        const nextNonce = parseInt(balance.result.nonce, 2);

        const txnDetails = {
            version: 0,
            nonce: nextNonce + 1,
            to: ReceiverAddres,
            amount: 1,
            gasPrice: 1,
            gasLimit: 1,
        };

        console.log("txnDetails:", txnDetails);

        const txn = zilliqa.util.createTransactionJson( privateKey, txnDetails );
        console.log("genTx:", txn);

        // send txn into network

        // node.createTransaction(txn, function(err: any, data: any) {
        //    if (err) {
        //       console.log("Error", err);
        //    } else {
        //        console.log(data);
        //    }
        // });

    });

}

doTest();
*/
