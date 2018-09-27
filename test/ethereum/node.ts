import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Blockchains } from "../../src/index";
import { GenericNode } from "../../src/core/node";

const mapper = new DynamicClassMapper();
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

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

        });
    });
});
