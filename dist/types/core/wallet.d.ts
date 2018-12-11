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
    static fromJson(json: string, blockchains?: IBlockchainImplementation[]): Wallet;
    mnemonics: string;
    mnemonicslang: string;
    seed: Buffer;
    nodes: Map<Blockchain, Map<number, GenericNode>>;
    accounts: Map<Blockchain, GenericAccount[]>;
    currentNetwork: any;
    private mapper;
    constructor(mnemonics?: string, language?: string, mnemonicPassword?: string);
    getClassMapper(): DynamicClassMapper;
    loadBlockchain(blockchainImplementation: IBlockchainImplementation): void;
    getAccounts(blockchain: Blockchain, reference?: boolean, filter?: boolean, networkId?: number): GenericAccount[];
    getAccountsMap(): Map<Blockchain, GenericAccount[]>;
    getBlockchain(blockchain: Blockchain): {
        getNode: () => GenericNode;
        getAccounts: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>[];
        getAllAccounts: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>[];
        createAccount: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
        importAccount: (account: GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>) => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
        getNetworks: () => import("src/core/network").Network[];
        getCurrentNetwork: () => number;
        switchNetwork: (networkId: any) => GenericNode;
        getInitializedNodes: () => Map<number, GenericNode>;
    };
    getNetworks(blockchain: Blockchain): import("src/core/network").Network[];
    getCurrentNetwork(blockchain: Blockchain): number;
    switchNetwork(blockchain: Blockchain, networkId: number): GenericNode;
    getNode(blockchain: Blockchain, networkId?: number): GenericNode;
    createAccount(blockchain: Blockchain, networkId?: number): GenericAccount;
    requireImplementation(blockchain: Blockchain, method: string): boolean;
    importAccount(account: GenericAccount): GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
    toJSON(): string;
}
