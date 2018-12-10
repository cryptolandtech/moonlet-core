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
    ZilliqaAccount: account_1.ZilliqaAccount,
    ZilliqaNode: node_1.ZilliqaNode,
    ZilliqaTransaction: transaction_1.ZilliqaTransaction,
};
exports.Zilliqa = {
    AvailableClasses,
    config: config_1.default,
    networks: networks_1.default,
};
exports.default = exports.Zilliqa;
//# sourceMappingURL=class.index.js.map