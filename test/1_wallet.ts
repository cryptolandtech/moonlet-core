import { assert } from "chai";
import mocha from "mocha";

// import Wallet from "../src/core/wallet";
import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../src/index";

describe("Core", () => {

    describe("MnemonicUtils", () => {

        describe("getWordsFromMnemonic", () => {

            it("should properly split 12 words for 'EN' language", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( "one two three four five six seven eight nine ten eleven twelve", "EN" );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

            // JA is using '\u3000' as a separator instead of a '\u0020'
            it("should properly split 12 words for 'JA' language", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( 'ようじ　てんめつ　いだく　こうりつ　けいさつ　てはい　せつりつ　ぐこう　えしゃく　かんたん　ごうほう　けんにん', "JA" );
                assert.equal( words.length, 12, "Did not return 12 words in an array");
            });

        });

        describe("generateMnemonic", () => {

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

        describe("mnemonicToSeed", () => {

            it("should return a 64 byte Buffer", async () => {
                const seed = MnemonicUtils.mnemonicToSeed( "one two three four five six seven eight nine ten eleven twelve" );
                assert.equal( seed.length, 64, "Did not return a 64 byte buffer");
            });

            it("should also accept a password 'salt' parameter", async () => {
                const password = "salt";
                const seed = MnemonicUtils.mnemonicToSeed( "one two three four five six seven eight nine ten eleven twelve", password );
                assert.equal( seed.length, 64, "Did not return a 64 byte buffer");
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

        describe("constructed with no parameters", () => {

            const wallet: Wallet = new Wallet();

            it("should generate a new mnemonic phrase of 12 words", async () => {
                const words = MnemonicUtils.getWordsFromMnemonic( wallet.mnemonics, wallet.mnemonicslang );
                assert.equal( words.length, 12, "Error: Generated mnemonic does not have 12 words.");
            });
        });
        /*
        beforeEach(async () => {
            wallet = new Wallet();
        });
        */

    });

});
