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
    /**
     * Creates an instance of wallet.
     * @param [mnemonics]
     * @param [language]
     * @param [mnemonicPassword]
     */
    constructor(mnemonics, language, mnemonicPassword) {
        this.nodes = new Map();
        this.accounts = new Map();
        this.currentNetwork = {};
        this.mapper = new class_store_1.default();
        const mnemonicslang = language || "EN";
        if (!mnemonics) {
            mnemonics = mnemonic_1.default.generateMnemonic(mnemonicslang);
        }
        this.mnemonics = mnemonics;
        this.mnemonicslang = mnemonicslang;
        // setup seed
        this.seed = mnemonic_1.default.mnemonicToSeed(mnemonics, mnemonicslang, mnemonicPassword);
    }
    /**
     * Instantiate wallet using a serialised data
     * @param json
     * @param [blockchains]
     */
    static fromJson(json, blockchains) {
        const data = JSON.parse(json);
        const wallet = new Wallet(data.mnemonics, data.mnemonicslang);
        if (Array.isArray(blockchains)) {
            blockchains.map(blockchain => wallet.loadBlockchain(blockchain));
        }
        // replace mnemonic data with saved values
        wallet.mnemonics = data.mnemonics;
        wallet.mnemonicslang = data.mnemonicslang;
        // set seed buffer
        wallet.seed = Buffer.from(data.seed, "hex");
        // set current networks
        wallet.currentNetwork = data.currentNetworks;
        // import accounts.
        for (const bcType in data.blockchains) {
            if (blockchain_1.Blockchain[data.blockchains[bcType]]) {
                const currentBlockchainEnum = blockchain_1.Blockchain[data.blockchains[bcType]];
                const currentBlockchain = blockchain_1.Blockchain[currentBlockchainEnum];
                const AccountClassTypeString = account_1.GenericAccount.getImplementedClassName(blockchain_1.Blockchain[currentBlockchain]);
                const NodeClassTypeString = node_1.GenericNode.getImplementedClassName(blockchain_1.Blockchain[currentBlockchain]);
                const bc = wallet.getBlockchain(blockchain_1.Blockchain[currentBlockchainEnum]);
                const currentNetworkId = bc.getCurrentNetwork();
                const currentBlockchainAccounts = data.accounts[currentBlockchainEnum];
                for (let i = 0; i < currentBlockchainAccounts.length; i++) {
                    const account = currentBlockchainAccounts[i];
                    const accountNetworkId = account.node.network.network_id;
                    let currentNode = bc.getNode();
                    let importedAccount;
                    if (account.type === account_1.AccountType.HD) {
                        // create account using internal hd key, no need to import anything.
                        importedAccount = wallet.createAccount(currentBlockchain, accountNetworkId);
                    }
                    else if (account.type === account_1.AccountType.LOOSE) {
                        if (accountNetworkId !== currentNetworkId) {
                            const CustomNode = wallet.mapper.getInstance(NodeClassTypeString);
                            CustomNode.init(CustomNode.NETWORKS[accountNetworkId]);
                            currentNode = CustomNode;
                        }
                        // Loose account setup
                        importedAccount = wallet.importAccount(wallet.mapper.getInstance(AccountClassTypeString, {
                            node: currentNode,
                            type: account_1.AccountType.LOOSE,
                            privateKey: account.privateKey,
                        }));
                    }
                    else if (account.type === account_1.AccountType.HARDWARE) {
                        if (accountNetworkId !== currentNetworkId) {
                            const CustomNode = wallet.mapper.getInstance(NodeClassTypeString);
                            CustomNode.init(CustomNode.NETWORKS[accountNetworkId]);
                            currentNode = CustomNode;
                        }
                        // HW account setup
                        importedAccount = wallet.importAccount(wallet.mapper.getInstance(AccountClassTypeString, {
                            node: currentNode,
                            type: account_1.AccountType.HARDWARE,
                            address: account.address,
                        }));
                    }
                    // set custom url on node if found
                    if (account.node.customNetworkUrl) {
                        importedAccount.node.setCustomNetworkUrl(account.node.network.url);
                    }
                    // import transactions
                    importedAccount.transactions = account.transactions;
                }
            }
        }
        return wallet;
    }
    /**
     * Gets class mapper
     * @returns class mapper
     */
    getClassMapper() {
        return this.mapper;
    }
    /**
     * Loads blockchain implementation
     * @param blockchainImplementation
     */
    loadBlockchain(blockchainImplementation) {
        this.mapper.collectClasses(blockchainImplementation.AvailableClasses);
        // Amount.addConfig(blockchainImplementation.config);
    }
    /**
     * Gets accounts
     * @param blockchain
     * @param [reference]
     * @param [filter]
     * @param [networkId]
     * @returns accounts
     */
    getAccounts(blockchain, reference = true, filter = false, networkId) {
        this.requireImplementation(blockchain, "getAccounts");
        networkId = networkId || this.getCurrentNetwork(blockchain);
        let Results = this.accounts.get(blockchain);
        if (!Results) {
            Results = [];
            this.accounts.set(blockchain, Results);
        }
        if (reference) {
            return Results;
        }
        else {
            // filter by network if specified
            let ReturnData = [];
            if (filter === false) {
                ReturnData = Results;
            }
            else {
                for (const r in Results) {
                    if (Results[r]) {
                        if (Results[r].node.network.network_id === networkId) {
                            ReturnData.push(Results[r]);
                        }
                    }
                }
            }
            return ReturnData;
        }
    }
    /**
     * Gets accounts map
     * @returns accounts map
     */
    getAccountsMap() {
        return this.accounts;
    }
    /**
     * Gets blockchain
     * @param blockchain
     * @returns an object containing all methods required to use this implementation
     */
    getBlockchain(blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain, false, true),
            getAllAccounts: () => this.getAccounts(blockchain, false, false),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account) => this.importAccount(account),
            getNetworks: () => this.getNetworks(blockchain),
            getCurrentNetwork: () => this.getCurrentNetwork(blockchain),
            switchNetwork: (networkId) => this.switchNetwork(blockchain, networkId),
            getInitializedNodes: () => this.nodes.get(blockchain),
        };
    }
    /**
     * Gets networks
     * @param blockchain
     * @returns networks
     */
    getNetworks(blockchain) {
        return this.getNode(blockchain, this.currentNetwork[blockchain]).NETWORKS;
    }
    /**
     * Gets current network for specified blockchain
     * @param blockchain
     * @returns current network
     */
    getCurrentNetwork(blockchain) {
        if (this.currentNetwork[blockchain] === undefined) {
            this.currentNetwork[blockchain] = 0;
        }
        return this.currentNetwork[blockchain];
    }
    /**
     * Switches network for specified blockchain
     * @param blockchain
     * @param networkId
     */
    switchNetwork(blockchain, networkId) {
        this.currentNetwork[blockchain] = networkId;
        return this.getNode(blockchain, networkId);
    }
    /**
     * Gets existing node or initialises a new one for specified blockchain
     * @param blockchain
     * @param [networkId]
     * @returns node
     */
    getNode(blockchain, networkId) {
        this.requireImplementation(blockchain, "getNode");
        networkId = networkId || this.getCurrentNetwork(blockchain);
        let initialisedNodesMap = this.nodes.get(blockchain);
        if (initialisedNodesMap === undefined) {
            initialisedNodesMap = new Map();
            this.nodes.set(blockchain, initialisedNodesMap);
        }
        let byNetwork = initialisedNodesMap.get(networkId);
        if (byNetwork === undefined) {
            // init new node with requested type
            const NodeClassName = node_1.GenericNode.getImplementedClassName(blockchain);
            byNetwork = this.mapper.getInstance(NodeClassName);
            byNetwork.init(byNetwork.NETWORKS[networkId]);
            initialisedNodesMap.set(networkId, byNetwork);
            const hdkey = hdkey_1.default.fromMasterSeed(this.seed);
            byNetwork.HDRootKey = hdkey.derivePath(byNetwork.getCurrentNetworkPathString());
        }
        return byNetwork;
    }
    /**
     * Creates an account on specified blockchain and network
     * @param blockchain
     * @param [networkId]
     * @returns account
     */
    createAccount(blockchain, networkId) {
        this.requireImplementation(blockchain, "createAccount");
        networkId = networkId || this.getCurrentNetwork(blockchain);
        const existingAccounts = this.getAccounts(blockchain);
        const accountNode = this.getNode(blockchain, networkId);
        const hdkey = accountNode.HDRootKey.deriveChild(existingAccounts.length);
        const accountOptions = {
            node: accountNode,
            type: account_1.AccountType.HD,
            hd: hdkey,
        };
        const DynamicClassName = account_1.GenericAccount.getImplementedClassName(blockchain);
        const account = this.mapper.getInstance(DynamicClassName, accountOptions);
        this.getAccounts(blockchain).push(account);
        return account;
    }
    /**
     * Requires implementation
     * @param blockchain
     * @param method
     * @returns true if implementation is found, otherwise false
     */
    requireImplementation(blockchain, method) {
        if (!blockchain_1.Blockchain[blockchain]) {
            throw new Error(method + ": Blockchain \"" + blockchain + "\" does not have an implementation. Make sure it's indexed in the class store.");
        }
        return true;
    }
    /**
     * Imports account
     * @param account
     * @returns account
     */
    importAccount(account) {
        if (account.type === account_1.AccountType.HD) {
            throw new Error("importAccount: you cannot import HD Wallets.");
        }
        const accountStore = this.getAccounts(account.node.blockchain);
        // generate address for loose imports
        if (account.type === account_1.AccountType.LOOSE) {
            account.publicKey = account.utils.bufferToHex(account.utils.privateToPublic(Buffer.from(account.privateKey, "hex")));
            account.address = account.utils.toChecksumAddress(account.utils.privateToAddress(Buffer.from(account.privateKey, "hex")).toString("hex"));
        }
        accountStore.push(account);
        return accountStore[accountStore.length - 1];
    }
    /**
     * Serialises wallet and returns a json string
     * @returns json
     */
    toJSON() {
        const data = {
            // we should probably not store mnemonics, but metamask does.. do we want them ?
            mnemonics: this.mnemonics,
            mnemonicslang: this.mnemonicslang,
            blockchains: [],
            currentNetworks: {},
            seed: this.seed.toString("hex"),
            accounts: {},
            nodes: {},
            version: "0.1",
        };
        for (const bcType in blockchain_1.Blockchain) {
            if (blockchain_1.Blockchain[bcType]) {
                const currentBlockchainEnum = blockchain_1.Blockchain[blockchain_1.Blockchain[bcType]];
                // save implemented blockchains
                data.blockchains.push(blockchain_1.Blockchain[bcType]);
                // save current networks
                data.currentNetworks[bcType] = this.getCurrentNetwork(currentBlockchainEnum);
                data.accounts[bcType] = [];
                // export accounts for each blockchain
                const accounts = this.getAccounts(currentBlockchainEnum, false, false);
                for (let i = 0; i < accounts.length; i++) {
                    data.accounts[bcType].push(accounts[i]);
                }
                const nodes = this.nodes.get(blockchain_1.Blockchain[blockchain_1.Blockchain[bcType]]);
                const networks = this.getNode(currentBlockchainEnum).NETWORKS;
                data.nodes[bcType] = [];
                for (let i = 0; i < networks.length; i++) {
                    if (networks[i] && nodes) {
                        data.nodes[bcType][networks[i].network_id] = nodes.get(networks[i].network_id);
                    }
                    else {
                        data.nodes[bcType][networks[i].network_id] = null;
                    }
                }
            }
        }
        return JSON.stringify(data);
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map