"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class GenericNode {
    constructor() {
        this.customNetworkUrl = false;
        this.connected = false;
        this.NETWORKS = [];
        this.network = this.NETWORKS[0];
        this.HDRootKey = null;
        this.callId = 0;
    }
    static getImplementedClassName(name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Node";
    }
    init(network) {
        network = network || this.NETWORKS[0];
        this.customNetworkUrl = false;
        this.network = Object.assign({}, network);
    }
    getCurrentNetworkPathString() {
        return `m/44'/` + this.network.HDCoinValue + `'/0'/0`;
    }
    getNetwork() {
        return this.network;
    }
    setCustomNetworkUrl(url) {
        this.network.url = url;
        this.customNetworkUrl = true;
    }
    resetCustomNetworkUrl() {
        for (const net in this.NETWORKS) {
            if (this.network.chainId === this.NETWORKS[net].chainId) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }
    call(method, params, cb) {
        const callData = this.buildCall(method, params);
        const callOptions = {};
        try {
            const action = axios_1.default.post(this.network.url, callData, callOptions);
            if (cb) {
                action.then(data => cb(null, data)).catch(error => cb(error));
            }
            else {
                return action;
            }
        }
        catch (error) {
            throw new Error("call:" + error);
        }
    }
    buildCall(cmethod, cparams) {
        return {
            jsonrpc: '2.0',
            method: cmethod,
            params: cparams,
            id: ++this.callId,
        };
    }
}
GenericNode.NETWORKS = [];
exports.GenericNode = GenericNode;
//# sourceMappingURL=node.js.map