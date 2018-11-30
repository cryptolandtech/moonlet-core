import { assert } from "chai";
import mocha from "mocha";
import HDKey from "../../src/core/utils/hdkey";
import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../../src/index";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";
const lang = "EN";
const seed = MnemonicUtils.mnemonicToSeed( mnemonic, lang );
const ethereumwallet0PrivateKey = "e49c840fcb71fafcaa068c7d45a6b99f8d5b6064effe7d793b6490641e75cca8";

describe("Core", async () => {

    describe("HDKey class", async () => {

        describe("getPrivateKey()", async () => {

            it("should properly return a Buffer containing the first private key derrivated from the provided seed", async () => {
                const hdkey = HDKey.fromMasterSeed(seed);
                const HDRootKey = hdkey.derivePath(`m/44'/60'/0'/0`);
                const AccountHDKey = HDRootKey.deriveChild( 0 );
                const PrivateKey = AccountHDKey.getPrivateKey();
                assert.equal( PrivateKey.toString("hex"), ethereumwallet0PrivateKey, "Did not return the expected private key");
            });

        });

        describe("getPrivateKeyString()", async () => {

            it("should properly return a string containing the first private key derrivated from the provided seed", async () => {
                const hdkey = HDKey.fromMasterSeed(seed);
                const HDRootKey = hdkey.derivePath(`m/44'/60'/0'/0`);
                const AccountHDKey = HDRootKey.deriveChild( 0 );
                const PrivateKey = AccountHDKey.getPrivateKeyString();
                assert.equal( PrivateKey, ethereumwallet0PrivateKey, "Did not return the expected private key");
            });

        });
    });
});
