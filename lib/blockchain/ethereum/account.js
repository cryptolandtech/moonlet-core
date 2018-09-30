"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../core/account");
const transaction_1 = require("./transaction");
const account_utils_1 = require("./account-utils");
class EthereumAccount extends account_1.GenericAccount {
    constructor(accountOptions) {
        super(accountOptions);
        this.defaultGasPriceInGwei = 30;
        this.utils = new account_utils_1.EthereumAccountUtils();
        this.tryHdWalletSetup();
    }
    getBalance() {
        return this.node.getBalance(this.address);
    }
    getNonce() {
        return this.node.getNonce(this.address);
    }
    GWeiToWei(input) {
        return input * Math.pow(10, 9); // 10^9
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
    buildCancelTransaction(nonce, priceInGWei) {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;
        return new transaction_1.EthereumTransaction(this.address, // from me
        this.address, // to me
        0, // value zero
        nonce, // account nonce
        {
            gasLimit: 21000,
            gasPrice: this.GWeiToWei(priceInGWei),
            chainId: this.node.network.chainId,
        });
    }
    buildTransaction() {
        throw new Error("Method not implemented.");
    }
    send(transaction) {
        throw new Error("Method not implemented.");
    }
}
exports.EthereumAccount = EthereumAccount;
//# sourceMappingURL=account.js.map