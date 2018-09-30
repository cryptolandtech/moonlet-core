"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("../../core/blockchain");
const networks = [
    {
        name: "Main net",
        chainId: 1,
        blockchain: blockchain_1.Blockchain.ETHEREUM,
        mainNet: true,
        url: "https://mainnet.infura.io/",
        HDCoinValue: 60,
    },
    {
        name: "Ropsten",
        chainId: 3,
        blockchain: blockchain_1.Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://ropsten.infura.io/",
        HDCoinValue: 1,
    },
    {
        name: "Rinkeby",
        chainId: 4,
        blockchain: blockchain_1.Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://rinkeby.infura.io/",
        HDCoinValue: 1,
    },
    {
        name: "Kovan",
        chainId: 42,
        blockchain: blockchain_1.Blockchain.ETHEREUM,
        mainNet: false,
        url: "https://kovan.infura.io/",
        HDCoinValue: 1,
    },
    {
        name: "Ganache - TestRPC",
        chainId: 15,
        blockchain: blockchain_1.Blockchain.ETHEREUM,
        mainNet: false,
        url: "http://127.0.0.1:8545/",
        HDCoinValue: 1,
    },
];
exports.default = networks;
//# sourceMappingURL=networks.js.map