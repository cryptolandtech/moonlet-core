import MnemonicUtils from "./mnemonic-utils";
import { Blockchain } from "./blockchain";
import { GenericNode } from "./node";
import { GenericAccount, AccountType } from "./account";
import { EthereumAccount } from "../ethereum/account";
import { EthereumNode } from "../ethereum/node";
import { ZilliqaAccount } from "../zilliqa/account";
import { ZilliqaNode } from "../zilliqa/node";

export default class Wallet {

    public static fromJson(json: string) {
        //
    }

    public mnemonics: string;
    public mnemonicslang: string;
    private seed: string;
    private derivation: string;

    private nodes: Map<Blockchain, GenericNode> = new Map();
    private accounts: Map<Blockchain, GenericAccount[]> = new Map();

    constructor(mnemonics?: string, language?: string) {
        this.mnemonicslang = language || "EN";

        if (mnemonics) {
            this.mnemonics = mnemonics;
        } else {
            this.mnemonics = MnemonicUtils.generateMnemonic(this.mnemonicslang);
        }

        // calculate seed and setup derivation
        this.seed = "";
        this.derivation = "";
    }

    public getAccounts(blockchain: Blockchain): GenericAccount[] {
        if (blockchain) {
            const Results = this.accounts.get(blockchain);
            if (Results) {
                return Results;
            }
        }
        throw new Error("Blockchain " + blockchain + " has no initialised accounts.");
    }

    public getAccountsMap(): Map<Blockchain, GenericAccount[]> {
        return this.accounts;
    }

    public getNode(blockchain: Blockchain): GenericNode {

        if (blockchain) {
            const Result = this.nodes.get(blockchain);
            if (Result) {
                return Result;
            }
        }
        throw new Error("Node " + blockchain + " does not exist.");
    }

    public getBlockchain(blockchain: Blockchain) {
        return {
            getNode: () => this.getNode(blockchain),
            getAccounts: () => this.getAccounts(blockchain),
            createAccount: () => this.createAccount(blockchain),
            importAccount: (account: GenericAccount) => this.importAccount(account),
        };
    }

    public createAccount(blockchain: Blockchain): GenericAccount {

        let account: GenericAccount;
        switch (blockchain) {
            case Blockchain.ETHEREUM:
                account = new EthereumAccount(new EthereumNode(EthereumNode.NETWORKS[0]), { type: AccountType.HD });
                break;
            case Blockchain.ZILLIQA:
                account = new ZilliqaAccount(new ZilliqaNode(ZilliqaNode.NETWORKS[0]), { type: AccountType.HD });
                break;
            /*
                add your custom blockchain type account here
            */
            default:
                throw new Error("createAccount: type " + blockchain + " not implemented.");
        }
        return account;
    }

    public importAccount(account: GenericAccount) {
        //
    }

}
