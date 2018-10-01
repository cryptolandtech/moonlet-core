"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../core/account");
const account_utils_1 = require("./account-utils");
class ZilliqaAccount extends account_1.GenericAccount {
    constructor(accountOptions) {
        super(accountOptions);
        this.utils = new account_utils_1.ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }
    getBalance() {
        return this.node.getBalance(this.address);
    }
    getNonce() {
        return this.node.getNonce(this.address);
    }
    signTransaction(transaction) {
        throw new Error("Method not implemented.");
    }
    signMessage(message) {
        throw new Error("Method not implemented.");
    }
    buildTransferTransaction(to, amount, nonce, options) {
        throw new Error("Method not implemented.");
    }
    buildCancelTransaction(nonce, priceInZil) {
        throw new Error("Method not implemented.");
    }
    buildTransaction() {
        throw new Error("Method not implemented.");
    }
    send(transaction) {
        throw new Error("Method not implemented.");
    }
}
exports.ZilliqaAccount = ZilliqaAccount;
//# sourceMappingURL=account.js.map