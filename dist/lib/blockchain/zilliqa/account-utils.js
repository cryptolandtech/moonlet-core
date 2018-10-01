"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_utils_1 = require("../../core/account-utils");
const bignumber_js_1 = require("bignumber.js");
// import { util as ZilliqaUtil } from 'zilliqa-js';
const ZilliqaUtil = require('zilliqa-js').util;
// const ZilliqaUtil = require('zilliqa.js');
// const ZilliqaUtil = Zilliqa.utilszz;
class ZilliqaAccountUtils extends account_utils_1.GenericAccountUtils {
    isValidChecksumAddress(address) {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ZilliqaUtil.isValidChecksumAddress(address);
    }
    toChecksumAddress(address) {
        this.requireType(address, "string", "toChecksumAddress");
        return ZilliqaUtil.toChecksumAddress(address);
    }
    isValidAddress(key) {
        this.requireType(key, "Buffer", "isValidAddress");
        return ZilliqaUtil.isAddress(key.toString("hex"));
    }
    isValidPrivate(key) {
        this.requireType(key, "Buffer", "isValidPrivate");
        return ZilliqaUtil.isPrivateKey(key.toString("hex"));
    }
    isValidPublic(key) {
        this.requireType(key, "Buffer", "isValidPublic");
        return ZilliqaUtil.isPubKey(key.toString("hex"));
    }
    publicToAddress(key) {
        this.requireType(key, "Buffer", "publicToAddress");
        if (key.length === 32 || key.length === 33) {
            return Buffer.from(
            // official receives string.
            ZilliqaUtil.getAddressFromPublicKey(key.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    privateToPublic(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            ZilliqaUtil.getPubKeyFromPrivateKey(privateKey.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    privateToAddress(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            ZilliqaUtil.getAddressFromPrivateKey(privateKey.toString("hex")), "hex");
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
    balanceToStd(input) {
        if (typeof input === "number" || typeof input === "string") {
            return new bignumber_js_1.BigNumber(input).div(Math.pow(10, 2)).toString();
        }
        return input.div(Math.pow(10, 2)).toString();
    }
}
exports.ZilliqaAccountUtils = ZilliqaAccountUtils;
//# sourceMappingURL=account-utils.js.map