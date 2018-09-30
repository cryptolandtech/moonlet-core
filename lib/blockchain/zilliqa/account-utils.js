"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_utils_1 = require("../../core/account-utils");
const zilliqa_js_1 = require("zilliqa-js");
class ZilliqaAccountUtils extends account_utils_1.GenericAccountUtils {
    isValidChecksumAddress(address) {
        this.requireType(address, "string", "isValidChecksumAddress");
        return zilliqa_js_1.util.isValidChecksumAddress(address);
    }
    toChecksumAddress(address) {
        this.requireType(address, "string", "toChecksumAddress");
        return zilliqa_js_1.util.toChecksumAddress(address);
    }
    isValidAddress(key) {
        this.requireType(key, "Buffer", "isValidAddress");
        return zilliqa_js_1.util.isAddress(key.toString("hex"));
    }
    isValidPrivate(key) {
        this.requireType(key, "Buffer", "isValidPrivate");
        return zilliqa_js_1.util.isPrivateKey(key.toString("hex"));
    }
    isValidPublic(key) {
        this.requireType(key, "Buffer", "isValidPublic");
        return zilliqa_js_1.util.isPubKey(key.toString("hex"));
    }
    publicToAddress(key) {
        this.requireType(key, "Buffer", "publicToAddress");
        if (key.length === 32 || key.length === 33) {
            return Buffer.from(
            // official receives string.
            zilliqa_js_1.util.getAddressFromPublicKey(key.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    privateToPublic(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            zilliqa_js_1.util.getPubKeyFromPrivateKey(privateKey.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    privateToAddress(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            zilliqa_js_1.util.getAddressFromPrivateKey(privateKey.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    addressBufferToChecksum(key) {
        this.requireType(key, "Buffer", "addressBufferToChecksum");
        if (key.length === 20 || key.length === 22) {
            return this.toChecksumAddress(key.toString("hex"));
        }
        throw new Error("address buffer length is invalid");
    }
    bufferToHex(buf) {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }
}
exports.ZilliqaAccountUtils = ZilliqaAccountUtils;
//# sourceMappingURL=account-utils.js.map