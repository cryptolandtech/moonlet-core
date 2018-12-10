"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_utils_1 = require("../../core/account-utils");
const EthereumUtil = require('ethereumjs-util');
class EthereumAccountUtils extends account_utils_1.GenericAccountUtils {
    isValidChecksumAddress(key) {
        this.requireType(key, "string", "isValidChecksumAddress");
        return EthereumUtil.isValidChecksumAddress(key);
    }
    toChecksumAddress(key) {
        this.requireType(key, "string", "toChecksumAddress");
        return EthereumUtil.toChecksumAddress(key);
    }
    isValidAddress(key) {
        this.requireType(key, "Buffer", "isValidAddress");
        return EthereumUtil.isValidAddress(key);
    }
    isValidPrivate(key) {
        this.requireType(key, "Buffer", "isValidPrivate");
        let privateKey = key.toString();
        if (privateKey.length === 66) {
            privateKey = privateKey.replace("0x", "");
        }
        return !!privateKey.match(/^[0-9a-fA-F]{64}$/);
    }
    isValidPublic(key) {
        this.requireType(key, "Buffer", "isValidPublic");
        return EthereumUtil.isValidPublic(key);
    }
    publicToAddress(key) {
        this.requireType(key, "Buffer", "publicToAddress");
        return EthereumUtil.pubToAddress(key);
    }
    privateToPublic(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        return EthereumUtil.privateToPublic(privateKey);
    }
    privateToAddress(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        return EthereumUtil.privateToAddress(privateKey);
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
        this.requireType(input, "BigNumber", "balanceToStd");
        return input.div(Math.pow(10, 18)).toString();
    }
}
exports.EthereumAccountUtils = EthereumAccountUtils;
//# sourceMappingURL=account-utils.js.map