"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../../core/account");
const transaction_1 = require("./transaction");
const account_utils_1 = require("./account-utils");
const ZilliqaJsCrypto = __importStar(require("@zilliqa-js/crypto"));
class ZilliqaAccount extends account_1.GenericAccount {
    /**
     * Creates an instance of zilliqa account.
     * @param accountOptions
     */
    constructor(accountOptions) {
        super(accountOptions);
        this.utils = new account_utils_1.ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }
    /**
     * Gets balance
     * @returns a promise of a balance
     */
    getBalance() {
        return this.node.getBalance(this.address);
    }
    /**
     * Gets nonce
     * @returns a promise of a nonce
     */
    getNonce() {
        return this.node.getNonce(this.address);
    }
    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasLimit
     * @param txGasPrice
     * @returns transfer transaction
     */
    buildTransferTransaction(to, amount, nonce, txGasLimit, txGasPrice) {
        return this.buildTransaction(to, amount, nonce, Buffer.from(""), txGasPrice, txGasLimit);
    }
    /**
     * Estimates transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [txGasPrice]
     * @param [txGasLimit]
     * @returns a cost estimate
     */
    estimateTransaction(to, amount, nonce, txdata, txGasPrice, txGasLimit) {
        throw new Error("Method not implemented.");
        /*
        can be used once GetGasEstimate is implemented in the LookupNode
        // https://github.com/Zilliqa/Zilliqa/blob/db00328e78364c5ae6049f483d8f5bc696027d79/src/libServer/Server.cpp#L580
        // not implemented yet.. returns "Hello"

        return this.node.estimateGas(
            this.buildTransaction(to, amount, nonce, txdata, txGasPrice, txGasLimit).toParams()
        );
        */
    }
    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param txGasPrice
     * @param txGasLimit
     * @returns transaction
     */
    buildTransaction(to, amount, nonce, txdata, txGasPrice = 0, txGasLimit = 8000000) {
        return new transaction_1.ZilliqaTransaction(this.address, // from me
        to, // to actual receiver
        amount, // value in qa
        nonce, // account nonce
        {
            gasPrice: txGasPrice,
            gasLimit: txGasLimit,
            chainId: this.node.network.chainId,
            data: txdata,
        });
    }
    /**
     * Signs transaction
     * @param transaction
     * @returns serialized data
     */
    signTransaction(transaction) {
        const TXObject = transaction.toParams(this.publicKey.replace("0x", ""));
        // the address should be checksummed and we need to lowercase it for signing
        TXObject.toAddr = TXObject.toAddr.toLowerCase();
        const bytes = transaction.getProtoEncodedTx(TXObject);
        const signature = ZilliqaJsCrypto.sign(bytes, this.privateKey.replace("0x", ""), this.publicKey.replace("0x", ""));
        TXObject.signature = signature;
        const serialized = Buffer.from(JSON.stringify(TXObject));
        transaction.TXObject = TXObject;
        transaction.setSignedResult(serialized);
        return serialized;
    }
    /**
     * not supported
     */
    buildCancelTransaction(nonce, txGasPrice) {
        return false;
    }
}
exports.ZilliqaAccount = ZilliqaAccount;
//# sourceMappingURL=account.js.map