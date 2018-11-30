import { assert } from "chai";
import mocha from "mocha";
import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../../src/index";

describe("Core", async () => {

    describe("MnemonicUtils class", async () => {

        describe("getWordsFromMnemonic()", async () => {

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

        describe("generateMnemonic()", async () => {

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

        describe("mnemonicToSeed()", async () => {

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
});
