"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("../../core/transaction");
const util_1 = require("@zilliqa-js/util");
const account_1 = require("@zilliqa-js/account");
const ZilliqaJsCrypto = __importStar(require("@zilliqa-js/crypto"));
const signature_1 = __importDefault(require("elliptic/lib/elliptic/ec/signature"));
class ZilliqaTransaction extends transaction_1.GenericTransaction {
    constructor(from, to, amount, nonce, options) {
        super(from, to, nonce, options);
        this.version = 1;
        this.amount = amount;
        this.pubKey = options.pubKey;
        this.code = options.code || Buffer.from("");
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
    }
    toParams(subPubKey) {
        return {
            version: this.version,
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
    getProtoEncodedTx(TXObject) {
        return account_1.util.encodeTransactionProto(TXObject);
    }
    validate(params, signature, publicKey) {
        return ZilliqaJsCrypto.schnorr.verify(this.getProtoEncodedTx(params), new signature_1.default({
            r: new util_1.BN(signature.slice(0, 64), 16),
            s: new util_1.BN(signature.slice(64), 16),
        }), Buffer.from(publicKey.replace("0x", ""), 'hex'));
    }
}
exports.ZilliqaTransaction = ZilliqaTransaction;
//# sourceMappingURL=transaction.js.map