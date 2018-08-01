"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { secp256k1, randomBytes, pbkdf2Sync, sha3, sha256 } = require("bcrypto");
class Utils {
    static normalize(str) {
        return str;
    }
    static isValidAddress(key) {
        return RegExp(/^[0-9a-fA-F]{40}$/).test(key);
    }
    static isValidPrivate(key) {
        return RegExp(/^[0-9a-fA-F]{64}$/).test(key);
    }
    static isValidPublic(key) {
        return RegExp(/^[0-9a-fA-F]{66}$/).test(key);
    }
    static publicToAddress(key) {
        return key;
    }
    static getPublicKeyfromPrivateKey(privateKey) {
        if (typeof (privateKey) == 'string')
            privateKey = new Buffer(privateKey, 'hex');
        let pubKey = secp256k1.publicKeyCreate(privateKey, true);
        return pubKey.toString('hex');
    }
    static getAddressFromPrivateKey(privateKey) {
        if (typeof (privateKey) == 'string')
            privateKey = new Buffer(privateKey, 'hex');
        let pubKey = secp256k1.publicKeyCreate(privateKey, true);
        let pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        let address = pubKeyHash.toString('hex', 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }
    static getAddressFromPublicKey(pubKey) {
        if (typeof (pubKey) == 'string')
            pubKey = new Buffer(pubKey, 'hex');
        let pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        let address = pubKeyHash.toString('hex', 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map