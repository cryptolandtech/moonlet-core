"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../core/node");
const networks_1 = require("./networks");
class ZilliqaNode extends node_1.GenericNode {
    constructor(network) {
        super();
        this.NETWORKS = networks_1.default;
        this.init(network);
    }
    getBalance(address) {
        throw new Error("Method not implemented.");
    }
    getNonce(caddress) {
        throw new Error("Method not implemented.");
    }
    send(rawTransaction) {
        throw new Error("Method not implemented.");
    }
}
ZilliqaNode.NETWORKS = networks_1.default;
exports.ZilliqaNode = ZilliqaNode;
//# sourceMappingURL=node.js.map