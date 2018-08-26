import { Account } from "./account";
import { Blockchain } from "./blockchain";
import { GenericNode } from "./generic-node";
import { generateMnemonics } from "./mnemonics-generator";

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
    private accounts: Map<Blockchain, Account[]> = new Map();

    constructor(mnemonics?: string) {
        if (mnemonics) {
            this.mnemonics = mnemonics;
        } else {
            this.mnemonics = generateMnemonics("en");
        }

        // calculate seed and setup derivation
    }

    public getAccounts(blockchain: Blockchain): Account[] {
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
            importAccount: (account: Account) => this.import(account),
        };
    }

    public createAccount(blockchain: Blockchain): Account {
        // based on blockchain, instantiate the required class
        return new Account();
    }

    public import(account: Account) {
        //
    }

    public toJson() {
        return JSON.stringify(this);
    }

}
