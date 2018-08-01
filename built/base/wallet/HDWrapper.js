"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hdkey = require('hdkey');
const wallet_1 = require("./wallet");
class HDWrapper {
    static fromHDKey(hdkey) {
        var ret = new HDWrapper();
        ret._hdkey = hdkey;
        return ret;
    }
    static fromMasterSeed(seedBuffer) {
        return HDWrapper.fromHDKey(hdkey.fromMasterSeed(seedBuffer));
    }
    fromExtendedKey(base58key) {
        return HDWrapper.fromHDKey(hdkey.fromExtendedKey(base58key));
    }
    privateExtendedKey() {
        if (!this._hdkey.privateExtendedKey) {
            throw new Error('This is a public key only wallet');
        }
        return this._hdkey.privateExtendedKey;
    }
    publicExtendedKey() {
        return this._hdkey.publicExtendedKey;
    }
    derivePath(path) {
        return HDWrapper.fromHDKey(this._hdkey.derive(path));
    }
    deriveChild(index) {
        return HDWrapper.fromHDKey(this._hdkey.deriveChild(index));
    }
    getWallet() {
        if (this._hdkey._privateKey) {
            return wallet_1.default.fromPrivateKey(this._hdkey._privateKey);
        }
        else {
            return wallet_1.default.fromPublicKey(this._hdkey._publicKey);
        }
    }
}
exports.default = HDWrapper;
//# sourceMappingURL=HDWrapper.js.map