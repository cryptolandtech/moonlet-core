import Mnemonic from "./utils/mnemonic";
import HDKey from "./utils/hdkey";

import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount, AccountType } from "./account";

/*
import { EthereumAccount } from "../ethereum/account";
import { EthereumNode } from "../ethereum/node";
import { ZilliqaAccount } from "../zilliqa/account";
import { ZilliqaNode } from "../zilliqa/node";
import { Network } from "./network";
*/

import DynamicClassMapper from "../class.store";

interface NodeByNetworkId {
    key: string;
    value: GenericNode;
}

export default class Wallet {

    public static fromJson(json: string) {
        //
    }

    public mnemonics: string;
    public mnemonicslang: string;
    public seed: Buffer;

    public hdroots: Map<Blockchain, any> = new Map();
    public nodes: Map<Blockchain, Map<number, GenericNode>> = new Map();
    public accounts: Map<Blockchain, GenericAccount[]> = new Map();

    private mapper: DynamicClassMapper;

    constructor(mnemonics?: string, language?: string) {
        this.mapper = new DynamicClassMapper();

        this.mnemonicslang = language || "EN";

        if (mnemonics) {
            this.mnemonics = mnemonics;
        } else {
            this.mnemonics = Mnemonic.generateMnemonic(this.mnemonicslang);
        }

        // setup seed
        this.seed = Mnemonic.mnemonicToSeed(this.mnemonics, this.mnemonicslang);
    }

    public initHdRoots() {

        for ( const name in Blockchain ) {
            // this.hdWallet = HDKey.fromMasterSeed(seed);
            // this.root = this.hdWallet.derivePath(this.hdPathString);
        }
    }

    public getAccounts(blockchain: Blockchain): GenericAccount[] {
        if (Blockchain[blockchain]) {
            let Results = this.accounts.get(blockchain);
            if (!Results) {
                Results = [];
                this.accounts.set(blockchain, Results);
            }
            return Results;
        }
        throw new Error("Blockchain " + blockchain + " has no initialised accounts.");
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
        networkId = networkId || 0;

        // validate that we actually have the requested blockchain type
        if ( Blockchain[blockchain] ) {
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
                initialisedNodesMap.set( networkId, byNetwork );

                const hdkey = HDKey.fromMasterSeed(this.seed);
                byNetwork.HDRootKey = hdkey.derivePath(byNetwork.getCurrentNetworkPathString());

                // this.root = this.hdWallet.derivePath(this.hdPathString);
                // byNetwork.setCustomNetworkUrl("test");
                // byNetwork.resetCustomNetworkUrl();

                // getCurrentNetworkPathString
            }
            return byNetwork;

        } else {
            throw new Error("Node type '" + blockchain + "' not found. Make sure it's indexed in the class store.");
        }
    }

    public createAccount(blockchain: Blockchain, networkId?: number): GenericAccount {
        networkId = networkId || 0;

        if (!Blockchain[blockchain]) {
            throw new Error("createAccount: type '" + blockchain + "' does not exist.");
        }
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

    public importAccount(account: GenericAccount) {
        //
    }

}
