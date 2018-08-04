"use strict";
// import Storage from "./base/storage/storage";
// const appStorage = new Storage();
// appStorage.set("test", "value");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HDWallet_1 = require("./base/wallet/HDWallet");
const { Zilliqa } = require("zilliqa.js");
const APIURL = "https://scillaprod-api.aws.zilliqa.com";
const zilliqa = new Zilliqa({
    nodeUrl: APIURL,
});
const node = zilliqa.getNode();
// const wallet = new HDWallet();
const wallet = new HDWallet_1.default({
    coin: "ZIL",
    mnemonic: "between culture long bounce pact oxygen panel fun assist favorite symptom floor",
});
const ReceiverAddres = "5FC7409B4B41E06E73BA1AA7F3127D93C76BD557";
const HowManyAccounts = 2; // how many accounts do we want to generate ?
function doTest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield wallet.addAccounts(HowManyAccounts);
        const accounts = yield wallet.getAccounts();
        console.log("accounts: ", accounts);
        const addr = accounts[0];
        const privateKey = wallet.getPrivateKeyForAccount(addr);
        console.log("Address:", addr);
        node.getBalance({ address: addr }, (err, balance) => {
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
            const txn = zilliqa.util.createTransactionJson(privateKey, txnDetails);
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
    });
}
doTest();
//# sourceMappingURL=index.1.js.map