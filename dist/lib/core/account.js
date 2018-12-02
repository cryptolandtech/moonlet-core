"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./transaction");
var AccountType;
(function (AccountType) {
    AccountType["HD"] = "HD";
    AccountType["LOOSE"] = "LOOSE";
    AccountType["HARDWARE"] = "HARDWARE";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
class GenericAccount {
    constructor(accountOptions) {
        this.address = "";
        this.publicKey = "";
        this.privateKey = "";
        this.supportsCancel = false;
        this.transactions = [];
        this.node = accountOptions.node;
        switch (accountOptions.type) {
            case AccountType.HD:
                if (!accountOptions.hd) {
                    throw new Error("accountOptions.hd parameter missing");
                }
                this.hd = accountOptions.hd;
                break;
            case AccountType.LOOSE:
                if (!accountOptions.privateKey) {
                    throw new Error("accountOptions.privateKey parameter missing");
                }
                this.privateKey = accountOptions.privateKey;
                break;
            case AccountType.HARDWARE:
                if (!accountOptions.address) {
                    throw new Error("accountOptions.address parameter missing");
                }
                this.address = accountOptions.address;
                break;
            default:
                throw new Error("accountOptions.type '" + accountOptions.type + "' not found");
        }
        this.type = accountOptions.type;
    }
    static getImplementedClassName(name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Account";
    }
    tryHdWalletSetup() {
        if (this.type === AccountType.HD && this.hd !== undefined) {
            this.privateKey = this.utils.bufferToHex(this.hd.getPrivateKey());
            this.publicKey = this.utils.bufferToHex(this.utils.privateToPublic(this.hd.getPrivateKey()));
            this.address = this.utils.toChecksumAddress(this.utils.privateToAddress(this.hd.getPrivateKey()).toString("hex"));
        }
    }
    getTransactions() {
        return this.transactions;
    }
    send(transaction, cb, cbtype) {
        this.transactions.push(transaction);
        if (transaction.status === transaction_1.TransactionStatus.SIGNED) {
            transaction.setPending();
            return this.node.send(transaction).then((txndata) => {
                transaction.setTxn(txndata);
                if (cb !== undefined && cbtype === "txn") {
                    cb(null, txndata);
                }
                // kaya does not throw this error properly..
                if (transaction.txn === "Invalid Tx Json") {
                    throw new Error("Invalid Tx Json");
                }
                // load extra transaction details
                return this.node.getTransactionReceipt(transaction).then(receiptdata => {
                    if (cb !== undefined && cbtype === undefined) {
                        cb(null, receiptdata);
                    }
                    return Promise.resolve({ txn: txndata, receipt: receiptdata });
                });
            }).catch((error) => {
                if (cb !== undefined) {
                    cb(error);
                }
                return Promise.reject(new Error(error));
            });
        }
        return Promise.reject(new Error("Transaction status needs to be SIGNED"));
    }
    buildCancelTransaction(nonce) {
        //
    }
}
exports.GenericAccount = GenericAccount;
//# sourceMappingURL=account.js.map