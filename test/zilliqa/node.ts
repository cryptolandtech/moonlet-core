import { Ethereum } from './../../src/blockchain/ethereum/class.index';
import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericNode } from "../../src/core/node";
import { GenericAccount } from "../../src/core/account";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "../../src/blockchain/zilliqa/transaction";
import { GenericTransaction } from "../../src/core/transaction";
import Zilliqa from '../../src/blockchain/zilliqa/class.index';

const mapper = new DynamicClassMapper();
mapper.collectClasses(Zilliqa.AvailableClasses);
mapper.collectClasses(Ethereum.AvailableClasses);
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ZILLIQA] );

const Wallet0Address = "7bb3b0e8a59f3f61d9bff038f4aeb42cae2ecce8";
const Wallet0PrivateKey = "db11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";
import { BN, Long } from '@zilliqa-js/util';

describe("Core", async () => {

    describe("ZilliqaNode", async () => {

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
                            "GetNetworkId", [[]], "",
                        );
                        assert.equal( test.constructor.name, "Promise", "Returned object should be a Promise" );
                    });

                    it("should be string once the Promise resolves and decoder is not specified", async () => {
                        const test = await TestNode.rpcCall(
                            "GetNetworkId", [[]], "",
                        );
                        assert.equal( typeof test, "string", "Returned parameter should be a string" );
                    });

                });

                describe("invalid call ( to testrpc / kaya )", async () => {

                    const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                    TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );
                    it("error can be caught using a try/catch statement", async () => {
                        try {
                            const test = await TestNode.rpcCall(
                                "getNetworkId", [[]], "",
                            );
                        } catch (e) {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Error: Request failed with status code 404",
                                "Invalid message",
                            );
                        }
                    });

                    it("error can be caught using a then().catch() statement", async () => {
                        const test = TestNode.rpcCall(
                            "getNetworkId", [], "",
                        ).then( ( result ) => {
                            // this never gets called
                            assert.isTrue( false, "Promise.resolve should not be called in this case!" );
                        }).catch( e => {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "Error: Request failed with status code 404",
                                "Invalid message",
                            );
                        });
                    });

                });

                describe("invalid call ( to live node / proxy )", async () => {

                    const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                    TestNode.init( TestNode.NETWORKS[ 0 ] );

                    it("error can be caught using a try/catch statement", async () => {

                        try {
                            const test = await TestNode.rpcCall(
                                "getNetworkId", [], "",
                            );
                        } catch (e) {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "METHOD_NOT_FOUND: The method being requested is not available on this server",
                                "Invalid message",
                            );
                        }

                    });
                    it("error can be caught using a then().catch() statement", async () => {
                        const test = TestNode.rpcCall(
                            "getNetworkId", [], "",
                        ).then( ( result ) => {
                            // this never gets called
                            assert.isTrue( false, "Promise.resolve should not be called in this case!" );
                        }).catch( e => {
                            assert.equal( e.constructor.name, "Error", "Should have returned an Error object" );
                            assert.equal(
                                e.message,
                                "METHOD_NOT_FOUND: The method being requested is not available on this server",
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
                        const test = TestNode.resultDecoder( Wallet0Address, "not_implemented" );
                    }, 'type: [not_implemented] not implemented');
                });

                it("should return a string if type not specified", async () => {
                    const test = TestNode.resultDecoder( Wallet0Address );
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
                    const nonce = TestNode.getNonce( Wallet0Address );
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });

                it("should be a number once the Promise resolves", async () => {
                    const nonce: number = await TestNode.getNonce( Wallet0Address );
                    assert.equal( typeof nonce, "number", "Returned parameter should be a number" );
                });

            });

            describe("getBalance( address )", async () => {

                const TestNode: GenericNode = mapper.getInstance( DynamicClassName );
                TestNode.init( TestNode.NETWORKS[ TestNode.NETWORKS.length - 1 ] );

                it("should return a Promise", async () => {
                    const nonce = TestNode.getBalance( Wallet0Address );
                    assert.equal( nonce.constructor.name, "Promise", "Returned object should be a Promise" );
                });

                it("should be a BigNumber once the Promise resolves", async () => {
                    const balance = await TestNode.getBalance( Wallet0Address );
                    assert.equal( balance.constructor.name, "BigNumber", "Returned parameter should be a BigNumber" );
                });

            });

            /*

            not supported at the moment..

            describe("getTransactionReceipt( GenericTransaction )", async () => {

                let account;
                let txHash;
                let transaction;

                before( async () => {
                    const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
                    defaultWallet.loadBlockchain(Ethereum);
                    defaultWallet.loadBlockchain(Zilliqa);
                    const blockchain = Blockchains.ZILLIQA;
                    const WalletBlockchain = defaultWallet.getBlockchain( blockchain );
                    const WalletTestNode: GenericNode = WalletBlockchain.getNode();
                    WalletTestNode.init( WalletTestNode.NETWORKS[ 0 ] );
                    account = defaultWallet.createAccount(blockchain);

                    const myNonce = await account.getNonce();

                    const transactionDetails = {
                        version: 0,
                        nonce: myNonce,
                        to: '6cd3667ba79310837e33f0aecbe13688a6cbca32',
                        amount: new BN( 1 ) ,
                        gasPrice: 1,
                        gasLimit: 1,
                        code: null,
                        data: null,
                        pubKey: null,
                    };
                    const tx = ZilliqaTx.createTransactionJson( account.privateKey.replace("0x", ""), transactionDetails );

                    // tx.sign( Buffer.from( account.privateKey.replace("0x", ""), "hex" ) );
                    txHash = await account.node.sendRaw( tx );

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
            */
        });
    });
});
