"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = __importDefault(require("./networks"));
const bignumber_js_1 = require("bignumber.js");
class ZilliqaNode extends node_1.GenericNode {
    /**
     * Creates an instance of zilliqa node.
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
        const call = this.rpcCall("GetBalance", [caddress.replace("0x", "").toLowerCase()], "");
        return call.then((data) => {
            return new bignumber_js_1.BigNumber(data.balance);
        }).catch((error) => {
            if (error.message === "Account is not created") {
                return Promise.resolve(new bignumber_js_1.BigNumber(0));
            }
            return Promise.reject(new Error(error));
        });
    }
    /**
     * Gets nonce
     * @param caddress
     * @returns nonce
     */
    getNonce(caddress) {
        const call = this.rpcCall("GetBalance", [caddress.replace("0x", "").toLowerCase()], "");
        return call.then((data) => {
            return data.nonce;
        }).catch((error) => {
            if (error.message === "Account is not created") {
                return Promise.resolve(0);
            }
            return Promise.reject(new Error(error));
        });
    }
    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    estimateGas(callArguments) {
        throw new Error("Method not implemented.");
        /*
        // https://github.com/Zilliqa/Zilliqa/blob/db00328e78364c5ae6049f483d8f5bc696027d79/src/libServer/Server.cpp#L580
        // not implemented yet.. returns "Hello"
        return this.rpcCall("GetGasEstimate", [
            callArguments,
        ], "number") as Promise<any>;
        */
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
            return Promise.resolve(transaction.txn.TranID);
        }
    }
    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    send(transaction) {
        // cast properties as expected by Zilliqa Nodes.
        const SendObject = transaction.TXObject;
        SendObject.amount = SendObject.amount.toString();
        SendObject.gasPrice = SendObject.gasPrice.toString();
        SendObject.gasLimit = SendObject.gasLimit.toString();
        return this.sendRaw(SendObject);
    }
    /**
     * Sends a raw transaction to the current network
     * @param data
     * @returns result
     */
    sendRaw(data) {
        return this.rpcCall("CreateTransaction", [data], "raw");
    }
}
ZilliqaNode.NETWORKS = networks_1.default;
exports.ZilliqaNode = ZilliqaNode;
//# sourceMappingURL=node.js.map