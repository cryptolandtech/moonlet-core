import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { generateMnemonics } from "./mnemonics-generator";
import { EthereumAccount } from "../ethereum/account";
import { EthereumNode } from "../ethereum/node";
import { GenericAccount, AccountType } from "./account";

export default class Wallet {

    public static fromJson( json: string ) {
        const obj = JSON.parse(json);
        /*
        let wallet;
        if (obj.mnemonics !== "undefined") {
            wallet = new Wallet(obj.mnemonics);
        } else {
            wallet = new Wallet();
        }
        */
    }

    private mnemonics: string;
    private seed: string;
    private derivation;

    private nodes: Map<Blockchain, GenericNode> = new Map();
    private accounts: Map<Blockchain, GenericAccount[]> = new Map();

    constructor(mnemonics?: string) {
        if (mnemonics) {
            this.mnemonics = mnemonics;
        } else {
            this.mnemonics = generateMnemonics("en");
        }

        // calculate seed and setup derivation
    }

    getAccounts(blockchain?: Blockchain): GenericAccount[] {
        return this.accounts.get(blockchain);
    }

    public getNode(blockchain: Blockchain): GenericNode {
        return this.nodes.get(blockchain);
    }

    public getBlockchain(blockchain: Blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account: GenericAccount) => this.import(account)
        }
    }

    createAccount(blockchain: Blockchain): GenericAccount {
        return new EthereumAccount(new EthereumNode(EthereumNode.NETWORKS[0]), {type: AccountType.HD});
    }

    import(account: GenericAccount) {}

}
