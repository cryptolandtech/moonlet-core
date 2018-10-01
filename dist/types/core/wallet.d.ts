/// <reference types="node" />
import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount } from "./account";
import DynamicClassMapper from "../class.store";
export default class Wallet {
    static fromJson(json: string): void;
    mnemonics: string;
    mnemonicslang: string;
    seed: Buffer;
    hdroots: Map<Blockchain, any>;
    nodes: Map<Blockchain, Map<number, GenericNode>>;
    accounts: Map<Blockchain, GenericAccount[]>;
    private mapper;
    constructor(mnemonics?: string, language?: string, mnemonicPassword?: string);
    getClassMapper(): DynamicClassMapper;
    getAccounts(blockchain: Blockchain): GenericAccount[];
    getAccountsMap(): Map<Blockchain, GenericAccount[]>;
    getBlockchain(blockchain: Blockchain): {
        getNode: () => GenericNode;
        getAccounts: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>[];
        createAccount: () => GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>;
        importAccount: (account: GenericAccount<import("./transaction").GenericTransaction<import("./transaction").ITransactionOptions>, import("./transaction").ITransactionOptions>) => void;
    };
    getNode(blockchain: Blockchain, networkId?: number): GenericNode;
    createAccount(blockchain: Blockchain, networkId?: number): GenericAccount;
    requireImplementation(blockchain: Blockchain, method: string): boolean;
    importAccount(account: GenericAccount): void;
}
