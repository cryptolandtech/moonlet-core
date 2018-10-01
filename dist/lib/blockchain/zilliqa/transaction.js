"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../core/transaction");
class ZilliqaTransaction extends transaction_1.GenericTransaction {
    constructor(from, to, amount, nonce, options) {
        super(from, to, amount, nonce, options);
        this.version = 0.1;
        this.pubKey = options.pubKey;
        this.code = options.code;
    }
}
exports.ZilliqaTransaction = ZilliqaTransaction;
//# sourceMappingURL=transaction.js.map