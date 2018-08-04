"use strict";
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js
Object.defineProperty(exports, "__esModule", { value: true });
const reqhdkey = require("hdkey");
const Wallet_1 = require("./Wallet");
class HDWrapper {
    constructor() {
        this.type = "ETH";
    }
    static fromHDKey(hdkeyP, type) {
        const ret = new HDWrapper();
        if (type) {
            ret.type = type;
        }
        ret.internalHdKey = hdkeyP;
        return ret;
    }
    static fromMasterSeed(seedBuffer, type) {
        return HDWrapper.fromHDKey(reqhdkey.fromMasterSeed(seedBuffer), type);
    }
    static fromExtendedKey(base58key, type) {
        return HDWrapper.fromHDKey(reqhdkey.fromExtendedKey(base58key), type);
    }
    privateExtendedKey() {
        if (!this.internalHdKey.privateExtendedKey) {
            throw new Error("Error: This is a public key only wallet");
        }
        return this.internalHdKey.privateExtendedKey;
    }
    publicExtendedKey() {
        return this.internalHdKey.publicExtendedKey;
    }
    derivePath(path) {
        return HDWrapper.fromHDKey(this.internalHdKey.derive(path), this.type);
    }
    deriveChild(index) {
        return HDWrapper.fromHDKey(this.internalHdKey.deriveChild(index), this.type);
    }
    getWallet() {
        if (this.internalHdKey._privateKey) {
            return Wallet_1.default.fromPrivateKey(this.internalHdKey._privateKey, this.type);
        }
        else {
            return Wallet_1.default.fromPublicKey(this.internalHdKey._publicKey, true, this.type);
        }
    }
}
exports.default = HDWrapper;
//# sourceMappingURL=HDWrapper.js.map