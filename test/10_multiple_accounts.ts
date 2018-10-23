import { assert } from "chai";
import mocha from "mocha";

import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../src/index";
import { GenericAccount } from "../src/core/account";
import { GenericNode } from "../src/core/node";
import { GenericTransaction } from "../src/core/transaction";
import { GenericAccountUtils } from "../src/core/account-utils";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Integration", async () => {

    describe("Wallet: constructed with parameters ( mnemonic, language = EN )", async () => {

        describe("create one Ethereum account", async () => {

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            const blockchain = Blockchains.ETHEREUM;
            const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
            const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
            const account = defaultWallet.createAccount(blockchain);

            it("should create first account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("wallet should have 1 account", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
            });
        });

        describe("create two Ethereum accounts", async () => {

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            const blockchain = Blockchains.ETHEREUM;
            const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
            const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
            const account = defaultWallet.createAccount(blockchain);
            const account2 = defaultWallet.createAccount(blockchain);

            it("should create first account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("should create second account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[1];
                const getIndex = defaultWallet.accounts.get(blockchain)[1];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account2, getAccount, "Accounts do not match" );
                assert.equal( account2, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account2.node.constructor.name, "class does not match expected" );

                const HDKey = account2.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account2.utils.isValidPrivate( Buffer.from( account2.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 1, "HDKey index does not match" );

            });

            it("wallet should have 2 accounts", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 2, "getAccounts length does not match" );
            });
        });

        describe("create one Zilliqa accounts", async () => {
            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            const blockchain = Blockchains.ZILLIQA;
            const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
            const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
            const account = defaultWallet.createAccount(blockchain);

            it("should create first account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );
            });

            it("wallet should have 1 account", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
            });
        });

        describe("create two Zilliqa accounts", async () => {
            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            const blockchain = Blockchains.ZILLIQA;
            const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
            const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
            const account = defaultWallet.createAccount(blockchain);
            const account2 = defaultWallet.createAccount(blockchain);

            it("should create first account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("should create second account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[1];
                const getIndex = defaultWallet.accounts.get(blockchain)[1];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account2, getAccount, "Accounts do not match" );
                assert.equal( account2, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account2.node.constructor.name, "class does not match expected" );

                const HDKey = account2.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account2.utils.isValidPrivate( Buffer.from( account2.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 1, "HDKey index does not match" );

            });

            it("wallet should have 2 accounts", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 2, "getAccounts length does not match" );
            });
        });

        describe("create one Ethereum account & create one Zilliqa account ", async () => {
            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            it("should create one Ethereum account", async () => {

                const blockchain = Blockchains.ETHEREUM;
                const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
                const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
                const account = defaultWallet.createAccount(blockchain);

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("should create one Zilliqa account", async () => {

                const blockchain = Blockchains.ZILLIQA;
                const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
                const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
                const account = defaultWallet.createAccount(blockchain);

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( account.utils.isValidPrivate( Buffer.from( account.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("wallet should have 1 Ethereum and 1 Zilliqa accounts", async () => {
                const ETHgetAccounts = defaultWallet.getAccounts(Blockchains.ETHEREUM);
                const ZILgetAccounts = defaultWallet.getAccounts(Blockchains.ETHEREUM);
                assert.equal( ETHgetAccounts.length, 1, "getAccounts length does not match" );
                assert.equal( ZILgetAccounts.length, 1, "getAccounts length does not match" );
            });
        });

    });

});
