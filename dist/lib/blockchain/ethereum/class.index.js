"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const node_1 = require("./node");
const transaction_1 = require("./transaction");
const config_1 = __importDefault(require("./config"));
const networks_1 = __importDefault(require("./networks"));
const AvailableClasses = {
    EthereumAccount: account_1.EthereumAccount,
    EthereumNode: node_1.EthereumNode,
    EthereumTransaction: transaction_1.EthereumTransaction,
};
exports.Ethereum = {
    AvailableClasses,
    config: config_1.default,
    networks: networks_1.default
};
exports.default = exports.Ethereum;
//# sourceMappingURL=class.index.js.map