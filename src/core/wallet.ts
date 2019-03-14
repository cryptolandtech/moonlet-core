import Mnemonic from "./utils/mnemonic";
import HDKey from "./utils/hdkey";
import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount, AccountType } from "./account";
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
    public static fromJson(json: string, blockchains?: IBlockchainImplementation[]) {

        const data: WalletExport = JSON.parse( json );
        const wallet: Wallet = new Wallet( data.mnemonics, data.mnemonicslang );

        if (Array.isArray(blockchains)) {
            blockchains.map(blockchain => wallet.loadBlockchain(blockchain));
        }

        // replace mnemonic data with saved values
        wallet.mnemonics = data.mnemonics;
        wallet.mnemonicslang = data.mnemonicslang;

        // set seed buffer
        wallet.seed = Buffer.from( data.seed, "hex" );

        // set current networks
        wallet.currentNetwork = data.currentNetworks;

        // import accounts.
        for ( const bcType in data.blockchains ) {
            if (Blockchain[ data.blockchains[bcType] ] ) {

                const currentBlockchainEnum = Blockchain[ data.blockchains[bcType] ];
                const currentBlockchain = Blockchain[currentBlockchainEnum];

                const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchain[currentBlockchain] );
                const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchain[currentBlockchain] );

                const bc = wallet.getBlockchain(Blockchain[currentBlockchainEnum]);
                const currentNetworkId = bc.getCurrentNetwork();
                const currentBlockchainAccounts = data.accounts[currentBlockchainEnum];

                for ( let i = 0; i < currentBlockchainAccounts.length; i++) {

                    const account = currentBlockchainAccounts[i];
                    const accountNetworkId = account.node.network.network_id;
                    let currentNode = bc.getNode();

                    let importedAccount;

                    if ( account.type === AccountType.HD) {

                        // create account using internal hd key, no need to import anything.
                        importedAccount = wallet.createAccount(currentBlockchain, accountNetworkId);

                    } else if ( account.type === AccountType.LOOSE) {

                        if (accountNetworkId !== currentNetworkId) {
                            const CustomNode: GenericNode = wallet.mapper.getInstance( NodeClassTypeString );
                            CustomNode.init( CustomNode.NETWORKS[ accountNetworkId ] );
                            currentNode = CustomNode;
                        }

                        // Loose account setup
                        importedAccount = wallet.importAccount(
                            wallet.mapper.getInstance( AccountClassTypeString, {
                                node: currentNode,
                                type: AccountType.LOOSE,
                                privateKey: account.privateKey,
                            }),
                        );

                    } else if ( account.type === AccountType.HARDWARE) {

                        if (accountNetworkId !== currentNetworkId) {
                            const CustomNode: GenericNode = wallet.mapper.getInstance( NodeClassTypeString );
                            CustomNode.init( CustomNode.NETWORKS[ accountNetworkId ] );
                            currentNode = CustomNode;
                        }

                        // HW account setup
                        importedAccount = wallet.importAccount(
                            wallet.mapper.getInstance( AccountClassTypeString, {
                                node: currentNode,
                                type: AccountType.HARDWARE,
                                address: account.address,
                            }),
                        );

                    }

                    // set custom url on node if found
                    if ( account.node.customNetworkUrl ) {
                        importedAccount.node.setCustomNetworkUrl( account.node.network.url );
                    }

                    // import transactions
                    importedAccount.transactions = account.transactions;

                }
            }
        }

        return wallet;
    }

    public mnemonics: string;
    public mnemonicslang: string;
    public seed: Buffer;

    public nodes: Map<Blockchain, Map<number, GenericNode>> = new Map();
    public accounts: Map<Blockchain, GenericAccount[]> = new Map();
    public currentNetwork: any = {};

    private mapper: DynamicClassMapper;

    /**
     * Creates an instance of wallet.
     * @param [mnemonics]
     * @param [language]
     * @param [mnemonicPassword]
     */
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

    /**
     * Gets class mapper
     * @returns class mapper
     */
    public getClassMapper(): DynamicClassMapper {
        return this.mapper;
    }

    /**
     * Loads blockchain implementation
     * @param blockchainImplementation
     */
    public loadBlockchain(blockchainImplementation: IBlockchainImplementation) {
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
    public getAccounts(blockchain: Blockchain, reference: boolean = true, filter: boolean = false, networkId?: number): GenericAccount[] {
        this.requireImplementation(blockchain, "getAccounts");
        networkId = networkId || this.getCurrentNetwork(blockchain);

        let Results = this.accounts.get(blockchain);
        if (!Results) {
            Results = [];
            this.accounts.set(blockchain, Results);
        }

        if (reference) {
            return Results;
        } else {

            // filter by network if specified
            let ReturnData = [];
            if (filter === false) {
                ReturnData = Results;
            } else {
                for ( const r in Results) {
                    if (Results[r]) {
                        if ( Results[r].node.network.network_id === networkId) {
                            ReturnData.push( Results[r] );
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
    public getAccountsMap(): Map<Blockchain, GenericAccount[]> {
        return this.accounts;
    }

    /**
     * Gets blockchain
     * @param blockchain
     * @returns an object containing all methods required to use this implementation
     */
    public getBlockchain(blockchain: Blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: (networkId) => this.getAccounts(blockchain, false, true, networkId),
            getAllAccounts: () => this.getAccounts(blockchain, false, false),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account: GenericAccount) => this.importAccount(account),
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
    public getNetworks(blockchain: Blockchain) {
        return this.getNode(blockchain, this.currentNetwork[blockchain] ).NETWORKS;
    }

    /**
     * Gets current network for specified blockchain
     * @param blockchain
     * @returns current network
     */
    public getCurrentNetwork(blockchain: Blockchain): number {
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
    public switchNetwork(blockchain: Blockchain, networkId: number) {
        this.currentNetwork[blockchain] = networkId;
        return this.getNode(blockchain, networkId );
    }

    /**
     * Gets existing node or initialises a new one for specified blockchain
     * @param blockchain
     * @param [networkId]
     * @returns node
     */
    public getNode(blockchain: Blockchain, networkId?: number) {
        this.requireImplementation(blockchain, "getNode");
        networkId = networkId || this.getCurrentNetwork(blockchain);

        let initialisedNodesMap = this.nodes.get( blockchain );
        if (initialisedNodesMap === undefined) {
            initialisedNodesMap = new Map();
            this.nodes.set( blockchain, initialisedNodesMap );
        }

        let byNetwork = initialisedNodesMap.get( networkId );
        if (byNetwork === undefined) {
            // init new node with requested type
            const NodeClassName = GenericNode.getImplementedClassName( blockchain );
            byNetwork = this.mapper.getInstance( NodeClassName ) as GenericNode;
            byNetwork.init( byNetwork.NETWORKS[ networkId ] );
            initialisedNodesMap.set( networkId, byNetwork );

            const hdkey = HDKey.fromMasterSeed(this.seed);
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
    public createAccount(blockchain: Blockchain, networkId?: number): GenericAccount {
        this.requireImplementation(blockchain, "createAccount");
        networkId = networkId || this.getCurrentNetwork(blockchain);

        const existingAccounts = this.getAccounts( blockchain, false, true, networkId);

        const accountNode = this.getNode(blockchain, networkId);
        const hdkey = accountNode.HDRootKey.deriveChild( existingAccounts.length );

        const accountOptions = {
            node: accountNode,
            type: AccountType.HD,
            hd: hdkey,
        };
        const DynamicClassName = GenericAccount.getImplementedClassName( blockchain );
        const account: GenericAccount = this.mapper.getInstance( DynamicClassName, accountOptions );

        this.getAccounts( blockchain ).push( account ) ;

        return account;
    }

    /**
     * Requires implementation
     * @param blockchain
     * @param method
     * @returns true if implementation is found, otherwise false
     */
    public requireImplementation( blockchain: Blockchain, method: string ): boolean {
        if (!Blockchain[blockchain]) {
            throw new Error(method + ": Blockchain \"" + blockchain + "\" does not have an implementation. Make sure it's indexed in the class store.");
        }
        return true;
    }

    /**
     * Imports account
     * @param account
     * @returns account
     */
    public importAccount(account: GenericAccount): GenericAccount {
        if (account.type === AccountType.HD) {
            throw new Error("importAccount: you cannot import HD Wallets.");
        }
        const accountStore = this.getAccounts( account.node.blockchain );

        // generate address for loose imports
        if (account.type === AccountType.LOOSE) {
            account.publicKey = account.utils.bufferToHex( account.utils.privateToPublic( Buffer.from( account.privateKey, "hex" ) ) );
            account.address = account.utils.toChecksumAddress( account.utils.privateToAddress( Buffer.from( account.privateKey, "hex" ) ).toString("hex") );
        }
        accountStore.push( account ) ;
        return accountStore[accountStore.length - 1];
    }

    /**
     * Serialises wallet and returns a json string
     * @returns json
     */
    public toJSON(): string {

        const data: WalletExport = {
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

        for ( const bcType in Blockchain ) {
            if (Blockchain[bcType]) {

                const currentBlockchainEnum = Blockchain[ Blockchain[bcType] ];
                // save implemented blockchains
                data.blockchains.push( Blockchain[bcType] );

                // save current networks
                data.currentNetworks[bcType] = this.getCurrentNetwork(currentBlockchainEnum);

                data.accounts[bcType] = [];
                // export accounts for each blockchain
                const accounts = this.getAccounts( currentBlockchainEnum, false, false );
                for ( let i = 0; i < accounts.length; i++) {
                    data.accounts[bcType].push( accounts[i] );
                }

                const nodes = this.nodes.get( Blockchain[ Blockchain[bcType]] );
                const networks = this.getNode( currentBlockchainEnum ).NETWORKS;

                data.nodes[bcType] = [];
                for ( let i = 0; i < networks.length; i++) {
                    if (networks[i] && nodes) {
                        data.nodes[bcType][networks[i].network_id] = nodes.get( networks[i].network_id );
                    } else {
                        data.nodes[bcType][networks[i].network_id] = null;
                    }
                }
            }
        }
        return JSON.stringify(data);
    }
}
