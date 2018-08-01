"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Wallet {
    constructor(priv, pub) {
        if (priv && pub) {
            throw new Error('Cannot supply both a private and a public key to the constructor');
        }
        if (priv && !utils_1.default.isValidPrivate(priv.toString('hex'))) {
            throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid):');
        }
        if (pub && !utils_1.default.isValidPublic(pub.toString('hex'))) {
            throw new Error('Invalid public key');
        }
        this.privKey = priv;
        this.pubKey = pub;
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
    static fromPublicKey(key) {
        return new Wallet("", key);
    }
    static fromPrivateKey(key) {
        return new Wallet(key, "");
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map