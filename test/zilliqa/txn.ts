
import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction, TransactionStatus } from "../../src/core/transaction";
import { ZilliqaTransaction } from "../../src/blockchain/zilliqa/transaction";

import Ethereum from "../../src/blockchain/ethereum/class.index";
import Zilliqa from "../../src/blockchain/zilliqa/class.index";

import { Zilliqa as ZilliqaOfficial } from 'zilliqa-js';
import { Zilliqa as OfficialZilliqa } from '@zilliqa-js/zilliqa';

import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";
import { BN, Long } from '@zilliqa-js/util';
import Signature from 'elliptic/lib/elliptic/ec/signature';

// const pk = "891E98DBEF714F120958405F5CF1FA4F47496D0B287E514C1A7EC02805DA3C13";
const pk = "891E98DBEF714F120958405F5CF1FA4F47496D0B287E514C1A7EC02805DA3C13";

// ionut
const testReceiverAddress = "0xee9d7b0a5cd3ff9fcdd3a44a6ee49ff9edfe382a";

const mapper = new DynamicClassMapper();
mapper.collectClasses(Zilliqa.AvailableClasses);
mapper.collectClasses(Ethereum.AvailableClasses);
const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

/*
describe("Zilliqa", async () => {

    describe("Wallet with one Zilliqa account", async () => {
        let myNonce = 0;

        const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
        defaultWallet.loadBlockchain(Ethereum);
        defaultWallet.loadBlockchain(Zilliqa);
        const blockchain = Blockchains.ZILLIQA;

        const TestNode: GenericNode = defaultWallet.getNode( blockchain );
        TestNode.init( TestNode.NETWORKS[ 1 ] ); // https://api-scilla.zilliqa.com/

        // TestNode.init( TestNode.NETWORKS[ 0 ] );
        // TestNode.setCustomNetworkUrl("https://dev-test-api.aws.z7a.xyz/");

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

                const transaction = account.buildTransferTransaction(
                    testReceiverAddress.replace("0x", "").toLowerCase(),
                    8,      // amount
                    nonce,  // nonce
                    10,     // gasLimit
                    100,    // gasPrice
                ) as ZilliqaTransaction;

                await account.signTransaction( transaction );

                console.log("\n", ">>>> Moonlet txn:", transaction.TXObject);

                await account.send( transaction );

                // console.log( transaction.toParams() );
                console.log( "TXN:", transaction.txn );

                console.log( "PK:", account.privateKey.replace("0x", "") );
                assert.equal( 1, 1, "Transaction Status did not match." );

            }).timeout(10000);
        });
    });

    describe("Official Transaction Test", async () => {

        it("Should work", async () => {

            const { BN, Long } = require('@zilliqa-js/util');

            const { Transaction } = require('@zilliqa-js/account');

            const zilliqa = new OfficialZilliqa('https://api-scilla.zilliqa.com/');

            zilliqa.wallet.addByPrivateKey(pk);

            const newtx = zilliqa.transactions.new({
                version: 1,
                toAddr: testReceiverAddress.replace("0x", "").toLowerCase(),
                amount: new BN(8),
                gasPrice: new BN(100),
                // can be `number` if size is <= 2^53 (i.e., window.MAX_SAFE_INTEGER)
                gasLimit: Long.fromNumber(10),
            });

            console.log("newtx", newtx);

            const tx = await zilliqa.blockchain.createTransaction(newtx);
            console.log( tx );

        }).timeout(10000);
    });
});
*/
/*
describe("Kaya - Moonlet Core - Wallet with one Zilliqa account", async () => {

    const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
    const blockchain = Blockchains.ZILLIQA;

    const TestNode: GenericNode = defaultWallet.getNode( blockchain );
    TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );
    // TestNode.init( TestNode.NETWORKS[ 0 ] );
    // TestNode.setCustomNetworkUrl("https://dev-test-api.aws.z7a.xyz/");

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
*/
