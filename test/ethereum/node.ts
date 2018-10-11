import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericNode } from "../../src/core/node";
import { GenericAccount } from "../../src/core/account";
import { BigNumber } from 'bignumber.js';
import { EthereumTransaction } from "../../src/blockchain/ethereum/transaction";

import EthereumTx from 'ethereumjs-tx';
import { GenericTransaction } from "../../src/core/transaction";

const mapper = new DynamicClassMapper();
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

const ethereumWallet0Address = "0x9d9216e0a29468bE1eCaCc351ce3887be8a26222";
const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Core", async () => {

    describe("EthereumNode", async () => {

        describe("constructed with no parameters", async () => {

            describe("properties", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                const networks = TestNode.NETWORKS;

                it("should instantiate with the first available network", async () => {
                    const network = TestNode.getNetwork();
                    assert.equal( JSON.stringify(network), JSON.stringify(networks[0]), "Network properties do not match" );
                });

                it("customNetworkUrl should be false", async () => {
                    assert.isFalse( TestNode.customNetworkUrl, "customNetworkUrl should be false" );
                });

                it("connected should be false", async () => {
                    assert.isFalse( TestNode.connected, "connected should be false" );
                });

                it("blockchain should be defined", async () => {
                    assert.notEqual( TestNode.blockchain, undefined, "blockchain should be defined" );
                });

                it("HDRootKey should be null", async () => {
                    assert.equal( TestNode.HDRootKey, null, "HDRootKey should be undefined" );
                });
            });

            describe("getNetwork()", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                const customUrl = "http://test.com";
                TestNode.setCustomNetworkUrl(customUrl);
                const network = TestNode.getNetwork();

                it("should not be a reference of the object in node.NETWORKS[]", async () => {
                    const originalNetwork = TestNode.NETWORKS[0];
                    assert.notEqual( JSON.stringify(network), JSON.stringify(originalNetwork), "Networks should not match" );
                    assert.notEqual( network, originalNetwork, "Networks should not match" );
                });

            });

            describe("getCurrentNetworkPathString()", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );

                it("should return a string containing the network.HDCoinValue", async () => {
                    const HDCoinValue = "/" + TestNode.getNetwork().HDCoinValue + "'";
                    const check = ( TestNode.getCurrentNetworkPathString().indexOf( HDCoinValue) >= 0 );
                    assert.isTrue( check, "HDCoinValue should be in the returning string" );
                });

            });

            describe("setCustomNetworkUrl( http://test.com )", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                const customUrl = "http://test.com";
                TestNode.setCustomNetworkUrl(customUrl);
                const network = TestNode.getNetwork();

                it("should set the url on the network object", async () => {
                    assert.equal( network.url, customUrl, "Urls should match" );
                });

                it("customNetworkUrl should be true", async () => {
                    assert.isTrue( TestNode.customNetworkUrl, "customNetworkUrl should be true" );
                });

            });

            describe("resetCustomNetworkUrl()", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                const initialNetwork = TestNode.getNetwork();
                const customUrl = "http://test.com";
                TestNode.setCustomNetworkUrl(customUrl);
                TestNode.resetCustomNetworkUrl();
                const afterNetwork = TestNode.getNetwork();

                it("should reset the url on the network object to the original one", async () => {
                    assert.equal( initialNetwork.url, afterNetwork.url, "Urls should match" );
                });

                it("customNetworkUrl should be false", async () => {
                    assert.isFalse( TestNode.customNetworkUrl, "customNetworkUrl should be false" );
                });

            });

            describe("call( method: string, params: any, dec?: string  )", async () => {

                describe("valid call", async () => {

                    const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                    TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

                    it("should return a Promise", async () => {
                        const test = TestNode.rpcCall(
                            "eth_getBalance", [
                                ethereumWallet0Address,
                                'latest',
                            ], "BigNumber",
                        );
                        assert.equal( test.constructor.name, "Promise", "Returned object should be a Promise" );
                    });

                    it("should be string once the Promise resolves and decoder is not specified", async () => {
                        const test = await TestNode.rpcCall(
                            "eth_getBalance", [
                                ethereumWallet0Address,
                                'latest',
                            ], "",
                        );
                        assert.equal( typeof test, "string", "Returned parameter should be a string" );
                    });

                });

                describe("invalid call ( to testrpc / ganache )", async () => {

                    const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                    TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

                    it("error can be caught using a try/catch statement", async () => {
                        try {
                            const test = await TestNode.rpcCall(
                                "eth_badMethod", [
                                    ethereumWallet0Address,
                                    'latest',
                                ], "",
                            );
                        } catch (e) {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Method eth_badMethod not supported.",
                                "Invalid message",
                            );
                        }
                    });

                    it("error can be caught using a then().catch() statement", async () => {
                        const test = TestNode.rpcCall(
                            "eth_badMethod", [
                                ethereumWallet0Address,
                                'latest',
                            ], "",
                        ).then( ( result ) => {
                            // this never gets called
                            assert.isTrue( false, "Promise.resolve should not be called in this case!" );
                        }).catch( e => {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Method eth_badMethod not supported.",
                                "Invalid message",
                            );
                        });
                    });
                });

                describe("invalid call ( to geth node / infura proxy )", async () => {

                    const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                    TestNode.init( TestNode.NETWORKS[ 0 ] );

                    it("error can be caught using a try/catch statement", async () => {

                        try {
                            const test = await TestNode.rpcCall(
                                "eth_badMethod", [
                                    ethereumWallet0Address,
                                    'latest',
                                ], "",
                            );
                        } catch (e) {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Error: Request failed with status code 405",
                                "Invalid message",
                            );
                        }

                    });

                    it("error can be caught using a then().catch() statement", async () => {
                        const test = TestNode.rpcCall(
                            "eth_badMethod", [
                                ethereumWallet0Address,
                                'latest',
                            ], "",
                        ).then( ( result ) => {
                            // this never gets called
                            assert.isTrue( false, "Promise.resolve should not be called in this case!" );
                        }).catch( e => {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Error: Request failed with status code 405",
                                "Invalid message",
                            );
                        });
                    });
                });

            });

            describe("resultDecoder()", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );

                it("should throw if specified type is not implemented", async () => {
                    assert.throws(() => {
                        const test = TestNode.resultDecoder( ethereumWallet0Address, "not_implemented" );
                    }, 'type: [not_implemented] not implemented');
                });

                it("should return a string if type not specified", async () => {
                    const test = TestNode.resultDecoder( ethereumWallet0Address );
                    assert.equal( typeof test, "string", "Should have returned a string" );
                });

                it("should return a BigNumber if requested", async () => {
                    const test: BigNumber = TestNode.resultDecoder( "0x0A", "BigNumber" );
                    assert.equal( test.constructor.name, "BigNumber", "Returned parameter should be a BigNumber" );
                    assert.equal( test.toNumber(), 10, "Should match" );
                });

                it("should return a number if requested", async () => {
                    const test: number = TestNode.resultDecoder( "0x0A", "number" );
                    assert.equal( typeof test, "number", "Returned parameter should be a number" );
                    assert.equal( test, 10, "Should match" );
                });

                it("should return a Buffer if requested", async () => {
                    const hexString = "0x0102030405";
                    const test: Buffer = TestNode.resultDecoder( hexString , "Buffer" );
                    assert.isTrue( Buffer.isBuffer(test), "Returned parameter should be a Buffer" );
                    assert.equal( test.toString(), hexString, "Should match" );
                });
            });

            describe("getNonce( address )", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

                it("should return a Promise", async () => {
                    const nonce = TestNode.getNonce( ethereumWallet0Address );
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });

                it("should be a number once the Promise resolves", async () => {
                    const nonce: number = await TestNode.getNonce( ethereumWallet0Address );
                    assert.equal( typeof nonce, "number", "Returned parameter should be a number" );
                });

            });

            describe("getBalance( address )", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

                it("should return a Promise", async () => {
                    const nonce = TestNode.getBalance( ethereumWallet0Address );
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });

                it("should be a BigNumber once the Promise resolves", async () => {
                    const balance = await TestNode.getBalance( ethereumWallet0Address );
                    assert.equal( balance.constructor.name, "BigNumber", "Returned parameter should be a BigNumber" );

                });

            });

            describe("getTransactionReceipt( GenericTransaction )", async () => {

                let account;
                let txHash;
                let transaction;

                before( async () => {
                    const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
                    const blockchain = Blockchains.ETHEREUM;
                    const WalletBlockchain = defaultWallet.getBlockchain( blockchain );
                    const WalletTestNode: GenericNode = WalletBlockchain.getNode();
                    WalletTestNode.init( WalletTestNode.NETWORKS[ WalletTestNode.NETWORKS.length - 1 ] );
                    account = defaultWallet.createAccount(blockchain);

                    const myNonce = await account.getNonce();

                    // build a custom transaction
                    const tx = new EthereumTx( {
                        from: account.address,
                        nonce: myNonce,
                        data: "0x6080604052348015600f57600080fd5b50603e80601d6000396000f3006080604052348015600f57600080fd5b500000a165627a7a72305820314703b0f77a5338ad6a5fea41ad7065949be7496f42d96e630efb1a00a375670029",
                        gasPrice: 20000000000, // default rpc
                        gasLimit: 6700000,
                    });

                    tx.sign( Buffer.from( account.privateKey.substr(2), "hex" ) );
                    txHash = await account.node.sendRaw( tx.serialize() );

                    transaction = {
                        txn: txHash,
                        setReceiptStatus: ( receipt => {
                            transaction.receipt = receipt;
                        }),
                    } as GenericTransaction;
                });

                it("should throw an error if any problem arises", async () => {
                    account.node.setCustomNetworkUrl("http://127.0.0.1:1");
                    try {
                        const receipt = await account.node.getTransactionReceipt( transaction );
                        assert.isFalse( true, "This should never be false." );
                    } catch ( err ) {
                        const errMsg = err.message.split(":")[0];
                        assert.equal( errMsg, "Error", "Error message did not match." );
                    }
                    account.node.resetCustomNetworkUrl();
                });

                it("should return the cached / same pointer to the receipt if already received", async () => {
                    const receipt = await account.node.getTransactionReceipt( transaction );
                    const secondReceipt = await account.node.getTransactionReceipt( transaction );
                    assert.equal( receipt, secondReceipt, "Error receipts did not match." );
                });
            });
        });
    });
});
