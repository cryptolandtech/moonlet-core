"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["NEW"] = "NEW";
    TransactionStatus["SIGNED"] = "SIGNED";
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["FINAL"] = "FINAL";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
class GenericTransaction {
    constructor(from, to, amount, nonce, options) {
        this.txn = ""; // transaction id from blockchain
        this.raw = new Buffer("");
        this.status = TransactionStatus.NEW;
        //
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;
    }
    static getImplementedClassName(name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Transaction";
    }
}
exports.GenericTransaction = GenericTransaction;
//# sourceMappingURL=transaction.js.map