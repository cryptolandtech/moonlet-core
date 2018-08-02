"use strict";
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js
Object.defineProperty(exports, "__esModule", { value: true });
const hdkey = require("hdkey");
const wallet_1 = require("./wallet");
class HDWrapper {
    static fromHDKey(hdkeyP) {
        const ret = new HDWrapper();
        ret.internalHdKey = hdkeyP;
        return ret;
    }
    static fromMasterSeed(seedBuffer) {
        return HDWrapper.fromHDKey(hdkey.fromMasterSeed(seedBuffer));
    }
    fromExtendedKey(base58key) {
        return HDWrapper.fromHDKey(hdkey.fromExtendedKey(base58key));
    }
    privateExtendedKey() {
        if (!this.internalHdKey.privateExtendedKey) {
            throw new Error("This is a public key only wallet");
        }
        return this.internalHdKey.privateExtendedKey;
    }
    publicExtendedKey() {
        return this.internalHdKey.publicExtendedKey;
    }
    derivePath(path) {
        return HDWrapper.fromHDKey(this.internalHdKey.derive(path));
    }
    deriveChild(index) {
        return HDWrapper.fromHDKey(this.internalHdKey.deriveChild(index));
    }
    getWallet() {
        if (this.internalHdKey._privateKey) {
            return wallet_1.default.fromPrivateKey(this.internalHdKey._privateKey);
        }
        else {
            return wallet_1.default.fromPublicKey(this.internalHdKey._publicKey);
        }
    }
}
exports.default = HDWrapper;
//# sourceMappingURL=HDWrapper.js.map