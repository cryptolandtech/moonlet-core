"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
class GenericAccountUtils {
    /**
     * Parameter type validation
     * @param target
     * @param expected
     * @param method
     * @returns true if type matches
     */
    requireType(target, expected, method) {
        if (expected === "Buffer") {
            if (!Buffer.isBuffer(target)) {
                throw new Error(method + ": parameter must be a Buffer().");
            }
        }
        else if (expected === "BigNumber") {
            if (!bignumber_js_1.BigNumber.isBigNumber(target)) {
                throw new Error(method + ": parameter must be of type BigNumber.");
            }
        }
        else if (typeof target !== expected) {
            if (target.constructor.name !== expected) {
                throw new Error(method + ": parameter must be of type " + expected + ".");
            }
        }
        return true;
    }
}
exports.GenericAccountUtils = GenericAccountUtils;
//# sourceMappingURL=account-utils.js.map