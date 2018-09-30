"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericAccountUtils {
    requireType(target, expected, method) {
        if (expected === "Buffer") {
            if (!Buffer.isBuffer(target)) {
                throw new Error(method + ": parameter must be a Buffer().");
            }
        }
        else if (typeof target !== expected) {
            throw new Error(method + ": parameter must be of type " + expected + ".");
        }
        return true;
    }
}
exports.GenericAccountUtils = GenericAccountUtils;
//# sourceMappingURL=account-utils.js.map