"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = __importDefault(require("./networks"));
const bignumber_js_1 = require("bignumber.js");
class EthereumNode extends node_1.GenericNode {
    constructor(network) {
        super();
        this.NETWORKS = networks_1.default;
        this.init(network);
    }
    getBalance(caddress) {
        return new Promise((resolve, reject) => {
            const result = this.call("eth_getBalance", [
                caddress,
                'latest',
            ]);
            return result.then((res) => {
                return resolve(new bignumber_js_1.BigNumber(res.data.result));
            }).catch((error) => {
                reject(error);
            });
        });
    }
    getNonce(caddress) {
        return new Promise((resolve, reject) => {
            const result = this.call("eth_getTransactionCount", [
                caddress,
                'pending',
            ]);
            return result.then((res) => {
                const num = new bignumber_js_1.BigNumber(res.data.result);
                return resolve(num.toNumber());
            }).catch((error) => {
                reject(error);
            });
        });
    }
    send(rawTransaction) {
        throw new Error("Method not implemented.");
    }
}
EthereumNode.NETWORKS = networks_1.default;
exports.EthereumNode = EthereumNode;
//# sourceMappingURL=node.js.map