import { assert } from "chai";
import mocha from "mocha";
import { Buffer } from "safe-buffer";
import HDWrapper from "../src/base/wallet/HDWrapper";

// from BIP39 mnemonic: awake book subject inch gentle blur grant damage process float month clown
const fixtureseed = Buffer.from('747f302d9c916698912d5f70be53a6cf53bc495803a5523d3a7c3afa2afba94ec3803f838b3e1929ab5481f9da35441372283690fdcf27372c38f40ba134fe03', 'hex');
const fixturehd = HDWrapper.fromMasterSeed(fixtureseed);

describe('HDWrapper: ETH', () => {

    describe('.fromMasterSeed()', () => {
        it('should work', () => {
            assert.doesNotThrow( () => {
                HDWrapper.fromMasterSeed(fixtureseed);
            });
        });
    });

    describe('.privateExtendedKey()', () => {
        it('should work', () => {
            assert.equal(fixturehd.privateExtendedKey(), 'xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY');
        });
    });

    describe('.publicExtendedKey()', () => {
        it('should work', () => {
            assert.equal(fixturehd.publicExtendedKey(), 'xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ');
        });
    });

    describe('.fromExtendedKey()', () => {
        it('should work with public', () => {
            const hdnode = HDWrapper.fromExtendedKey('xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ');
            assert.equal(hdnode.publicExtendedKey(), 'xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ');
            assert.throws(() => {
                hdnode.privateExtendedKey();
            }, /^Error: This is a public key only wallet$/);
        });
        it('should work with private', () => {
            const hdnode = HDWrapper.fromExtendedKey('xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY');
            assert.equal(hdnode.publicExtendedKey(), 'xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ');
            assert.equal(hdnode.privateExtendedKey(), 'xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY');
        });
    });

    describe('.deriveChild()', () => {
        it('should work', () => {
            const hdnode = fixturehd.deriveChild(1);
            assert.equal(hdnode.privateExtendedKey(), 'xprv9vYSvrg3eR5FaKbQE4Ao2vHdyvfFL27aWMyH6X818mKWMsqqQZAN6HmRqYDGDPLArzaqbLExRsxFwtx2B2X2QKkC9uoKsiBNi22tLPKZHNS');
        });
    });

    describe('.derivePath()', () => {
        it('should work with m', () => {
            const hdnode = fixturehd.derivePath('m');
            assert.equal(hdnode.privateExtendedKey(), 'xprv9s21ZrQH143K4KqQx9Zrf1eN8EaPQVFxM2Ast8mdHn7GKiDWzNEyNdduJhWXToy8MpkGcKjxeFWd8oBSvsz4PCYamxR7TX49pSpp3bmHVAY');
        });
        it('should work with m/44\'/0\'/0/1', () => {
            const hdnode = fixturehd.derivePath('m/44\'/0\'/0/1');
            assert.equal(hdnode.privateExtendedKey(), 'xprvA1ErCzsuXhpB8iDTsbmgpkA2P8ggu97hMZbAXTZCdGYeaUrDhyR8fEw47BNEgLExsWCVzFYuGyeDZJLiFJ9kwBzGojQ6NB718tjVJrVBSrG');
        });
    });

    describe('.getWallet()', () => {
        it('should work', () => {
            assert.equal(fixturehd.getWallet().getPrivateKeyString(), '0x26cc9417b89cd77c4acdbe2e3cd286070a015d8e380f9cd1244ae103b7d89d81');
            assert.equal(fixturehd.getWallet().getPublicKeyString(),  '0x0639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973defa5cb69df462bcc6d73c31e1c663c225650e80ef14a507b203f2a12aea55bc1');
        });
        it('should work with public nodes', () => {
            const hdnode = HDWrapper.fromExtendedKey('xpub661MyMwAqRbcGout4B6s29b6gGQsowyoiF6UgXBEr7eFCWYfXuZDvRxP9zEh1Kwq3TLqDQMbkbaRpSnoC28oWvjLeshoQz1StZ9YHM1EpcJ');
            assert.throws(() => {
                hdnode.getWallet().getPrivateKeyString();
            }, /^Error: This is a public key only wallet$/);
            assert.equal(hdnode.getWallet().getPublicKeyString(), '0x0639797f6cc72aea0f3d309730844a9e67d9f1866e55845c5f7e0ab48402973defa5cb69df462bcc6d73c31e1c663c225650e80ef14a507b203f2a12aea55bc1');
        });
    });

});
