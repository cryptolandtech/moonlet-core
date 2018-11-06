import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction, TransactionStatus } from "../../src/core/transaction";
import { EthereumTransaction } from "../../src/blockchain/ethereum/transaction";

import Deployer from "./solc/deployer";
import Ethereum from "../../src/blockchain/ethereum/class.index";
import Zilliqa from "../../src/blockchain/zilliqa/class.index";
const testDeployerAddress = "0x7839919b879250910e8646f3b46ebbca8438be32";
const DeployeHelper = new Deployer(
    testDeployerAddress,
    "b9459a91a412c986cf92c02badb335e38720886214326b10e9ccf4d53cae302d",
);

const mapper = new DynamicClassMapper();
mapper.collectClasses(Zilliqa.AvailableClasses);
mapper.collectClasses(Ethereum.AvailableClasses);

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Core", async () => {

    describe("EthereumAccount", async () => {

        describe("instantiating new object", async () => {

            const wallet: Wallet = new Wallet();
            wallet.loadBlockchain(Ethereum);
            wallet.loadBlockchain(Zilliqa);
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
            defaultWallet.loadBlockchain(Ethereum);
            defaultWallet.loadBlockchain(Zilliqa);
            const blockchain = Blockchains.ETHEREUM;

            const TestNode: GenericNode = defaultWallet.getNode( blockchain );
            TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );
            // TestNode.init( TestNode.NETWORKS[ 0 ] );

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

            describe("getNonce()", async () => {

                it("should return a nonce", async () => {
                    const result = await account.getNonce();
                    assert.isAtLeast( result, 0, "nonce should be at least 0" );
                });
            });

            describe("getBalance()", async () => {

                it("should return a valid balance", async () => {
                    const result = await account.getBalance();
                    let expected = 0;
                    if (TestNode.network.chainId === 15) {
                        expected = 100 * 10 ** 18;
                    }
                    assert.isAtLeast( parseInt(result.toString(), 16), 1, "Balance should be at least 1" );
                });
            });

            describe("estimateTransferTransaction()", async () => {

                let nonce;
                const value = 0.01 * 10 ** 18;

                describe("receiver is an account", async () => {

                    const receiverAccountAddr = "0x7839919b879250910e8646f3b46ebbca8438be32";

                    before( async () => {
                        nonce = await account.getNonce();
                    });

                    it("should return 21000 gas estimation", async () => {
                        const accountGasTransferEstimation = await account.estimateTransferTransaction( receiverAccountAddr, value, nonce) as any;
                        assert.equal( accountGasTransferEstimation.toString(), "21000", "Estimation should be 21000" );
                    });

                });

                describe("receiver is a contract with a non payable fallback method ()", async () => {

                    let contractAddress;
                    before( async () => {
                        nonce = await account.getNonce();
                        // Non payable fallback method source in solc/non_payable_fallback.sol
                        const tx = await DeployeHelper.deployContract( TestNode, "0x6080604052348015600f57600080fd5b50603e80601d6000396000f3006080604052348015600f57600080fd5b500000a165627a7a72305820314703b0f77a5338ad6a5fea41ad7065949be7496f42d96e630efb1a00a375670029" );
                        contractAddress = tx.contractAddress;
                    });

                    it("should throw since it cannot accept transfer", async () => {

                        try {
                            const contractGasTransferEstimation = await account.estimateTransferTransaction( contractAddress, value, nonce) as any;
                            assert.isFalse( true, "This should never be false." );
                        } catch (err) {
                            assert.equal( err.message, "VM Exception while processing transaction: revert", "VM Throw message did not match." );
                        }
                    });

                });

                describe("receiver is a contract with a payable fallback method () and no code", async () => {

                    let contractAddress;
                    before( async () => {
                        nonce = await account.getNonce();
                        // Payable fallback method source in solc/payable_fallback.sol
                        const tx = await DeployeHelper.deployContract( TestNode, "0x6080604052348015600f57600080fd5b50603280601d6000396000f30060806040520000a165627a7a72305820f7ae5472b0a9d2b297a12e299f949f82331739e58d9623bce903c56186734ba40029" );
                        contractAddress = tx.contractAddress;
                    });

                    it("should return 21018 gas estimation", async () => {
                        const contractGasTransferEstimation = await account.estimateTransferTransaction( contractAddress, value, nonce) as any;
                        assert.equal( contractGasTransferEstimation.toString(), "21018", "Estimation should be at least 21001" );
                    });

                });

                describe("receiver is a contract with a payable fallback method () and a lot of code", async () => {

                    let contractAddress;
                    before( async () => {
                        nonce = await account.getNonce();
                        // Payable fallback method source in solc/payable_fallback.sol
                        const tx = await DeployeHelper.deployContract( TestNode, "0x6080604052348015600f57600080fd5b50606f8061001e6000396000f300608060405261040060405160005b82811015602457603281830152600881019050600d565b5060005b82811015603e5780820151506008810190506028565b5050500000a165627a7a72305820d8b52161cc7dd91db64169b7e0d4b1faad7ee6db73b996ce302f7a9c1465edf50029" );
                        contractAddress = tx.contractAddress;
                    });

                    it("should return 37967 gas estimation", async () => {
                        const contractGasTransferEstimation = await account.estimateTransferTransaction( contractAddress, value, nonce) as any;
                        assert.equal( contractGasTransferEstimation.toString(), "37967", "Estimation should be at least 21001" );
                    });

                });

            });

            describe("signTransaction()", async () => {

                let transaction;
                let signed;
                let nonce;

                before( async () => {
                    nonce = await account.getNonce();
                    transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;
                    signed = await account.signTransaction ( transaction );
                });

                it("should return a Buffer containing the signed transaction", async () => {
                    assert.isTrue( Buffer.isBuffer(signed), "Signed not a buffer" );
                    assert.isAbove( signed.length, 1, "Signed buffer should not be empty" );
                });

                it("transaction.raw should not be empty", async () => {
                    assert.notEqual( transaction.raw.toString(), Buffer.from("").toString(), "transaction.raw is empty" );
                });

                it("transaction.status should be SIGNED", async () => {
                    assert.equal( transaction.status, TransactionStatus.SIGNED, "transaction status is different" );
                });

            });

            describe("buildTransferTransaction()", async () => {

                let transaction;
                let nonce;
                const value = 0.01 * 10 ** 18;
                const gasLimit = 21000;
                const gasPrice = 5; // gwei

                beforeEach( async () => {
                    nonce = await account.getNonce();
                    transaction = account.buildTransferTransaction( testDeployerAddress, value, nonce, gasLimit, gasPrice ) as any;
                });

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
                    assert.equal( transaction.to, testDeployerAddress, "transaction to address is bad" );
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

                it("transaction.nonce should be current account.nonce + 1", async () => {
                    assert.isAtLeast( transaction.nonce, nonce, "transaction nonce issue" );
                });

                describe("sign and send transaction", async () => {

                    beforeEach( async () => {
                        await account.signTransaction ( transaction );
                        await account.send( transaction );
                    });

                    it("transaction.status should be FINAL", async () => {
                        assert.equal( transaction.status, TransactionStatus.FINAL, "transaction status is different" );
                    });

                    it("transaction.txn should not be empty", async () => {
                        assert.notEqual( transaction.txn, "", "transaction.txn is empty" );
                    });

                });

            });

            describe("buildCancelTransaction()", async () => {

                let nonce;
                let transaction;

                before( async () => {
                    nonce = await account.getNonce();
                    transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;
                });

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

                it("transaction.nonce should be current account.nonce", async () => {
                    assert.isAtLeast( transaction.nonce, nonce, "transaction nonce issue" );
                });

            });

            describe("send()", async () => {

                describe("not signed transaction", async () => {

                    it("should throw if transaction status is not SIGNED", async () => {
                        const nonce = await account.getNonce();
                        const transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;

                        try {
                            await account.send( transaction );
                            assert.isFalse( true, "This should never be false." );
                        } catch (err) {
                            assert.equal( err.message, "Transaction status needs to be SIGNED", "Error message did not match." );
                        }
                    });
                });

                describe("signed transaction", async () => {

                    let transaction;

                    beforeEach( async () => {
                        const nonce = await account.getNonce();
                        transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;
                        await account.signTransaction ( transaction );
                    });

                    it("should have status SIGNED before the send call", async () => {
                        assert.equal( transaction.status, TransactionStatus.SIGNED, "Transaction Status did not match." );
                    });

                    it("should have status PENDING before the Promise resolves", async () => {
                        account.send( transaction );
                        assert.equal( transaction.status, TransactionStatus.PENDING, "Transaction Status did not match." );
                    });

                    it("should have status FINAL after the Promise resolves", async () => {
                        await account.send( transaction );
                        assert.equal( transaction.status, TransactionStatus.FINAL, "Transaction Status did not match." );
                    });

                    it("should match returned value with transaction.txn ", async () => {
                        const result = await account.send( transaction );
                        assert.equal( transaction.txn, result.txn, "Transaction txn did not match." );
                    });

                    it("should have a receipt object after the Promise resolves", async () => {
                        const result = await account.send( transaction );
                        assert.equal( transaction.receipt, result.receipt, "Transaction receipt did not match." );
                    });

                    it("should throw if sending a transaction with a lower nonce than current account nonce", async () => {
                        await account.send( transaction );

                        const nonce = await account.getNonce();
                        const transactionTwo = account.buildCancelTransaction( nonce - 1 ) as EthereumTransaction;
                        await account.signTransaction ( transactionTwo );

                        try {
                            await account.send( transactionTwo );

                            assert.isFalse( true, "This should never be false." );
                        } catch (err) {
                            const errMsg = err.message.split(".")[0] + ".";
                            assert.equal( errMsg, "Error: the tx doesn't have the correct nonce.", "Error message did not match." );
                        }
                    });

                    it("should throw an error if any problem arises", async () => {
                        // set a bad node url
                        account.node.setCustomNetworkUrl("http://127.0.0.1:1");
                        try {
                            await account.send( transaction );
                            assert.isFalse( true, "This should never be false." );
                        } catch ( err ) {
                            const errMsg = err.message.split(":")[0];
                            assert.equal( errMsg, "Error", "Error message did not match." );
                        }
                        account.node.resetCustomNetworkUrl();
                    });

                });

                describe("signed transaction with callback specified", async () => {

                    let transaction;

                    beforeEach( async () => {
                        const nonce = await account.getNonce();
                        transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;
                        await account.signTransaction ( transaction );
                    });

                    it("should have status SIGNED before the send call", async () => {
                        assert.equal( transaction.status, TransactionStatus.SIGNED, "Transaction Status did not match." );
                    });

                    it("should call callback(undefined, data) and transaction status should be FINAL", ( done ) => {
                        account.send( transaction, (err, data) => {
                            if (err) {
                                done(err);
                            } else {
                                assert.equal( transaction.status, TransactionStatus.FINAL, "Transaction Status did not match." );
                                done();
                            }
                        });
                    });

                    it("should call callback(undefined, data) and data should match transaction receipt", ( done ) => {
                        account.send( transaction, (err, data) => {
                            if (err) {
                                done(err);
                            } else {
                                assert.equal( transaction.receipt, data, "Transaction receipt did not match." );
                                done();
                            }
                        });
                    });

                    it("should call callback(undefined, data), if callback.type === txn and data should match transaction txn", ( done ) => {

                        account.send( transaction, (err, data) => {
                            if (err) {
                                done(err);
                            } else {
                                assert.equal( transaction.txn, data, "Transaction txn did not match." );
                                done();
                            }
                        }, "txn");
                    });

                    it("should return a callback(error) if any problem arises", ( done ) => {
                        // set a bad node url
                        account.node.setCustomNetworkUrl("http://127.0.0.1:1");

                        account.send( transaction, (err, data) => {
                            if (err) {
                                const errMsg = err.message.split(":")[0];
                                assert.equal( errMsg, "Error", "Error message did not match." );
                                account.node.resetCustomNetworkUrl();
                                done();
                            } else {
                                assert.isFalse( true, "This should never be false." );
                                done();
                            }
                        }, "txn").catch(e => { /* */ });

                    });

                });
            });

            describe("getTransactions()", async () => {
                let transaction;

                beforeEach( async () => {
                    const nonce = await account.getNonce();
                    transaction = account.buildCancelTransaction( nonce ) as EthereumTransaction;
                    await account.signTransaction ( transaction );
                });

                it("should return an array of GenericTransactions", async () => {
                    const t = account.getTransactions();
                    assert.isAtLeast( t.length, 1, "Transaction length did not match." );
                });
                //
            });

            describe("buildTransaction()", async () => {
                //
            });

            describe("signMessage()", async () => {
                //
            });
        });
    });
});
