"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./../../core/blockchain");
exports.EthereumConfig = {
    blockchain: blockchain_1.Blockchain.ETHEREUM,
    mainCoin: "ETH",
    units: {
        WEI: 18,
        GWEI: 9,
    },
};
exports.default = exports.EthereumConfig;
//# sourceMappingURL=config.js.map