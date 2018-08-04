"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Wrapper over zilliqa.js/lib/util, used to provide a standardized interface for HDWallets
*/
const ZilliqaUtil = require('zilliqa.js/lib/util');
class Utils {
    static normalize(str) {
        return str.toUpperCase();
    }
    static isValidAddress(key) {
        return ZilliqaUtil.isAddress(key.toString("hex"));
    }
    static isValidPrivate(key) {
        return ZilliqaUtil.isPrivateKey(key.toString("hex"));
    }
    static isValidPublic(key) {
        return ZilliqaUtil.isPubkey(key.toString("hex"));
    }
    static publicToAddress(key) {
        return new Buffer(ZilliqaUtil.getAddressFromPublicKey(key), "hex");
    }
    static privateToPublic(privateKey) {
        return ZilliqaUtil.getPubKeyFromPrivateKey(privateKey);
    }
    static privateToAddress(privateKey) {
        return ZilliqaUtil.getAddressFromPrivateKey(privateKey);
    }
}
Utils.bufferToHex = (buf) => {
    return Utils.normalize(buf.toString('hex'));
};
exports.default = Utils;
//# sourceMappingURL=utils.js.map