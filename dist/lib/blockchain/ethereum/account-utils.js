"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_utils_1 = require("../../core/account-utils");
const EthereumUtil = require('ethereumjs-util');
class EthereumAccountUtils extends account_utils_1.GenericAccountUtils {
    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    isValidChecksumAddress(key) {
        this.requireType(key, "string", "isValidChecksumAddress");
        return EthereumUtil.isValidChecksumAddress(key);
    }
    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    toChecksumAddress(key) {
        this.requireType(key, "string", "toChecksumAddress");
        return EthereumUtil.toChecksumAddress(key);
    }
    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    isValidAddress(key) {
        this.requireType(key, "Buffer", "isValidAddress");
        return EthereumUtil.isValidAddress(key);
    }
    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    isValidPrivate(key) {
        this.requireType(key, "Buffer", "isValidPrivate");
        let privateKey = key.toString();
        if (privateKey.length === 66) {
            privateKey = privateKey.replace("0x", "");
        }
        return !!privateKey.match(/^[0-9a-fA-F]{64}$/);
    }
    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    isValidPublic(key) {
        this.requireType(key, "Buffer", "isValidPublic");
        return EthereumUtil.isValidPublic(key);
    }
    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    publicToAddress(key) {
        this.requireType(key, "Buffer", "publicToAddress");
        return EthereumUtil.pubToAddress(key);
    }
    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    privateToPublic(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        return EthereumUtil.privateToPublic(privateKey);
    }
    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    privateToAddress(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        return EthereumUtil.privateToAddress(privateKey);
    }
    /**
     * Converts an address buffer to a checksummed address string
     * @param key
     * @returns checksumed address
     */
    addressBufferToChecksum(key) {
        this.requireType(key, "Buffer", "addressBufferToChecksum");
        if (key.length === 20 || key.length === 22) {
            return this.toChecksumAddress(key.toString("hex"));
        }
        throw new Error("address buffer length is invalid");
    }
    /**
     * Converts a buffer to a hex string
     * @param buf
     * @returns string
     */
    bufferToHex(buf) {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }
    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    balanceToStd(input) {
        this.requireType(input, "BigNumber", "balanceToStd");
        return input.div(Math.pow(10, 18)).toString();
    }
}
exports.EthereumAccountUtils = EthereumAccountUtils;
//# sourceMappingURL=account-utils.js.map