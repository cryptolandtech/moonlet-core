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
    constructor(accountOptions) {
        super(accountOptions);
        this.minGasPriceInZil = 100;
        this.minGasLimit = 10;
        this.utils = new account_utils_1.ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }
    getBalance() {
        return this.node.getBalance(this.address);
    }
    getNonce() {
        return this.node.getNonce(this.address);
    }
    estimateTransferTransaction(to, amount, nonce) {
        return this.node.estimateGas(this.address, new transaction_1.ZilliqaTransaction(this.address, // from me
        to, // to actual receiver
        amount, // value in wei
        nonce + 1, // account nonce
        {
            gasLimit: this.minGasLimit,
            gasPrice: this.minGasPriceInZil,
        }).toParams());
    }
    buildTransferTransaction(to, amount, nonce, txgasLimit, priceInZil) {
        if (priceInZil < this.minGasPriceInZil) {
            throw Error("Minimum gas limit for a ZIL transaction is: " + this.minGasPriceInZil + " supplied gas was: " + priceInZil);
        }
        return new transaction_1.ZilliqaTransaction(this.address, // from me
        to, // to receiver
        amount, // value in wei
        nonce + 1, // account nonce
        {
            gasLimit: txgasLimit,
            gasPrice: priceInZil,
        });
    }
    estimateTransaction(to, amount, nonce, txdata, priceInGWei) {
        throw new Error("Method not implemented.");
    }
    buildTransaction() {
        throw new Error("Method not implemented.");
    }
    signTransaction(transaction) {
        const TXObject = transaction.toParams(this.publicKey.replace("0x", ""));
        const bytes = transaction.getProtoEncodedTx(TXObject);
        const signature = ZilliqaJsCrypto.sign(bytes, this.privateKey.replace("0x", ""), this.publicKey.replace("0x", ""));
        TXObject.signature = signature;
        const serialized = Buffer.from(JSON.stringify(TXObject));
        transaction.TXObject = TXObject;
        transaction.setSignedResult(serialized);
        return serialized;
    }
    signMessage(message) {
        throw new Error("Method not implemented.");
    }
}
exports.ZilliqaAccount = ZilliqaAccount;
//# sourceMappingURL=account.js.map