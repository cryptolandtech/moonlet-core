import { assert } from "chai";
import mocha from "mocha";

import { util as OfficialUtil } from 'zilliqa-js';
import { ZilliqaAccountUtils as AccountUtils } from "../../src/blockchain/zilliqa/account-utils";
import BigNumber from "bignumber.js";

describe("Zilliqa", async () => {

    describe("Zilliqa Account Utils", async () => {

        const instance = new AccountUtils();

        const Wallet0Address = "0x7bB3b0E8A59f3f61d9BFf038f4AEB42Cae2eccE8";
        const Wallet0PrivateKey = "0xdb11cfa086b92497c8ed5a4cc6edb3a5bfe3a640c43ffb9fc6aa0873c56f2ee3";
        const Wallet0PublicKey = "0x03d8e6450e260f80983bcd4fadb6cbc132ae7feb552dda45f94b48c80b86c6c3be";

        describe("requireType( target, type, method ): boolean", async () => {

            it("should throw if supplied parameter does not match requested type ( string, Buffer )", async () => {
                assert.throws(() => {
                    instance.requireType("test", "Buffer", "test");
                }, /test: parameter must be a Buffer()./);
            });

            it("should throw if supplied parameter does not match requested type ( number, Buffer )", async () => {
                assert.throws(() => {
                    instance.requireType(1, "Buffer", "test");
                }, /test: parameter must be a Buffer()./);
            });

            it("should throw if supplied parameter does not match requested type ( boolean, Buffer )", async () => {
                assert.throws(() => {
                    instance.requireType(false, "Buffer", "test");
                }, /test: parameter must be a Buffer()./);
            });

            it("should throw if supplied parameter does not match requested type ( undefined, Buffer )", async () => {
                assert.throws(() => {
                    instance.requireType(undefined, "Buffer", "test");
                }, /test: parameter must be a Buffer()./);
            });

            it("should return true if supplied parameter matches requested type ( string, string )", async () => {
                const test = instance.requireType("test", "string", "test");
                assert.isTrue( test, "Test failed.");
            });

            it("should return true if supplied parameter matches requested type ( Buffer, Buffer )", async () => {
                const test = instance.requireType( Buffer.from(""), "Buffer", "test");
                assert.isTrue( test, "Test failed.");
            });

            it("should return true if supplied parameter matches requested type ( true, boolean )", async () => {
                const test = instance.requireType(true, "boolean", "test");
                assert.isTrue( test, "Test failed.");
            });

            it("should return true if supplied parameter matches requested type ( 5, number )", async () => {
                const test = instance.requireType(5, "number", "test");
                assert.isTrue( test, "Test failed.");
            });
        });

        describe("bufferToHex( Buffer ): string", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.bufferToHex("test");
                }, /bufferToHex: parameter must be a Buffer()./);
            });

            it("should return a string prepended with 0x", async () => {
                const testValue: string = "010203";
                const result = instance.bufferToHex( Buffer.from( testValue , "hex" ) );
                assert.equal( "0x" + testValue, result, "Result does not match" );
            });

        });

        describe("privateToPublic( Buffer ): Buffer", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.privateToPublic("test");
                }, /privateToPublic: parameter must be a Buffer()./);
            });

            it("should throw if supplied Buffer length is shorter than 32 bytes", async () => {
                assert.throws(() => {
                    instance.privateToPublic( Buffer.from("0102030405", "hex") );
                }, /private key length is invalid/);
            });

            it("should return a valid 33 byte Buffer containing a public key", async () => {
                const key: Buffer = instance.privateToPublic( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                assert.isTrue( Buffer.isBuffer( key ) , "returned buffer is not a valid Buffer instance");
                assert.equal(key.length, 33, "returned buffer length invalid");
            });

            it("should return public key that matches in test constant ", async () => {
                const key = instance.privateToPublic( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                assert.equal( instance.bufferToHex( key ) , Wallet0PublicKey, "keys do not match");
            });

            it("should match the return of zilliqa-js.util getPubKeyFromPrivateKey()", async () => {
                const mine = instance.privateToPublic( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.getPubKeyFromPrivateKey( Wallet0PrivateKey.replace("0x", "") ) ;
                assert.equal( mine.toString("hex") , theirs, "keys do not match");
            });

        });

        describe("privateToAddress( Buffer ): Buffer", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.privateToAddress("test");
                }, /privateToAddress: parameter must be a Buffer()./);
            });

            it("should throw if supplied Buffer length is shorter than 32 bytes", async () => {
                assert.throws(() => {
                    instance.privateToAddress( Buffer.from("0102030405", "hex") );
                }, /private key length is invalid/);
            });

            it("should return a valid 20 byte Buffer containing an address", async () => {
                const key: Buffer = instance.privateToAddress( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                assert.isTrue( Buffer.isBuffer( key ) , "returned buffer is not a valid Buffer instance");
                assert.equal(key.length, 20, "returned buffer length invalid");
            });

            it("should return address that matches in test constant ", async () => {
                const key = instance.privateToAddress( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                const checksummed = instance.addressBufferToChecksum(key);
                assert.equal( checksummed , Wallet0Address, "keys do not match");
            });

            it("should match the return of zilliqa-js.util getAddressFromPrivateKey()", async () => {
                const mine = instance.privateToAddress( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.getAddressFromPrivateKey( Wallet0PrivateKey.replace("0x", "") );
                assert.equal( mine.toString("hex") , theirs, "results do not match");
            });

        });

        describe("addressBufferToChecksum( Buffer ): string", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.addressBufferToChecksum("test");
                }, /addressBufferToChecksum: parameter must be a Buffer()./);
            });

            it("should throw if supplied Buffer length is not 20 or 22 bytes", async () => {
                assert.throws(() => {
                    instance.addressBufferToChecksum( Buffer.from("0102030405", "hex") );
                }, /address buffer length is invalid/);
            });

            it("should return a valid 42 length string containing a public key", async () => {
                const result: string = instance.addressBufferToChecksum( Buffer.from(Wallet0Address.replace("0x", ""), "hex") );
                assert.equal(result.length, 42, "returned string length is invalid");
            });

            it("should return public key that matches in test constant ", async () => {
                const result: string = instance.addressBufferToChecksum( Buffer.from(Wallet0Address.replace("0x", ""), "hex") );
                assert.equal( result , Wallet0Address, "results do not match");
            });

        });

        describe("publicToAddress( Buffer ): Buffer", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.publicToAddress("test");
                }, /publicToAddress: parameter must be a Buffer()./);
            });

            it("should throw if supplied Buffer length is not 32 or 33 bytes", async () => {
                assert.throws(() => {
                    instance.publicToAddress( Buffer.from("0102030405", "hex") );
                }, /private key length is invalid/);
            });

            it("should return a valid 20 byte Buffer containing a public key", async () => {
                const key: Buffer = instance.publicToAddress( Buffer.from(Wallet0PublicKey.replace("0x", ""), "hex") );
                assert.isTrue( Buffer.isBuffer( key ) , "returned buffer is not a valid Buffer instance");
                assert.equal(key.length, 20, "returned buffer length invalid");
            });

            it("should return public key that matches in test constant ", async () => {
                const key = instance.publicToAddress( Buffer.from(Wallet0PublicKey.replace("0x", ""), "hex") );
                const checksummed = instance.addressBufferToChecksum(key);
                assert.equal( checksummed , Wallet0Address, "keys do not match");
            });

            it("should match the return of zilliqa-js.util getAddressFromPublicKey()", async () => {
                const mine = instance.publicToAddress( Buffer.from(Wallet0PublicKey.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.getAddressFromPublicKey( Wallet0PublicKey.replace("0x", "") );
                assert.equal( mine.toString("hex") , theirs, "results do not match");
            });
        });

        describe("isValidChecksumAddress( string ): boolean", async () => {

            it("should throw if supplied parameter is not of type string", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.isValidChecksumAddress( 0x10203 );
                }, /isValidChecksumAddress: parameter must be of type string./);
            });

            it("should return false if supplied string does not contain a valid checksummed address", async () => {
                assert.isFalse( instance.isValidChecksumAddress( Wallet0Address.toLowerCase() ), "Should return false for an invalid address string" );
            });

            it("should return true if supplied string contains a valid address", async () => {
                assert.isTrue( instance.isValidChecksumAddress( "0x7bB3b0E8A59f3f61d9BFf038f4AEB42Cae2eccE8" ), "Should return true for a valid address string" );
            });

            it("should match the return of zilliqa-js.util isValidChecksumAddress()", async () => {
                const mine = instance.isValidChecksumAddress( Wallet0Address );
                const theirs = OfficialUtil.isValidChecksumAddress( Wallet0Address );
                assert.equal( mine, theirs, "results do not match");
            });

        });

        describe("isValidAddress( Buffer ): boolean", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.isValidAddress("test");
                }, /isValidAddress: parameter must be a Buffer()./);
            });

            it("should return false if supplied Buffer does not contain a valid address", async () => {
                assert.isFalse( instance.isValidAddress( Buffer.from("0102030405") ), "Should return false for an invalid address buffer" );
            });

            it("should return true if supplied Buffer contains a valid address", async () => {
                assert.isTrue( instance.isValidAddress( Buffer.from(Wallet0Address.replace("0x", ""), "hex") ), "Should return true for a valid address buffer" );
            });

            it("should match the return of zilliqa-js.util isAddress() -> true", async () => {
                const mine = instance.isValidAddress( Buffer.from(Wallet0Address.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.isAddress( Wallet0Address.replace("0x", "") );

                assert.isTrue( theirs, "Should return true for a valid address buffer" );
                assert.equal( mine, theirs, "results do not match");
            });
        });

        describe("isValidPrivate( Buffer ): boolean", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.isValidPrivate("test");
                }, /isValidPrivate: parameter must be a Buffer()./);
            });

            it("should return false if supplied Buffer does not contain a valid private key", async () => {
                assert.isFalse( instance.isValidPrivate( Buffer.from("0102030405") ), "Should return false for an invalid private key buffer" );
            });

            it("should return true if supplied Buffer contains a valid private key", async () => {
                assert.isTrue( instance.isValidPrivate( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") ), "Should return true for a valid private key buffer" );
            });

            it("should match the return of zilliqa-js.util verifyPrivateKey()", async () => {
                const mine = instance.isValidPrivate( Buffer.from(Wallet0PrivateKey.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.verifyPrivateKey( Wallet0PrivateKey );
                assert.equal( mine, theirs, "results do not match");
            });

        });

        describe("isValidPublic( Buffer ): boolean", async () => {

            it("should throw if supplied parameter is not of type Buffer", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.isValidPublic("test");
                }, /isValidPublic: parameter must be a Buffer()./);
            });

            it("should return false if supplied Buffer does not contain a valid public key", async () => {
                assert.isFalse( instance.isValidPublic( Buffer.from("0102030405") ), "Should return false for an invalid public key buffer" );
            });

            it("should return true if supplied Buffer contains a valid public key", async () => {
                assert.isTrue( instance.isValidPublic( Buffer.from(Wallet0PublicKey.replace("0x", ""), "hex") ), "Should return true for a valid public key buffer" );
            });

            it("should match the return of zilliqa-js.util isPubKey()", async () => {
                const mine = instance.isValidPublic( Buffer.from(Wallet0PublicKey.replace("0x", ""), "hex") );
                const theirs = OfficialUtil.isPubKey( Wallet0PublicKey.replace("0x", "") );
                assert.equal( mine, theirs, "results do not match");
            });
        });

        describe("balanceToStd( input: BigNumber ): string", async () => {

            it("should throw if supplied parameter is not of type BigNumber", async () => {
                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    instance.balanceToStd("test");
                }, 'balanceToStd: parameter must be of type BigNumber.');
            });

            it("should return 1 if input is 1 * 10 ** 2", async () => {
                const result = instance.balanceToStd( new BigNumber( 1 * 10 ** 2 ) );
                assert.equal( result, "1", "Should return 1" );
            });

            it("should return 0.01 if input is 1 ", async () => {
                const result = instance.balanceToStd( new BigNumber( 1 ) );
                assert.equal( result, "0.01", "Should return 0.01" );
            });
        });

    });

});
