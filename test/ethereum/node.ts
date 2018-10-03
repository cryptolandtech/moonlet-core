import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Blockchains } from "../../src/index";
import { GenericNode } from "../../src/core/node";

const mapper = new DynamicClassMapper();
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );
import { BigNumber } from 'bignumber.js';
import { EthereumAccountUtils } from "../../src/blockchain/ethereum/account-utils";

const ethereumWallet0Address = "0x9d9216e0a29468bE1eCaCc351ce3887be8a26222";

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

                it("blockchain should be undefined", async () => {
                    assert.equal( TestNode.blockchain, undefined, "blockchain should be undefined" );
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

        });
    });
});
