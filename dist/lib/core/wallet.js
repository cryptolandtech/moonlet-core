"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mnemonic_1 = __importDefault(require("./utils/mnemonic"));
const hdkey_1 = __importDefault(require("./utils/hdkey"));
const blockchain_1 = require("./blockchain");
const node_1 = require("./node");
const account_1 = require("./account");
const class_store_1 = __importDefault(require("../class.store"));
class Wallet {
    constructor(mnemonics, language, mnemonicPassword) {
        this.hdroots = new Map();
        this.nodes = new Map();
        this.accounts = new Map();
        this.mapper = new class_store_1.default();
        this.mnemonicslang = language || "EN";
        if (mnemonics) {
            this.mnemonics = mnemonics;
        }
        else {
            this.mnemonics = mnemonic_1.default.generateMnemonic(this.mnemonicslang);
        }
        // setup seed
        this.seed = mnemonic_1.default.mnemonicToSeed(this.mnemonics, this.mnemonicslang, mnemonicPassword);
    }
    static fromJson(json) {
        //
    }
    getClassMapper() {
        return this.mapper;
    }
    getAccounts(blockchain) {
        this.requireImplementation(blockchain, "getAccounts");
        let Results = this.accounts.get(blockchain);
        if (!Results) {
            Results = [];
            this.accounts.set(blockchain, Results);
        }
        return Results;
    }
    getAccountsMap() {
        return this.accounts;
    }
    getBlockchain(blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account) => this.importAccount(account),
        };
    }
    getNode(blockchain, networkId) {
        this.requireImplementation(blockchain, "getNode");
        networkId = networkId || 0;
        let initialisedNodesMap = this.nodes.get(blockchain);
        if (initialisedNodesMap === undefined) {
            initialisedNodesMap = new Map();
            this.nodes.set(blockchain, initialisedNodesMap);
        }
        let byNetwork = initialisedNodesMap.get(networkId);
        if (byNetwork === undefined) {
            // init new node with requested type
            const NodeClassName = node_1.GenericNode.getImplementedClassName(blockchain_1.Blockchain[blockchain]);
            byNetwork = this.mapper.getInstance(NodeClassName);
            byNetwork.blockchain = blockchain;
            initialisedNodesMap.set(networkId, byNetwork);
            const hdkey = hdkey_1.default.fromMasterSeed(this.seed);
            byNetwork.HDRootKey = hdkey.derivePath(byNetwork.getCurrentNetworkPathString());
            // this.root = this.hdWallet.derivePath(this.hdPathString);
            // byNetwork.setCustomNetworkUrl("test");
            // byNetwork.resetCustomNetworkUrl();
            // getCurrentNetworkPathString
        }
        return byNetwork;
    }
    createAccount(blockchain, networkId) {
        this.requireImplementation(blockchain, "createAccount");
        networkId = networkId || 0;
        const existingAccounts = this.getAccounts(blockchain);
        const accountNode = this.getNode(blockchain, networkId);
        const hdkey = accountNode.HDRootKey.deriveChild(existingAccounts.length);
        const accountOptions = {
            node: accountNode,
            type: account_1.AccountType.HD,
            hd: hdkey,
        };
        const DynamicClassName = account_1.GenericAccount.getImplementedClassName(blockchain_1.Blockchain[blockchain]);
        const account = this.mapper.getInstance(DynamicClassName, accountOptions);
        this.getAccounts(blockchain).push(account);
        return account;
    }
    requireImplementation(blockchain, method) {
        if (!blockchain_1.Blockchain[blockchain]) {
            throw new Error(method + ": Blockchain \"" + blockchain + "\" does not have an implementation. Make sure it's indexed in the class store.");
        }
        return true;
    }
    importAccount(account) {
        if (account.type === account_1.AccountType.HD) {
            throw new Error("importAccount: you cannot import HD Wallets.");
        }
        this.getAccounts(account.node.blockchain).push(account);
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map