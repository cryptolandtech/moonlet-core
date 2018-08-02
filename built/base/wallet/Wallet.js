"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/index.js
const utils_1 = require("../utils");
class Wallet {
    constructor(priv, pub) {
        this.loose = false;
        if (priv && pub) {
            throw new Error("Cannot supply both a private and a public key to the constructor");
        }
        if (priv && !utils_1.default.isValidPrivate(priv.toString("hex"))) {
            throw new Error("Private key does not satisfy the curve requirements (ie. it is invalid):");
        }
        if (pub && !utils_1.default.isValidPublic(pub.toString("hex"))) {
            throw new Error("Invalid public key");
        }
        this.privKey = priv;
        this.pubKey = pub;
    }
    static fromPublicKey(key) {
        return new Wallet("", key);
    }
    static fromPrivateKey(key) {
        return new Wallet(key, "");
    }
    getPrivateKey() {
        return this.privKey;
    }
    getPublicKey() {
        if (this.pubKey === "") {
            this.pubKey = utils_1.default.getPublicKeyfromPrivateKey(this.privKey);
        }
        return this.pubKey;
    }
    getAddress() {
        return utils_1.default.getAddressFromPublicKey(this.getPublicKey());
    }
}
exports.default = Wallet;
//# sourceMappingURL=Wallet.js.map