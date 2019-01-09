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
    constructor(from, to, nonce, options) {
        this.txn = "";
        this.raw = Buffer.from("");
        this.status = TransactionStatus.NEW;
        this.times = [];
        this.from = from;
        this.to = to;
        this.nonce = nonce;
        this.options = options;
        this.addTime("creation");
    }
    static getImplementedClassName(name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Transaction";
    }
    /**
     * Sets transaction status to signed, adds raw data and indexes event
     * @param data
     */
    setSignedResult(data) {
        this.addTime("signed");
        this.status = TransactionStatus.SIGNED;
        this.raw = data;
    }
    /**
     * Sets transaction status to pending and indexes event
     * @param data
     */
    setPending() {
        this.addTime("pending");
        this.status = TransactionStatus.PENDING;
    }
    /**
     * Sets transaction status to final, adds txn and indexes event
     * @param data
     */
    setTxn(txn) {
        this.addTime("final");
        this.status = TransactionStatus.FINAL;
        this.txn = txn;
    }
    /**
     * Sets transaction receipt and indexes event
     * @param data
     */
    setReceiptStatus(receipt) {
        this.addTime("receipt");
        this.receipt = receipt;
    }
    /**
     * Converts number to hex string
     * @param num
     * @returns hex representation
     */
    getNumberToHex(num) {
        return "0x" + num.toString(16);
    }
    /**
     * Adds time to current event
     * @param eventName
     */
    addTime(eventName) {
        this.times.push({
            name: eventName,
            unixtime: Math.round((new Date()).getTime() / 1000),
        });
    }
}
exports.GenericTransaction = GenericTransaction;
//# sourceMappingURL=transaction.js.map