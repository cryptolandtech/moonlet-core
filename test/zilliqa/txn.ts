
import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction, TransactionStatus } from "../../src/core/transaction";
import { ZilliqaTransaction } from "../../src/blockchain/zilliqa/transaction";

const BN = require( 'bn.js' );
import { util as OfficialUtil } from 'zilliqa-js';
import { Zilliqa } from 'zilliqa-js';

const pk = "891E98DBEF714F120958405F5CF1FA4F47496D0B287E514C1A7EC02805DA3C13";

// ionut
const testReceiverAddress = "0xee9d7b0a5cd3ff9fcdd3a44a6ee49ff9edfe382a";

const mapper = new DynamicClassMapper();
const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Zilliqa", async () => {

    /*
    describe("Wallet with one Zilliqa account", async () => {
        let myNonce = 0;

        const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
        const blockchain = Blockchains.ZILLIQA;

        const TestNode: GenericNode = defaultWallet.getNode( blockchain );
        TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );
        // TestNode.init( TestNode.NETWORKS[ 0 ] );
        TestNode.setCustomNetworkUrl("https://scilla-test-api.aws.z7a.xyz/");

        const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
        const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
        // const account = defaultWallet.createAccount(blockchain);

        // Loose account setup
        const account = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: TestNode,
                type: AccountType.LOOSE,
                privateKey: pk,
            }),
        );

        it("Should have a balance", async () => {
            myNonce = await account.getNonce();
            console.log( await account.getBalance() );
            console.log( myNonce );

        });

        describe("send() signed transaction", async () => {
            it("debug", async () => {
                const nonce = await account.getNonce();
                const transaction = account.buildTransferTransaction( testReceiverAddress.replace("0x", "").toLowerCase(), 1000, nonce, 1, 1 ) as ZilliqaTransaction;
                await account.signTransaction ( transaction );

                console.log("\n", ">>>> Moonlet txn:", transaction.TXObject);

                await account.send( transaction );

                console.log( transaction.toParams() );
                console.log( "TXN:", transaction.txn );

                console.log( "PK:", account.privateKey.replace("0x", "") );
                assert.equal( 1, 1, "Transaction Status did not match." );
            });
        });

    });
    */
    /*
    describe("Official Transaction Test", async () => {

        it("Should work", async () => {

            const zilliqa = new Zilliqa({
                nodeUrl: 'https://scilla-test-api.aws.z7a.xyz/',
            });

            const transactionDetails = {
                version: 0,
                nonce: 1,
                to: testReceiverAddress.replace("0x", "").toLowerCase(),
                amount: new BN( 100 ) ,
                gasPrice: 1,
                gasLimit: 10,
                code: '',
                data: '',
                pubKey: null,
//                pubKey: zilliqa.util.getPubKeyFromPrivateKey(pk),
            };

            const tx = OfficialUtil.createTransactionJson( pk, transactionDetails );
            console.log("\n", ">>>> Official txn:", tx);

            console.log( "PK:", pk );
            // return ;
            const node = zilliqa.getNode();
            const exec = await node.createTransaction(tx, (err, data) => {
                if (err || data.error) {
                    console.log('Error:', err, data);
                } else {
                    console.log('OK:', data.result);
                }
            });

        });

    });
    */
});

/*
describe("Kaya - Moonlet Core - Wallet with one Zilliqa account", async () => {

    const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
    const blockchain = Blockchains.ZILLIQA;

    const TestNode: GenericNode = defaultWallet.getNode( blockchain );
    TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );
    // TestNode.init( TestNode.NETWORKS[ 0 ] );
    // TestNode.setCustomNetworkUrl("https://scilla-test-api.aws.z7a.xyz/");

    const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
    const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
    const account = defaultWallet.createAccount(blockchain);

    it("Should have a balance", async () => {
        console.log( await account.getBalance() );
    });

    describe("send() signed transaction", async () => {
        it("debug", async () => {
            const nonce = await account.getNonce();
            const transaction = account.buildTransferTransaction( "44526c8eef2efab582b049003741079b36f7ad3b".replace("0x", "").toUpperCase(), 10, nonce, 1, 1 ) as ZilliqaTransaction;
            await account.signTransaction ( transaction );

            console.log("\n", ">>>> Moonlet txn:", transaction.TXObject);

            await account.send( transaction );

            console.log( transaction.toParams() );
            console.log( "TXN:", transaction.txn );

            console.log( "PK:", account.privateKey.replace("0x", "") );
            assert.equal( 1, 1, "Transaction Status did not match." );
        });
    });

});
*/
