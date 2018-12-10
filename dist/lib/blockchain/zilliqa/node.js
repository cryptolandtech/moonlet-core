"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = __importDefault(require("./networks"));
const bignumber_js_1 = require("bignumber.js");
class ZilliqaNode extends node_1.GenericNode {
    constructor(network) {
        super();
        this.NETWORKS = networks_1.default;
        this.init(network);
    }
    getBalance(caddress) {
        const call = this.rpcCall("GetBalance", [caddress.replace("0x", "").toLowerCase()], "");
        return call.then((data) => {
            return new bignumber_js_1.BigNumber(data.balance);
        }).catch((error) => {
            return Promise.reject(new Error(error));
        });
    }
    getNonce(caddress) {
        const call = this.rpcCall("GetBalance", [caddress.replace("0x", "").toLowerCase()], "");
        return call.then((data) => {
            return data.nonce;
        }).catch((error) => {
            return Promise.reject(new Error(error));
        });
    }
    estimateGas(from, callArguments) {
        /*
        // not implemented by Zilliqa yet.. returns "Hello"
        return this.rpcCall("GetGasEstimate", [
            callArguments,
        ], "number") as Promise<any>;
        */
        return Promise.resolve(99);
    }
    getTransactionReceipt(transaction) {
        if (transaction.receipt !== undefined) {
            return Promise.resolve(transaction.receipt);
        }
        else {
            return Promise.resolve(transaction.txn.TranID);
        }
    }
    send(transaction) {
        // cast properties as expected by Zilliqa Nodes.
        const SendObject = transaction.TXObject;
        SendObject.amount = SendObject.amount.toString();
        SendObject.gasPrice = SendObject.gasPrice.toString();
        SendObject.gasLimit = SendObject.gasLimit.toString();
        return this.sendRaw(SendObject);
    }
    sendRaw(rawTransaction) {
        return this.rpcCall("CreateTransaction", [rawTransaction], "raw");
    }
}
ZilliqaNode.NETWORKS = networks_1.default;
exports.ZilliqaNode = ZilliqaNode;
//# sourceMappingURL=node.js.map