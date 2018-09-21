import { assert } from "chai";
import mocha from "mocha";

import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../src/index";
import { GenericAccount } from "../src/core/account";
import { GenericNode } from "../src/core/node";
import { GenericTransaction } from "../src/core/transaction";
import { GenericAccountUtils } from "../src/core/account-utils";

describe("Core", async () => {

    describe("Wallet", async () => {

        describe("Wallet: constructed with parameters ( language = EN )", async () => {

            const wallet: Wallet = new Wallet(undefined, "EN");

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            it("should generate a 64 byte length seed Buffer", async () => {
                assert.equal( wallet.seed.length, 64, "Generated seed length is not 64.");
            });
        });

        describe("Wallet: constructed with parameters ( language = JA )", async () => {

            const wallet: Wallet = new Wallet(undefined, "JA");

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            it("should generate a 64 byte length seed Buffer", async () => {
                assert.equal( wallet.seed.length, 64, "Generated seed length is not 64.");
            });
        });

        describe("Wallet: constructed with no parameters", async () => {

            const wallet: Wallet = new Wallet();

            it("should default to language 'EN'", async () => {
                assert.equal( wallet.mnemonicslang, "EN", "Mnemonics language is not EN.");
            });

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            describe("createAccount()", async () => {

                // const wallet: Wallet = new Wallet(undefined, "EN");

                it("should throw if no blockchain is specified", async () => {
                    assert.throws(() => {
                        // @ts-ignore: we're testing for this scenario
                        wallet.createAccount();
                    }, /^createAccount: type 'undefined' does not exist.$/);
                });

                it("should throw if specified blockchain type does not exist", async () => {
                    assert.throws(() => {
                        // @ts-ignore: we're testing for this scenario
                        wallet.createAccount("UNKNOWN");
                    }, /^createAccount: type 'UNKNOWN' does not exist.$/);
                });

            });

            describe("createAccount(Blockchains.ETHEREUM)", async () => {

                const defaultWallet: Wallet = new Wallet(undefined, "EN");
                const blockchain = Blockchains.ETHEREUM;
                const account = defaultWallet.createAccount(blockchain);
                const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );

                it("should create an account of type '" + AccountClassTypeString + "'", async () => {
                    const firstAccount = defaultWallet.getAccounts(blockchain)[0];
                    assert.equal( firstAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                });

                it("should return an object of type '" + AccountClassTypeString + "'", async () => {
                    assert.equal( account.constructor.name, AccountClassTypeString, "class does not match expected" );
                });

                it("should return an object that is equal to the first indexed account in wallet.accounts Map", async () => {
                    const firstAccount = defaultWallet.getAccounts(blockchain)[0];
                    const firstIndex = defaultWallet.accounts.get(blockchain)[0];
                    assert.equal( account, firstAccount, "Accounts do not match" );
                    assert.equal( account, firstIndex, "Accounts do not match" );
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
                        assert.isTrue( account.utils.isValidPrivate( new Buffer( account.privateKey ) ), "private key is invalid" );
                    });

                    describe("node HD root key", async () => {
                        const rootKey = account.node.HDRootKey;

                        it("should have the correct class", async () => {
                            assert.equal( rootKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (4)", async () => {
                            assert.equal( rootKey.npmhdkey.depth, 4, "depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "depth does not match" );
                        });
                    });

                    describe("account HD derrivation key", async () => {
                        const HDKey = account.hd;

                        it("should have the correct class", async () => {
                            assert.equal( HDKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (5)", async () => {
                            assert.equal( HDKey.npmhdkey.depth, 5, "depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( HDKey.npmhdkey.index, 0, "depth does not match" );
                        });
                    });

                });

            });

        });

        describe("Wallet: constructed with parameters ( mnemonic, language = EN )", async () => {

            const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

            const ethereumwallet0Address = "0x9d9216e0a29468bE1eCaCc351ce3887be8a26222";
            const ethereumwallet0PrivateKey = "0xe49c840fcb71fafcaa068c7d45a6b99f8d5b6064effe7d793b6490641e75cca8";
            const ethereumwallet0PublicKey = "0x30bfa6298178e3ab1f4a2e5d5c3c7d79505c0b3ef7958ac0fec319a67d3e47eb01f05a7059311a6d061b7a4c1eff38549909b0782256e22f748cb9e6f3c4c4a4";

            const ethereumwallet1Address = "0x42D0290527b2F2334c2E30C10562C1731DBA9dFE";
            const ethereumwallet1PrivateKey = "0xdb6b3abd2101ce175574e35d0f641f63adf622210c57e56c3c99eaf00572994e";
            const ethereumwallet1PublicKey = "0xfca9eaacb1d60081e8f3b89e576868ae14ee8ab99552b343364be4c03ce13fd7c74b5719ff936db2603c360325dedb62c85a789312bff66805bb0459cf0181ff";

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");

            describe("createAccount(Blockchains.ETHEREUM)", async () => {

                const blockchain = Blockchains.ETHEREUM;
                const account = defaultWallet.createAccount(blockchain);

                it("should return an object that is equal to the first indexed account in wallet.accounts Map", async () => {
                    const firstAccount = defaultWallet.getAccounts(blockchain)[0];
                    const firstIndex = defaultWallet.accounts.get(blockchain)[0];
                    assert.equal( account, firstAccount, "Accounts do not match" );
                    assert.equal( account, firstIndex, "Accounts do not match" );
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
                        assert.isTrue( account.utils.isValidPrivate( new Buffer( account.privateKey ) ), "private key is invalid" );
                    });

                    it("should have a generated private key that matches in test PrivateKey value constant", async () => {
                        assert.equal( account.privateKey, ethereumwallet0PrivateKey, "generated private key is invalid" );
                    });

                    it("should have a generated public key that matches in test PublicKey value constant", async () => {
                        assert.equal( account.publicKey, ethereumwallet0PublicKey, "generated public key is invalid" );
                    });

                    it("should have a generated address that matches in test address value constant", async () => {
                        assert.equal( account.address, ethereumwallet0Address, "generated address is invalid" );
                    });

                    describe("node HD root key", async () => {
                        const rootKey = account.node.HDRootKey;

                        it("should have the correct class", async () => {
                            assert.equal( rootKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (4)", async () => {
                            assert.equal( rootKey.npmhdkey.depth, 4, "depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "depth does not match" );
                        });

                        it("should have the correct node HDCoinValue", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "depth does not match" );
                        });
                    });

                    describe("account HD derrivation key", async () => {
                        const HDKey = account.hd;

                        it("should have the correct class", async () => {
                            assert.equal( HDKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (5)", async () => {
                            assert.equal( HDKey.npmhdkey.depth, 5, "depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( HDKey.npmhdkey.index, 0, "depth does not match" );
                        });

                    });

                });

            });

            describe("2nd call to createAccount(Blockchains.ETHEREUM)", async () => {

                const blockchain = Blockchains.ETHEREUM;
                const account = defaultWallet.createAccount(blockchain);

                it("should return an object that is equal to the second indexed account in wallet.accounts Map", async () => {
                    const secondAccount = defaultWallet.getAccounts(blockchain)[1];
                    const secondIndex = defaultWallet.accounts.get(blockchain)[1];
                    assert.equal( account, secondAccount, "Accounts do not match" );
                    assert.equal( account, secondIndex, "Accounts do not match" );
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
                        assert.isTrue( account.utils.isValidPrivate( new Buffer( account.privateKey ) ), "private key is invalid" );
                    });

                    it("should have a generated private key that matches in test PrivateKey value constant", async () => {
                        assert.equal( account.privateKey, ethereumwallet1PrivateKey, "generated private key is invalid" );
                    });

                    it("should have a generated public key that matches in test PublicKey value constant", async () => {
                        assert.equal( account.publicKey, ethereumwallet1PublicKey, "generated public key is invalid" );
                    });

                    it("should have a generated address that matches in test address value constant", async () => {
                        assert.equal( account.address, ethereumwallet1Address, "generated address is invalid" );
                    });

                    describe("node HD root key", async () => {
                        const rootKey = account.node.HDRootKey;

                        it("should have the correct class", async () => {
                            assert.equal( rootKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (4)", async () => {
                            assert.equal( rootKey.npmhdkey.depth, 4, "depth does not match" );
                        });

                        it("should have the correct index (0)", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "depth does not match" );
                        });

                        it("should have the correct node HDCoinValue", async () => {
                            assert.equal( rootKey.npmhdkey.index, 0, "depth does not match" );
                        });
                    });

                    describe("account HD derrivation key", async () => {
                        const HDKey = account.hd;

                        it("should have the correct class", async () => {
                            assert.equal( HDKey.constructor.name, "HDKey", "class does not match expected" );
                        });

                        it("should have the correct depth (5)", async () => {
                            assert.equal( HDKey.npmhdkey.depth, 5, "depth does not match" );
                        });

                        it("should have the correct index (1)", async () => {
                            assert.equal( HDKey.npmhdkey.index, 1, "depth does not match" );
                        });

                    });

                });

            });
        });

        it("test", async () => {
            // account.privateKey;

            // assert.isTrue( HDKey, "HDRootKey should not be null" );

            // console.log(account );
        });

    });

});
