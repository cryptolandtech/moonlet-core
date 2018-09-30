"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("../../core/blockchain");
const networks = [
    {
        name: "Main net",
        chainId: 1,
        blockchain: blockchain_1.Blockchain.ZILLIQA,
        mainNet: true,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 10018,
    },
    {
        name: "Test net",
        chainId: 2,
        blockchain: blockchain_1.Blockchain.ZILLIQA,
        mainNet: false,
        url: "https://api-scilla.zilliqa.com/",
        HDCoinValue: 1,
    },
    {
        name: "Kaya - TestRPC",
        chainId: 15,
        blockchain: blockchain_1.Blockchain.ZILLIQA,
        mainNet: false,
        url: "http://127.0.0.1:4200/",
        HDCoinValue: 1,
    },
];
exports.default = networks;
//# sourceMappingURL=networks.js.map