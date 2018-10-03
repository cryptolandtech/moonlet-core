import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction, TransactionStatus } from "../../src/core/transaction";
import { EthereumTransaction } from "../../src/blockchain/ethereum/transaction";

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

        describe("Wallet with one Ethereum account ( testrpc )", async () => {

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
            const blockchain = Blockchains.ETHEREUM;

            const TestNode: GenericNode = defaultWallet.getNode( blockchain );
            TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

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

                it("should return a nonce", async () => {
                    const result = await account.getNonce();
                    assert.equal( result.toString(), "0", "nonce should match" );
                });
            });

            describe("getBalance()", async () => {

                it("should return a valid balance", async () => {
                    const result = await account.getBalance();
                    const expected = 100 * 10 ** 18;
                    assert.equal( result.toString(), expected.toString(), "Balance should match" );
                });
            });

            describe("signTransaction()", async () => {
                //
            });

            describe("signMessage()", async () => {
                //
            });

            describe("buildTransferTransaction()", async () => {

                let transaction;
                const receiverAddr = "0x7839919b879250910e8646f3b46ebbca8438be32";
                const value = 0.01 * 10 ** 18;

                beforeEach( async () => {
                    const nonce = await account.getNonce();
                    transaction = account.buildTransferTransaction( receiverAddr, value, nonce ) as EthereumTransaction;
                });

                describe("constructed", async () => {

                    it("transaction.txn should be an empty string", async () => {
                        assert.equal( transaction.txn, "", "transaction.txn is not empty" );
                    });

                    it("transaction.raw should be an empty Buffer", async () => {
                        assert.equal( transaction.raw.toString(), Buffer.from("").toString(), "transaction.raw is not empty" );
                    });

                    it("transaction.status should be NEW", async () => {
                        assert.equal( transaction.status, TransactionStatus.NEW, "transaction status is different" );
                    });

                    it("transaction.from should be sender address", async () => {
                        assert.equal( transaction.from, account.address, "transaction from address is bad" );
                    });

                    it("transaction.to should be receiver address", async () => {
                        assert.equal( transaction.to, receiverAddr, "transaction to address is bad" );
                        assert.notEqual( transaction.from, transaction.to, "transaction from / to addresses are bad" );
                    });

                    it("transaction.value should be a number higher than 0", async () => {
                        assert.isAtLeast( transaction.value, 1, "transaction value is bad" );
                    });

                    it("transaction.gasPrice should be a number", async () => {
                        assert.equal( typeof transaction.gasPrice, "number", "transaction gasPrice is not a number" );
                    });

                    it("transaction.gasLimit should be 21000", async () => {
                        assert.isAtLeast( transaction.gasPrice, 0, "transaction gasPrice issue" );
                    });

                    it("transaction.nonce should be higher than 0", async () => {
                        assert.isAtLeast( transaction.nonce, 0, "transaction nonce issue" );
                    });

                });

            });

            describe("buildCancelTransaction()", async () => {

                const nonce = 0;
                const transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;

                it("transaction.txn should be an empty string", async () => {
                    assert.equal( transaction.txn, "", "transaction.txn is not empty" );
                });

                it("transaction.raw should be an empty Buffer", async () => {
                    assert.equal( transaction.raw.toString(), Buffer.from("").toString(), "transaction.raw is not empty" );
                });

                it("transaction.status should be NEW", async () => {
                    assert.equal( transaction.status, TransactionStatus.NEW, "transaction status is different" );
                });

                it("transaction.from should be sender address", async () => {
                    assert.equal( transaction.from, account.address, "transaction from address is bad" );
                });

                it("transaction.to should be sender address", async () => {
                    assert.equal( transaction.to, account.address, "transaction to address is bad" );
                    assert.equal( transaction.from, transaction.to, "transaction from / to addresses are bad" );
                });

                it("transaction.value should be 0", async () => {
                    assert.equal( transaction.value, 0, "transaction value is bad" );
                });

                it("transaction.gasPrice should be a number", async () => {
                    assert.equal( typeof transaction.gasPrice, "number", "transaction gasPrice is not a number" );
                });

                it("transaction.gasLimit should be 21000", async () => {
                    assert.isAtLeast( transaction.gasPrice, 0, "transaction gasPrice issue" );
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
