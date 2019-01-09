"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../core/transaction");
const util_1 = require("@zilliqa-js/util");
const account_1 = require("@zilliqa-js/account");
class ZilliqaTransaction extends transaction_1.GenericTransaction {
    /**
     * Creates an instance of a zilliqa transaction.
     * @param from
     * @param to
     * @param amount
     * @param nonce
     * @param options
     */
    constructor(from, to, amount, nonce, options) {
        super(from, to, nonce, options);
        this.version = 1;
        this.amount = amount;
        this.pubKey = options.pubKey || "";
        this.code = options.code || Buffer.from("");
        this.chainId = options.chainId;
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
    }
    /**
     * Converts current transaction to a parameters object required for transaction signing
     * @returns parameters object
     */
    toParams(subPubKey) {
        return {
            version: (this.chainId << 16) + this.version,
            toAddr: this.to.replace("0x", ""),
            nonce: this.nonce,
            pubKey: subPubKey || "",
            amount: new util_1.BN(this.amount),
            gasPrice: new util_1.BN(this.gasPrice),
            gasLimit: util_1.Long.fromNumber(this.gasLimit),
            code: '',
            data: '',
            signature: "",
        };
    }
    /**
     * Gets proto encoded tx
     * @param TXObject
     * @returns proto encoded tx
     */
    getProtoEncodedTx(TXObject) {
        return account_1.util.encodeTransactionProto(TXObject);
    }
}
exports.ZilliqaTransaction = ZilliqaTransaction;
//# sourceMappingURL=transaction.js.map