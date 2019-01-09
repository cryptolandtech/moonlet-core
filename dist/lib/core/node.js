"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
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
    /**
     * Gets implemented class name
     * @param name
     * @returns class name string
     */
    static getImplementedClassName(name) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Node";
    }
    /**
     * Initialises node on specified network or default if network param is not supplied
     * @param [network]
     */
    init(network) {
        network = network || this.NETWORKS[0];
        this.customNetworkUrl = false;
        this.blockchain = network.blockchain;
        this.network = Object.assign({}, network);
    }
    /**
     * Gets current network path string
     * @returns current network path string
     */
    getCurrentNetworkPathString() {
        return `m/44'/` + this.network.HDCoinValue + `'/0'/0`;
    }
    /**
     * Gets current network
     * @returns network
     */
    getNetwork() {
        return this.network;
    }
    /**
     * Sets custom network url
     * @param url
     */
    setCustomNetworkUrl(url) {
        this.network.url = url;
        this.customNetworkUrl = true;
    }
    /**
     * Resets custom network url
     */
    resetCustomNetworkUrl() {
        for (const net in this.NETWORKS) {
            if (this.network.chainId === this.NETWORKS[net].chainId) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }
    /**
     * Posts an RPC call to the current network
     * @param method - RPC Method name
     * @param params - RPC Method parameters
     * @param [dec]  - Result decoder type
     * @returns raw or decoded result
     */
    rpcCall(method, params, dec) {
        const callData = this.buildCall(method, params);
        const callOptions = {};
        const action = axios_1.default.post(this.network.url, callData, callOptions);
        // console.log( "CallData: ", callData );
        return action.then((data) => {
            // console.log( "return result:", data );
            if (data.data.result !== undefined) {
                return this.resultDecoder(data.data.result, dec);
            }
            else {
                return Promise.reject(data.data.error.message);
            }
        }).catch((error) => {
            return Promise.reject(new Error(error));
        });
    }
    /**
     * Build an RPC call
     * @param cmethod
     * @param cparams
     * @returns call
     */
    buildCall(cmethod, cparams) {
        return {
            jsonrpc: '2.0',
            method: cmethod,
            params: cparams,
            id: ++this.callId,
        };
    }
    /**
     * Converts the received data into the requested type
     * @param data
     * @param [type]
     * @returns decoded result
     */
    resultDecoder(data, type) {
        if (type === "raw" || type === undefined || type === "" || type === null) {
            return data;
        }
        else if (type === "BigNumber") {
            return new bignumber_js_1.BigNumber(data);
        }
        else if (type === "number") {
            return parseInt(data, 16); // radix js default = 16
        }
        else if (type === "Buffer") {
            return Buffer.from(data);
        }
        throw new Error("type: [" + type + "] not implemented");
    }
}
GenericNode.NETWORKS = [];
exports.GenericNode = GenericNode;
//# sourceMappingURL=node.js.map