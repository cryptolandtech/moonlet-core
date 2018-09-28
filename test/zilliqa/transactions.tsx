import { assert } from "chai";
import mocha from "mocha";

const BN = require( 'bn.js' );
import { util as OfficialUtil } from 'zilliqa-js';
import { Zilliqa } from 'zilliqa-js';

describe("Zilliqa", async () => {

    describe("Transaction Test", async () => {

        it("Should work", async () => {

const zilliqa = new Zilliqa({
    nodeUrl: 'http://localhost:4200',
});

const privateKey = "db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3";
const myCode = "";
const contractState = [
{
    vname: "owner",
    type : "ByStr20",
    value : "7bb3b0e8a59f3f61d9bff038f4aeb42cae2ecce8",
},
{
    vname: "_creation_block",
    type: "BNum",
    value: "1",
}];

const transactionDetails = {
    version: 0,
    nonce: 1,
    to: '0000000000000000000000000000000000000000',
    amount: new BN( 0 ) ,
    gasPrice: 1,
    gasLimit: 5000,
    code: myCode,
    data: JSON.stringify(contractState).replace(/\"/g, '"'),
    pubKey: zilliqa.util.getPubKeyFromPrivateKey(privateKey),
};

const tx = OfficialUtil.createTransactionJson( privateKey, transactionDetails );

const node = zilliqa.getNode();
const exec = await node.createTransaction(tx, (err, data) => {
    if (err || data.error) {
        console.log('Error', err, data);
    } else {
        console.log(data.result);
    }
});

console.log(exec);
        });

    });

});
