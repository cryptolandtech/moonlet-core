"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { secp256k1, randomBytes, pbkdf2Sync, sha3, sha256 } = require("bcrypto");
const isWebUri = require("valid-url").isWebUri;
class Utils {
    // TODO: implement
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
        if (typeof (privateKey) === "string") {
            privateKey = new Buffer(privateKey, "hex");
        }
        const pubKey = secp256k1.publicKeyCreate(privateKey, true);
        return pubKey.toString("hex");
    }
    static getAddressFromPrivateKey(privateKey) {
        if (typeof (privateKey) === "string") {
            privateKey = new Buffer(privateKey, "hex");
        }
        const pubKey = secp256k1.publicKeyCreate(privateKey, true);
        const pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        const address = pubKeyHash.toString("hex", 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }
    static getAddressFromPublicKey(pubKey) {
        if (typeof (pubKey) === "string") {
            pubKey = new Buffer(pubKey, "hex");
        }
        const pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        const address = pubKeyHash.toString("hex", 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }
    static validateArgs(args, requiredArgs, optionalArgs) {
        for (const key of Object.keys(requiredArgs)) {
            // for (const key in requiredArgs) {
            if (args[key] === undefined) {
                throw new Error("Key not found: " + key);
            }
            for (let i = 0; i < requiredArgs[key].length; i++) {
                if (typeof (requiredArgs[key][i]) !== "function") {
                    throw new Error("Validator is not a function");
                }
                if (!requiredArgs[key][i](args[key])) {
                    throw new Error("Validation failed for " + key);
                }
            }
        }
        for (const key in optionalArgs) {
            if (args[key]) {
                for (let i = 0; i < optionalArgs[key].length; i++) {
                    if (typeof (optionalArgs[key][i]) !== "function") {
                        throw new Error("Validator is not a function");
                    }
                    if (!optionalArgs[key][i](args[key])) {
                        throw new Error("Validation failed for " + key);
                    }
                }
            }
        }
        return true;
    }
    static isUrl(url) {
        return isWebUri(url);
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map