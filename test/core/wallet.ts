import { Zilliqa } from './../../src/blockchain/zilliqa/class.index';
import { Ethereum } from './../../src/blockchain/ethereum/class.index';
import { assert } from "chai";
import mocha from "mocha";

import { Wallet, MnemonicUtils, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import EthereumNetworks from "../../src/blockchain/ethereum/networks";
import HDKey from "../../src/core/utils/hdkey";

describe("Core", async () => {

    describe("Wallet", async () => {

        describe("Wallet: constructed with parameters ( language = EN )", async () => {

            const wallet: Wallet = new Wallet(undefined, "EN");
            wallet.loadBlockchain(Ethereum);
            wallet.loadBlockchain(Zilliqa);

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
            wallet.loadBlockchain(Ethereum);
            wallet.loadBlockchain(Zilliqa);

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
            wallet.loadBlockchain(Ethereum);
            wallet.loadBlockchain(Zilliqa);

            it("should default to language 'EN'", async () => {
                assert.equal( wallet.mnemonicslang, "EN", "Mnemonics language is not EN.");
            });

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            describe("createAccount()", async () => {

                it("should throw if no blockchain is specified", async () => {
                    assert.throws(() => {
                        // @ts-ignore: we're testing for this scenario
                        wallet.createAccount();
                    }, /^createAccount: Blockchain "undefined" does not have an implementation. Make sure it\'s indexed in the class store.$/);
                });

                it("should throw if specified blockchain type does not exist", async () => {
                    assert.throws(() => {
                        // @ts-ignore: we're testing for this scenario
                        wallet.createAccount("UNKNOWN");
                    }, /^createAccount: Blockchain "UNKNOWN" does not have an implementation. Make sure it\'s indexed in the class store.$/);
                });

            });

            describe("getAccounts()", async () => {

                it("should throw if no blockchain is specified", async () => {
                    assert.throws(() => {
                        // @ts-ignore: we're testing for this scenario
                        wallet.getAccounts();
                    }, /^getAccounts: Blockchain "undefined" does not have an implementation. Make sure it\'s indexed in the class store.$/);
                });

                it("should return an empty array if specified blockchain exists but has no accounts", async () => {
                    const result = wallet.getAccounts( Blockchains.ETHEREUM );
                    const expected: any = [];
                    assert.equal( result.toString(), expected.toString(), "Returded value did not match");
                });

            });

            describe("getAccountsMap()", async () => {

                // coverage
                const Map = wallet.getAccountsMap();

                it("should return a Map Object", async () => {
                    assert.equal( Map.constructor.name, "Map", "Returded value did not match");
                });

            });

            describe("getClassMapper()", async () => {

                // coverage
                const Object = wallet.getClassMapper();

                it("should return a DynamicClassMapper Object", async () => {
                    assert.equal( Object.constructor.name, "DynamicClass", "Returded value did not match");
                });

            });

            describe("getNetworks(blockchain) result", async () => {

                it("should return an array containing all available Networks for said blockchain", async () => {
                    const networks = wallet.getNetworks( Blockchains.ETHEREUM );
                    assert.equal( networks, EthereumNetworks, "Returded value did not match");
                });

            });

            describe("getCurrentNetwork(blockchain) result", async () => {

                it("should return a number", async () => {
                    const currentNetwork = wallet.getCurrentNetwork( Blockchains.ETHEREUM );
                    assert.equal( currentNetwork, 0, "Returded value did not match");
                });

            });

            describe("switchNetwork(blockchain, 1) result", async () => {

                it("should update current network to requested", async () => {
                    wallet.switchNetwork(Blockchains.ETHEREUM, 1);
                    const currentNetwork = wallet.getCurrentNetwork( Blockchains.ETHEREUM );
                    assert.equal( currentNetwork, 1, "Returded value did not match");
                });

            });

            describe("getBlockchain() result", async () => {

                // coverage
                const EthereumBlockchain = wallet.getBlockchain(Blockchains.ETHEREUM);
                const keys = Object.keys(EthereumBlockchain);

                it("getNode method should be present", async () => {
                    assert.isTrue( keys.indexOf("getNode") >= 0, "Returded value did not match");
                });

                it("getNode should be a GenericNode reference", async () => {
                    assert.equal( EthereumBlockchain.getNode().constructor.name, "EthereumNode", "Returded value did not match");
                });

                it("createAccount method should be present", async () => {
                    assert.isTrue( keys.indexOf("createAccount") >= 0, "Returded value did not match");
                });

                it("createAccount should return a new account", async () => {
                    const account = EthereumBlockchain.createAccount();
                    assert.equal( EthereumBlockchain.getAllAccounts().length, 1, "Should have 1 account");
                });

                it("importAccount method should be present", async () => {
                    assert.isTrue( keys.indexOf("importAccount") >= 0, "Returded value did not match");
                });

                it("importAccount should index the new account", async () => {

                    const accountOptions = {
                        node: EthereumBlockchain.getNode(),
                        type: AccountType.LOOSE,
                        privateKey: "e49c840fcb71fafcaa068c7d45a6b99f8d5b6064effe7d793b6490641e75cca8",
                    };

                    const DynamicClassName = GenericAccount.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );
                    const account: GenericAccount = wallet.getClassMapper().getInstance( DynamicClassName, accountOptions );
                    EthereumBlockchain.importAccount( account );

                    assert.equal( EthereumBlockchain.getAllAccounts().length, 2, "Should have 2 accounts");
                });

                it("getAccounts method should be present", async () => {
                    assert.isTrue( keys.indexOf("getAccounts") >= 0, "Returded value did not match");
                });

                it("getAccounts should be a getAccounts[BlockchainENUM] reference", async () => {
                    assert.equal( EthereumBlockchain.getAllAccounts().constructor.name, "Array", "Returded value did not match");
                });

                it("getAllAccounts method should be present", async () => {
                    assert.isTrue( keys.indexOf("getAllAccounts") >= 0, "Returded value did not match");
                });

                it("getAllAccounts should be a getAllAccounts[BlockchainENUM] reference", async () => {
                    assert.equal( EthereumBlockchain.getAllAccounts().constructor.name, "Array", "Returded value did not match");
                });

                it("getNetworks method should be present", async () => {
                    assert.isTrue( keys.indexOf("getNetworks") >= 0, "Returded value did not match");
                });

                it("getCurrentNetwork method should be present", async () => {
                    assert.isTrue( keys.indexOf("getCurrentNetwork") >= 0, "Returded value did not match");
                });

                it("switchNetwork method should be present", async () => {
                    assert.isTrue( keys.indexOf("switchNetwork") >= 0, "Returded value did not match");
                });

                it("getInitializedNodes method should be present", async () => {
                    assert.isTrue( keys.indexOf("getInitializedNodes") >= 0, "Returded value did not match");
                });

                describe("getNetworks() result", async () => {

                    it("should return an array containing all available Networks for said blockchain", async () => {
                        const networks = EthereumBlockchain.getNetworks();
                        assert.equal( networks, EthereumNetworks, "Returded value did not match");
                    });

                });

                describe("getCurrentNetwork() result", async () => {

                    it("should return current network id number", async () => {
                        const currentNetwork = EthereumBlockchain.getCurrentNetwork();
                        assert.equal( currentNetwork, 1, "Returded value did not match");
                    });

                });

                describe("switchNetwork(1) result", async () => {

                    it("should update current network to requested", async () => {
                        EthereumBlockchain.switchNetwork(1);
                        const currentNetwork = EthereumBlockchain.getCurrentNetwork();
                        assert.equal( currentNetwork, 1, "Returded value did not match");
                    });

                });

                describe("getInitializedNodes() result", async () => {

                    it("should return a reference to wallet.nodes.get(blockchain)", async () => {
                        const nodes = EthereumBlockchain.getInitializedNodes();
                        const walletnodes = wallet.nodes.get(Blockchains.ETHEREUM);
                        assert.equal( nodes, walletnodes, "Returded value did not match");
                    });

                });

            });

            describe("importAccount()", async () => {

                const importWallet: Wallet = new Wallet();
                importWallet.loadBlockchain(Ethereum);
                importWallet.loadBlockchain(Zilliqa);

                const EthereumBlockchain = importWallet.getBlockchain(Blockchains.ETHEREUM);
                const DynamicClassName = GenericAccount.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

                it("should throw if importing an HD account", async () => {

                    const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";
                    const lang = "EN";
                    const seed = MnemonicUtils.mnemonicToSeed( mnemonic, lang );

                    const account: GenericAccount = wallet.getClassMapper().getInstance( DynamicClassName, {
                        node: EthereumBlockchain.getNode(),
                        type: AccountType.HD,
                        hd: HDKey.fromMasterSeed(seed),
                    });

                    assert.throws(() => {
                        EthereumBlockchain.importAccount( account );
                    }, /^importAccount: you cannot import HD Wallets.$/);
                });

                it("should import a new LOOSE account", async () => {

                    const account: GenericAccount = wallet.getClassMapper().getInstance( DynamicClassName, {
                        node: EthereumBlockchain.getNode(),
                        type: AccountType.LOOSE,
                        privateKey: "e49c840fcb71fafcaa068c7d45a6b99f8d5b6064effe7d793b6490641e75cca8",
                    });

                    EthereumBlockchain.importAccount( account );

                    assert.equal( EthereumBlockchain.getAllAccounts().length, 1, "Should have 1 accounts");
                });

                it("should import a new HARDWARE account", async () => {

                    const account: GenericAccount = wallet.getClassMapper().getInstance( DynamicClassName, {
                        node: EthereumBlockchain.getNode(),
                        type: AccountType.HARDWARE,
                        address: "0x9d9216e0a29468bE1eCaCc351ce3887be8a26222",
                    });

                    EthereumBlockchain.importAccount( account );

                    assert.equal( EthereumBlockchain.getAllAccounts().length, 2, "Should have 2 accounts");
                });
            });

        });

    });

});
