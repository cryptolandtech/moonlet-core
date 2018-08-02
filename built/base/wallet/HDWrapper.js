"use strict";
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js
Object.defineProperty(exports, "__esModule", { value: true });
const reqhdkey = require("hdkey");
const Wallet_1 = require("./Wallet");
class HDWrapper {
    static fromHDKey(hdkeyP) {
        const ret = new HDWrapper();
        ret.internalHdKey = hdkeyP;
        return ret;
    }
    static fromMasterSeed(seedBuffer) {
        return HDWrapper.fromHDKey(reqhdkey.fromMasterSeed(seedBuffer));
    }
    fromExtendedKey(base58key) {
        return HDWrapper.fromHDKey(reqhdkey.fromExtendedKey(base58key));
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
            return Wallet_1.default.fromPrivateKey(this.internalHdKey._privateKey);
        }
        else {
            return Wallet_1.default.fromPublicKey(this.internalHdKey._publicKey);
        }
    }
}
exports.default = HDWrapper;
//# sourceMappingURL=HDWrapper.js.map