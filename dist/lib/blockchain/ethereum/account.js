"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../core/account");
const transaction_1 = require("./transaction");
const account_utils_1 = require("./account-utils");
const ethereumjs_tx_1 = __importDefault(require("ethereumjs-tx"));
class EthereumAccount extends account_1.GenericAccount {
    constructor(accountOptions) {
        super(accountOptions);
        this.defaultGasPriceInGwei = 30;
        this.supportsCancel = true;
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
    estimateTransferTransaction(to, amount, nonce) {
        return this.node.estimateGas(this.address, new transaction_1.EthereumTransaction(this.address, // from me
        to, // to actual receiver
        amount, // value in wei
        nonce, // account nonce
        {
            gasLimit: 6700000,
            gasPrice: this.GWeiToWei(this.defaultGasPriceInGwei),
            chainId: this.node.network.chainId,
        }).toParams());
    }
    buildTransferTransaction(to, amount, nonce, priceInGWei) {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;
        return new transaction_1.EthereumTransaction(this.address, // from me
        to, // to receiver
        amount, // value in wei
        nonce, // account nonce
        {
            gasLimit: 21000,
            gasPrice: this.GWeiToWei(priceInGWei),
            chainId: this.node.network.chainId,
        });
    }
    estimateTransaction(to, amount, nonce, txdata, priceInGWei) {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;
        const GasEstimationTransaction = new transaction_1.EthereumTransaction(this.address, // from me
        to, // to actual receiver
        amount, // value in wei
        nonce, // account nonce
        {
            gasLimit: 6700000,
            gasPrice: this.GWeiToWei(priceInGWei),
            chainId: this.node.network.chainId,
            data: txdata,
        });
        return this.node.estimateGas(this.address, GasEstimationTransaction.toParams());
    }
    buildTransaction(to, amount, nonce, txdata, txgasLimit, priceInGWei) {
        return new transaction_1.EthereumTransaction(this.address, // from me
        to, // to actual receiver
        amount, // value in wei
        nonce, // account nonce
        {
            gasLimit: txgasLimit,
            gasPrice: this.GWeiToWei(priceInGWei),
            chainId: this.node.network.chainId,
            data: txdata,
        });
    }
    signTransaction(transaction) {
        const tx = new ethereumjs_tx_1.default(transaction.toParams());
        tx.sign(Buffer.from(this.privateKey.replace("0x", ""), "hex"));
        const serialized = tx.serialize();
        transaction.setSignedResult(serialized);
        return serialized;
    }
    signMessage(message) {
        throw new Error("Method not implemented.");
    }
}
exports.EthereumAccount = EthereumAccount;
//# sourceMappingURL=account.js.map