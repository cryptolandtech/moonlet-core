"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../core/transaction");
class EthereumTransaction extends transaction_1.GenericTransaction {
    constructor(from, to, amount, nonce, options) {
        super(from, to, amount, nonce, options);
        this.value = amount;
        this.chainId = options.chainId;
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
    }
}
exports.EthereumTransaction = EthereumTransaction;
//# sourceMappingURL=transaction.js.map