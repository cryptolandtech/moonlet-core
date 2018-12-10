"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = __importDefault(require("./networks"));
class EthereumNode extends node_1.GenericNode {
    constructor(network) {
        super();
        this.NETWORKS = networks_1.default;
        this.init(network);
    }
    getBalance(caddress) {
        return this.rpcCall("eth_getBalance", [
            caddress,
            'latest',
        ], "BigNumber");
    }
    getNonce(caddress) {
        return this.rpcCall("eth_getTransactionCount", [
            caddress,
            'latest',
        ], "number");
    }
    estimateGas(from, callArguments) {
        return this.rpcCall("eth_estimateGas", [
            callArguments,
        ], "number");
    }
    getTransactionReceipt(transaction) {
        if (transaction.receipt !== undefined) {
            return Promise.resolve(transaction.receipt);
        }
        else {
            return this.rpcCall("eth_getTransactionReceipt", [transaction.txn], "raw").then(data => {
                transaction.setReceiptStatus(data);
                return Promise.resolve(data);
            }).catch(error => {
                return Promise.reject(error);
            });
        }
    }
    send(transaction) {
        return this.sendRaw("0x" + transaction.raw.toString("hex"));
    }
    sendRaw(rawTransaction) {
        return this.rpcCall("eth_sendRawTransaction", [rawTransaction], "raw");
    }
}
EthereumNode.NETWORKS = networks_1.default;
exports.EthereumNode = EthereumNode;
//# sourceMappingURL=node.js.map