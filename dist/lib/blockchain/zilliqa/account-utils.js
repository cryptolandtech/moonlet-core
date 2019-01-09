"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_utils_1 = require("../../core/account-utils");
const util_1 = require("@zilliqa-js/util");
const ZilliqaJsCrypto = __importStar(require("@zilliqa-js/crypto"));
class ZilliqaAccountUtils extends account_utils_1.GenericAccountUtils {
    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    isValidChecksumAddress(address) {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ZilliqaJsCrypto.isValidChecksumAddress(address);
    }
    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    toChecksumAddress(address) {
        this.requireType(address, "string", "toChecksumAddress");
        return ZilliqaJsCrypto.toChecksumAddress(address);
    }
    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    isValidAddress(key) {
        this.requireType(key, "Buffer", "isValidAddress");
        return util_1.validation.isAddress(key.toString("hex"));
    }
    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    isValidPrivate(key) {
        this.requireType(key, "Buffer", "isValidPrivate");
        return util_1.validation.isPrivateKey(key.toString("hex"));
    }
    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    isValidPublic(key) {
        this.requireType(key, "Buffer", "isValidPublic");
        return util_1.validation.isPubKey(key.toString("hex"));
    }
    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    publicToAddress(key) {
        this.requireType(key, "Buffer", "publicToAddress");
        if (key.length === 32 || key.length === 33) {
            return Buffer.from(
            // official receives string.
            ZilliqaJsCrypto.getAddressFromPublicKey(key.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    privateToPublic(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            ZilliqaJsCrypto.getPubKeyFromPrivateKey(privateKey.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
    }
    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    privateToAddress(privateKey) {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        if (privateKey.length === 32) {
            return Buffer.from(
            // official receives string.
            ZilliqaJsCrypto.getAddressFromPrivateKey(privateKey.toString("hex")), "hex");
        }
        throw new Error("private key length is invalid");
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
        return input.div(Math.pow(10, 12)).toString();
    }
}
exports.ZilliqaAccountUtils = ZilliqaAccountUtils;
//# sourceMappingURL=account-utils.js.map