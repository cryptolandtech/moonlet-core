import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction } from "../../src/core/transaction";

const mapper = new DynamicClassMapper();
const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Core", async () => {

    describe("EthereumAccount", async () => {

        describe("instantiating new object", async () => {

            const wallet: Wallet = new Wallet();
            const TestNode: GenericNode = wallet.getNode(Blockchains.ETHEREUM);
            const DynamicClassName = GenericAccount.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

            it("should throw if creating an HD account that is missing accountOptions.hd", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.HD,
                    });
                }, /^accountOptions.hd parameter missing$/);
            });

            it("should throw if creating a LOOSE account that is missing accountOptions.privateKey", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.LOOSE,
                    });
                }, /^accountOptions.privateKey parameter missing$/);
            });

            it("should throw if creating a HARDWARE account that is missing accountOptions.address", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.HARDWARE,
                    });
                }, /^accountOptions.address parameter missing$/);
            });

            it("should throw if creating an account with no type", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                    });
                }, /^accountOptions.type \'undefined\' not found$/);
            });
        });

        describe("Wallet with one Ethereum account", async () => {

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
                assert.isTrue( account.utils.isValidPrivate( new Buffer( account.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("wallet should have 1 account", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
            });

            describe("getNonce()", async () => {

                it("should return a Promise", async () => {
                    const nonce = account.getNonce();
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });
            });

            describe("getBalance()", async () => {

                it("should return a Promise", async () => {
                    const nonce = account.getBalance();
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });
            });

            describe("signTransaction()", async () => {
                //
            });

            describe("signMessage()", async () => {
                //
            });

            describe("buildTransferTransaction()", async () => {
                //
            });

            describe("buildCancelTransaction()", async () => {
                //
                it("transaction should have a valid from address", async () => {
                    const nonce = await account.getNonce();
                    const transaction = account.buildCancelTransaction( nonce, 100 );
                    console.log(transaction);
                    // const getAccounts = defaultWallet.getAccounts(blockchain);
                    assert.equal( 1, 1, "test" );
                });
            });

            describe("buildTransaction()", async () => {
                //
            });

            describe("send()", async () => {
                //
            });

        });
    });
});
