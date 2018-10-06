import Mnemonic from "./utils/mnemonic";
import HDKey from "./utils/hdkey";
import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount, AccountType } from "./account";
import DynamicClassMapper from "../class.store";

export default class Wallet {

    public static fromJson(json: string) {
        //
    }

    public mnemonics: string;
    public mnemonicslang: string;
    public seed: Buffer;

    // public hdroots: Map<Blockchain, any> = new Map();
    public nodes: Map<Blockchain, Map<number, GenericNode>> = new Map();
    public accounts: Map<Blockchain, GenericAccount[]> = new Map();

    private mapper: DynamicClassMapper;

    constructor(mnemonics?: string, language?: string, mnemonicPassword?: string) {
        this.mapper = new DynamicClassMapper();

        const mnemonicslang = language || "EN";

        if (!mnemonics) {
            mnemonics = Mnemonic.generateMnemonic(mnemonicslang);
        }

        this.mnemonics = mnemonics;
        this.mnemonicslang = mnemonicslang;
        // setup seed
        this.seed = Mnemonic.mnemonicToSeed(mnemonics, mnemonicslang, mnemonicPassword);
    }

    public getClassMapper(): DynamicClassMapper {
        return this.mapper;
    }

    public getAccounts(blockchain: Blockchain): GenericAccount[] {
        this.requireImplementation(blockchain, "getAccounts");

        let Results = this.accounts.get(blockchain);
        if (!Results) {
            Results = [];
            this.accounts.set(blockchain, Results);
        }
        return Results;
    }

    public getAccountsMap(): Map<Blockchain, GenericAccount[]> {
        return this.accounts;
    }

    public getBlockchain(blockchain: Blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account: GenericAccount) => this.importAccount(account),
        };
    }

    public getNode(blockchain: Blockchain, networkId?: number) {
        this.requireImplementation(blockchain, "getNode");
        networkId = networkId || 0;

        let initialisedNodesMap = this.nodes.get( blockchain );
        if (initialisedNodesMap === undefined) {
            initialisedNodesMap = new Map();
            this.nodes.set( blockchain, initialisedNodesMap );
        }

        let byNetwork = initialisedNodesMap.get( networkId );
        if (byNetwork === undefined) {
            // init new node with requested type
            const NodeClassName = GenericNode.getImplementedClassName( Blockchain[blockchain] );
            byNetwork = this.mapper.getInstance( NodeClassName ) as GenericNode;
            byNetwork.blockchain = blockchain;
            initialisedNodesMap.set( networkId, byNetwork );

            const hdkey = HDKey.fromMasterSeed(this.seed);
            byNetwork.HDRootKey = hdkey.derivePath(byNetwork.getCurrentNetworkPathString());
        }
        return byNetwork;

    }

    public createAccount(blockchain: Blockchain, networkId?: number): GenericAccount {
        this.requireImplementation(blockchain, "createAccount");
        networkId = networkId || 0;

        const existingAccounts = this.getAccounts( blockchain );

        const accountNode = this.getNode(blockchain, networkId);
        const hdkey = accountNode.HDRootKey.deriveChild( existingAccounts.length );

        const accountOptions = {
            node: accountNode,
            type: AccountType.HD,
            hd: hdkey,
        };
        const DynamicClassName = GenericAccount.getImplementedClassName( Blockchain[blockchain] );
        const account: GenericAccount = this.mapper.getInstance( DynamicClassName, accountOptions );

        this.getAccounts( blockchain ).push( account ) ;

        return account;
    }

    public requireImplementation( blockchain: Blockchain, method: string ): boolean {
        if (!Blockchain[blockchain]) {
            throw new Error(method + ": Blockchain \"" + blockchain + "\" does not have an implementation. Make sure it's indexed in the class store.");
        }
        return true;
    }

    public importAccount(account: GenericAccount) {
        if (account.type === AccountType.HD) {
            throw new Error("importAccount: you cannot import HD Wallets.");
        }
        const accountStore = this.getAccounts( account.node.blockchain );
        accountStore.push( account ) ;
        return accountStore[accountStore.length - 1];
    }

    public toJSON(): string {

        const data = {
            seed: this.seed,
            nodes: [],
            accounts: [],
        };

        // iterate through accounts
        //      for each account

        return JSON.stringify(data);
    }
}
