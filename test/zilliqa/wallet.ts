import { assert } from "chai";
import mocha from "mocha";

import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../../src/index";
import { GenericAccount } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction } from "../../src/core/transaction";
import { GenericAccountUtils } from "../../src/core/account-utils";
import Ethereum from "../../src/blockchain/ethereum/class.index";
import Zilliqa from "../../src/blockchain/zilliqa/class.index";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Zilliqa", async () => {

    describe("Wallet", async () => {

        describe("Wallet: constructed with parameters ( mnemonic, language = EN )", async () => {

            const Wallet0Address = "0x17f343a7A13BaC8026D6C84e2Ee2925aEba1FA61";
            const Wallet0PrivateKey = "0xed50e832ef7722239de17e49cd40d86c16df4649275452af470e9b84ef14eea8";
            const Wallet0PublicKey = "0x03b51541a4e231517740ec9bc5dda5647bc5ef560f849f95a4f7d9eaa118fba131";

            const Wallet1Address = "0x693e20469bFFde10dD4d252d5f907Cebbd201BB6";
            const Wallet1PrivateKey = "0x195adc169bab9b6ed6c858089a42e47692b2c7fbe5a1b109c7225bcbd1ca89b9";
            const Wallet1PublicKey = "0x038cc9c4a58a5e8e6f99c5909b4b8c87e6ef8344cbf21d7ecb240ba88a11d0ec82";

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
            defaultWallet.loadBlockchain(Ethereum);
            defaultWallet.loadBlockchain(Zilliqa);
            const blockchain = Blockchains.ZILLIQA;

            describe("createAccount(Blockchains.ZILLIQA) -> index:0", async () => {

                const account = defaultWallet.createAccount(blockchain);

                it("should return an object that is equal to the third indexed account in wallet.accounts Map", async () => {
                    const getAccount = defaultWallet.getAccounts(blockchain)[0];
                    const getIndex = defaultWallet.accounts.get(blockchain)[0];
                    assert.equal( account, getAccount, "Accounts do not match" );
                    assert.equal( account, getIndex, "Accounts do not match" );
                });

                describe("resulting account ( HD Wallet )", async () => {

                    const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );

                    it("should have the expected node type '" + NodeClassTypeString + "'", async () => {
                        assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );
                    });

                    it("should have a node with an HD root key", async () => {
                        const rootKey = account.node.HDRootKey;
                        assert.isNotNull( rootKey, "HDRootKey should not be null" );
                    });

                    it("should have account HD derrivation key", async () => {
                        const HDKey = account.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    });

                    it("should have a valid private key", async () => {
                        assert.isTrue( account.utils.isValidPrivate( Buffer.from(account.privateKey.replace("0x", ""), "hex") ), "private key is invalid" );
                    });

                    it("should have a generated private key that matches in test PrivateKey value constant", async () => {
                        assert.equal( account.privateKey, Wallet0PrivateKey, "generated private key is invalid" );
                    });

                    it("should have a generated public key that matches in test PublicKey value constant", async () => {
                        assert.equal( account.publicKey, Wallet0PublicKey, "generated public key is invalid" );
                    });

                    it("should have a generated address that matches in test address value constant", async () => {
                        assert.equal( account.address, Wallet0Address, "generated address is invalid" );
                    });

                    describe("node HD root key", async () => {
                        const rootKey = account.node.HDRootKey;

                        it("should have the correct class", async () => {
                            assert.equal( rootKey.constructor.name, "HDKey", "rootKey class does not match expected" );
                        });

                        it("should have the correct depth (4)", async () => {
                            assert.equal( rootKey.npmhdkey.depth, 4, "rootKey depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "rootKey depth does not match" );
                        });

                        it("should have the correct node HDCoinValue", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "rootKey depth does not match" );
                        });
                    });

                    describe("account HD derrivation key", async () => {
                        const HDKey = account.hd;

                        it("should have the correct class", async () => {
                            assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        });

                        it("should have the correct depth (5)", async () => {
                            assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( HDKey.npmhdkey.index, 0, "HDKey depth does not match" );
                        });

                    });

                });

            });

            describe("2nd call to createAccount(Blockchains.ZILLIQA)", async () => {

                const account = defaultWallet.createAccount(blockchain);

                it("should return an object that is equal to the second indexed account in wallet.accounts Map", async () => {
                    const getAccount = defaultWallet.getAccounts(blockchain)[1];
                    const getIndex = defaultWallet.accounts.get(blockchain)[1];
                    assert.equal( account, getAccount, "Accounts do not match" );
                    assert.equal( account, getIndex, "Accounts do not match" );
                });

                describe("resulting account ( HD Wallet )", async () => {

                    const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );

                    it("should have the expected node type '" + NodeClassTypeString + "'", async () => {
                        assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );
                    });

                    it("should have a node with an HD root key", async () => {
                        const rootKey = account.node.HDRootKey;
                        assert.isNotNull( rootKey, "HDRootKey should not be null" );
                    });

                    it("should have account HD derrivation key", async () => {
                        const HDKey = account.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    });

                    it("should have a valid private key", async () => {
                        assert.isTrue( account.utils.isValidPrivate( Buffer.from(account.privateKey.replace("0x", ""), "hex") ), "private key is invalid" );
                    });

                    it("should have a generated private key that matches in test PrivateKey value constant", async () => {
                        assert.equal( account.privateKey, Wallet1PrivateKey, "generated private key is invalid" );
                    });

                    it("should have a generated public key that matches in test PublicKey value constant", async () => {
                        assert.equal( account.publicKey, Wallet1PublicKey, "generated public key is invalid" );
                    });

                    it("should have a generated address that matches in test address value constant", async () => {
                        assert.equal( account.address, Wallet1Address, "generated address is invalid" );
                    });

                    describe("node HD root key", async () => {
                        const rootKey = account.node.HDRootKey;

                        it("should have the correct class", async () => {
                            assert.equal( rootKey.constructor.name, "HDKey", "rootKey class does not match expected" );
                        });

                        it("should have the correct depth (4)", async () => {
                            assert.equal( rootKey.npmhdkey.depth, 4, "rootKey depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "rootKey depth does not match" );
                        });

                        it("should have the correct node HDCoinValue", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "rootKey depth does not match" );
                        });
                    });

                    describe("account HD derrivation key", async () => {
                        const HDKey = account.hd;

                        it("should have the correct class", async () => {
                            assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        });

                        it("should have the correct depth (5)", async () => {
                            assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                        });

                        it("should have the correct index (1)", async () => {
                            assert.equal( HDKey.npmhdkey.index, 1, "HDKey depth does not match" );
                        });

                    });

                });

            });

        });

    });

});
