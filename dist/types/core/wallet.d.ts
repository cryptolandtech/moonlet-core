/// <reference types="node" />
import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount } from "./account";
import DynamicClassMapper from "../class.store";
import { IBlockchainImplementation } from "./blockchain-implementation";
export interface WalletExport {
    mnemonics: string;
    mnemonicslang: string;
    blockchains: any;
    currentNetworks: {};
    seed: string;
    accounts: {};
    nodes: {};
    version: string;
}
export default class Wallet {
    /**
     * Instantiate wallet using a serialised data
     * @param json
     * @param [blockchains]
     */
    static fromJson(json: string, blockchains?: IBlockchainImplementation[]): Wallet;
    mnemonics: string;
    mnemonicslang: string;
    seed: Buffer;
    nodes: Map<Blockchain, Map<number, GenericNode>>;
    accounts: Map<Blockchain, GenericAccount[]>;
    currentNetwork: any;
    private mapper;
    /**
     * Creates an instance of wallet.
     * @param [mnemonics]
     * @param [language]
     * @param [mnemonicPassword]
     */
    constructor(mnemonics?: string, language?: string, mnemonicPassword?: string);
    /**
     * Gets class mapper
     * @returns class mapper
     */
    getClassMapper(): DynamicClassMapper;
    /**
     * Loads blockchain implementation
     * @param blockchainImplementation
     */
    loadBlockchain(blockchainImplementation: IBlockchainImplementation): void;
    /**
     * Gets accounts
     * @param blockchain
     * @param [reference]
     * @param [filter]
     * @param [networkId]
     * @returns accounts
     */
    getAccounts(blockchain: Blockchain, reference?: boolean, filter?: boolean, networkId?: number): GenericAccount[];
    /**
     * Gets accounts map
     * @returns accounts map
     */
    getAccountsMap(): Map<Blockchain, GenericAccount[]>;
    /**
     * Gets blockchain
     * @param blockchain
     * @returns an object containing all methods required to use this implementation
     */
    getBlockchain(blockchain: Blockchain): {
        getNode: () => GenericNode;
        getAccounts: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>[];
        getAllAccounts: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>[];
        createAccount: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
        importAccount: (account: GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>) => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
        getNetworks: () => import("./network").Network[];
        getCurrentNetwork: () => number;
        switchNetwork: (networkId: any) => GenericNode;
        getInitializedNodes: () => Map<number, GenericNode>;
    };
    /**
     * Gets networks
     * @param blockchain
     * @returns networks
     */
    getNetworks(blockchain: Blockchain): import("./network").Network[];
    /**
     * Gets current network for specified blockchain
     * @param blockchain
     * @returns current network
     */
    getCurrentNetwork(blockchain: Blockchain): number;
    /**
     * Switches network for specified blockchain
     * @param blockchain
     * @param networkId
     */
    switchNetwork(blockchain: Blockchain, networkId: number): GenericNode;
    /**
     * Gets existing node or initialises a new one for specified blockchain
     * @param blockchain
     * @param [networkId]
     * @returns node
     */
    getNode(blockchain: Blockchain, networkId?: number): GenericNode;
    /**
     * Creates an account on specified blockchain and network
     * @param blockchain
     * @param [networkId]
     * @returns account
     */
    createAccount(blockchain: Blockchain, networkId?: number): GenericAccount;
    /**
     * Requires implementation
     * @param blockchain
     * @param method
     * @returns true if implementation is found, otherwise false
     */
    requireImplementation(blockchain: Blockchain, method: string): boolean;
    /**
     * Imports account
     * @param account
     * @returns account
     */
    importAccount(account: GenericAccount): GenericAccount;
    /**
     * Serialises wallet and returns a json string
     * @returns json
     */
    toJSON(): string;
}
