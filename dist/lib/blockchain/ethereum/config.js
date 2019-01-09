"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./../../core/blockchain");
exports.EthereumConfig = {
    blockchain: blockchain_1.Blockchain.ETHEREUM,
    mainCoin: "ETH",
    units: {
        wei: 18,
        kwei: 15,
        mwei: 12,
        gwei: 9,
        szabo: 6,
        finney: 3,
        ether: 0,
        kether: -3,
        mether: -6,
        gether: -9,
        tether: -12,
    },
    unitsExtra: {
        ada: 15,
        femtoether: 15,
        babbage: 12,
        picoether: 12,
        nano: 9,
        shannon: 9,
        nanoether: 9,
        microether: 6,
        micro: 6,
        milliether: 3,
        milli: 3,
        grand: -3,
        einstein: -3,
    },
};
exports.default = exports.EthereumConfig;
//# sourceMappingURL=config.js.map