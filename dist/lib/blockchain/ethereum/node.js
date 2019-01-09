"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = __importDefault(require("./networks"));
class EthereumNode extends node_1.GenericNode {
    /**
     * Creates an instance of ethereum node.
     * @param [network]
     */
    constructor(network) {
        super();
        this.NETWORKS = networks_1.default;
        this.init(network);
    }
    /**
     * Gets balance
     * @param caddress
     * @returns balance
     */
    getBalance(caddress) {
        return this.rpcCall("eth_getBalance", [
            caddress,
            'latest',
        ], "BigNumber");
    }
    /**
     * Gets nonce
     * @param caddress
     * @returns nonce
     */
    getNonce(caddress) {
        return this.rpcCall("eth_getTransactionCount", [
            caddress,
            'latest',
        ], "number");
    }
    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    estimateGas(callArguments) {
        return this.rpcCall("eth_estimateGas", [
            callArguments,
        ], "number");
    }
    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
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
    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    send(transaction) {
        return this.sendRaw("0x" + transaction.raw.toString("hex"));
    }
    /**
     * Sends a raw transaction to the current network
     * @param data
     * @returns result
     */
    sendRaw(data) {
        return this.rpcCall("eth_sendRawTransaction", [data], "raw");
    }
}
EthereumNode.NETWORKS = networks_1.default;
exports.EthereumNode = EthereumNode;
//# sourceMappingURL=node.js.map