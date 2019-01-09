"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../core/transaction");
class EthereumTransaction extends transaction_1.GenericTransaction {
    /**
     * Creates an instance of an ethereum transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from, to, amount, nonce, options) {
        super(from, to, nonce, options);
        this.amount = amount;
        this.value = amount;
        this.chainId = options.chainId;
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
        this.data = options.data || Buffer.from("");
    }
    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    toParams() {
        return {
            nonce: this.getNumberToHex(this.nonce),
            gasPrice: this.getNumberToHex(this.gasPrice),
            gasLimit: this.getNumberToHex(this.gasLimit),
            to: this.to,
            value: this.getNumberToHex(this.value),
            data: "0x" + this.data,
            chainId: this.getNumberToHex(this.chainId),
        };
    }
}
exports.EthereumTransaction = EthereumTransaction;
//# sourceMappingURL=transaction.js.map