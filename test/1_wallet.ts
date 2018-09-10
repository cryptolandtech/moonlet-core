import { assert } from "chai";
import mocha from "mocha";

// import Wallet from "../src/core/wallet";
import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../src/index";
import { EthereumAccount } from "../src/blockchain/ethereum/account";

describe("Core", () => {

    describe("MnemonicUtils class", () => {

        describe("getWordsFromMnemonic()", () => {

            it("should properly split 12 words for 'EN' language", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about", "EN" );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

            // JA is using '\u3000' as a separator instead of a '\u0020'
            it("should properly split 12 words for 'JA' language", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( 'ようじ　てんめつ　いだく　こうりつ　けいさつ　てはい　せつりつ　ぐこう　えしゃく　かんたん　ごうほう　けんにん', "JA" );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

        });

        describe("generateMnemonic()", () => {

            it("should properly generate a 12 words mnemonic phrase for 'EN' language", async () => {
                const lang = "EN";
                const mnemonic = MnemonicUtils.generateMnemonic(lang);
                const words = MnemonicUtils.getWordsFromMnemonic( mnemonic, lang );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

            it("should properly generate a 12 words mnemonic phrase for 'chinese_simplified' language", async () => {
                const lang = "chinese_simplified";
                const mnemonic = MnemonicUtils.generateMnemonic(lang);
                const words = MnemonicUtils.getWordsFromMnemonic( mnemonic, lang );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

            it("should properly generate a 12 words mnemonic phrase for 'JA' language", async () => {
                const lang = "JA";
                const mnemonic = MnemonicUtils.generateMnemonic(lang);
                const words = MnemonicUtils.getWordsFromMnemonic( mnemonic, lang );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

            it("should throw if supplied language does not have a wordlist", async () => {
                const lang = "UNKNOWN";
                assert.throws(() => {
                    MnemonicUtils.generateMnemonic(lang);
                }, /^Mnemonics language \'UNKNOWN\' is not supported.$/);
            });

        });

        describe("mnemonicToSeed()", () => {

            it("should return a 64 byte Buffer", async () => {
                const lang = "EN";
                const seed = MnemonicUtils.mnemonicToSeed( "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about", lang );
                assert.equal( seed.length, 64, "Did not return a 64 byte buffer");
            });

            it("should also accept a password 'salt' parameter", async () => {
                const password = "salt";
                const lang = "EN";
                const seed = MnemonicUtils.mnemonicToSeed( "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about", lang, password );
                assert.equal( seed.length, 64, "Did not return a 64 byte buffer");
            });

            it("should throw if supplied mnemonic is invalid", async () => {
                const lang = "EN";
                assert.throws(() => {
                    MnemonicUtils.mnemonicToSeed("this is an invalid mnemonic", lang);
                }, /^Invalid Mnemonic.$/);
            });
        });

    });

    describe("Wallet", () => {

        describe("constructed with no parameters", () => {

            const wallet: Wallet = new Wallet();

            it("should default to language 'EN'", async () => {
                assert.equal( wallet.mnemonicslang, "EN", "Mnemonics language is not EN.");
            });

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });
        });

        describe("constructed with parameters ( language = EN )", () => {

            const wallet: Wallet = new Wallet(undefined, "EN");

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            it("should generate a 64 byte length seed Buffer", async () => {
                assert.equal( wallet.seed.length, 64, "Generated seed length is not 64.");
            });
        });

        describe("constructed with parameters ( language = JA )", () => {

            const wallet: Wallet = new Wallet(undefined, "JA");

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Generated mnemonic does not have 12 words.");
            });

            it("should generate a 64 byte length seed Buffer", async () => {
                assert.equal( wallet.seed.length, 64, "Generated seed length is not 64.");
            });
        });

        describe("createAccount()", () => {

            const wallet: Wallet = new Wallet(undefined, "EN");

            it("should throw if no blockchain is specified", async () => {
                assert.throws(() => {
                    // @ts-ignore: shut up! we're testing for this scenario
                    wallet.createAccount();
                }, /^createAccount: type 'undefined' does not exist.$/);
            });

            it("should throw if specified blockchain type does not exist", async () => {
                assert.throws(() => {
                    // @ts-ignore: shut up! we're testing for this scenario
                    wallet.createAccount("UNKNOWN");
                }, /^createAccount: type 'UNKNOWN' does not exist.$/);
            });

        });

        describe("createAccount(undefined, 'EN')", () => {

            const defaultWallet: Wallet = new Wallet(undefined, "EN");
            defaultWallet.createAccount(Blockchains.ETHEREUM);

            it("should create an HD Wallet if blockchain type is supported", async () => {
                // console.log(defaultWallet.accounts.get(Blockchains.ETHEREUM)[0]);
            });

        });
        /*
        beforeEach(async () => {
            wallet = new Wallet();
        });
        */

    });

});
