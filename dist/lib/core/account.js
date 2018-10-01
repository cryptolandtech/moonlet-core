"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
}
exports.GenericAccount = GenericAccount;
//# sourceMappingURL=account.js.map