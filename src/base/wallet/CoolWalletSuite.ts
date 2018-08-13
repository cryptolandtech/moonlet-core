export enum Blockchain {
    Ethereum = "ETHEREUM",
    Bitcoin = "BITCOIN"
}

export class Network {
    blockchain: Blockchain;
    name: String;
    url: String;
    mainNet: boolean;

    constructor(name: String, blockchain: Blockchain, url: String, mainNet: boolean = false) {
        this.name = name;
        this.blockchain = blockchain;
        this.url = url;
        this.mainNet = mainNet;
    }
}

export interface Node {
    network: Network;

    getNetwork(): Network;

    // TODO do we want to change the network once the Node is created?
    setNetwork(network: Network): void;

    getBalance(account: Account): number;

    send(from: Account, toAddress: String, amount: number, data: String): void;

    signMessage(account: Account, message: String): void;

    signTransaction(account: Account, transaction: String): void;
}

export class Account {
    name: String;    
    blockchain: Blockchain;
    address: String;
    publicKey: String;
    privateKey: String;
    constructor(name: String, blockchain: Blockchain, address: String, publicKey: String, privateKey: String) {
        this.name = name;
        this.blockchain = blockchain;
        this.address = address;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
}

export default interface Wallet {

    accounts: Set<Account>;

    getAccounts(): Map<Blockchain, Map<String, Account>>;

    getBlockchainAccounts(blockchain: Blockchain): Map<String, Account>;

    getCurrentAccount(): Account;

    setCurrentAccount(blockchain: Blockchain, address: String): Account;

    toJson(): JSON;

    import(blockchain: Blockchain, name: String, address: String, publicKey: String, privateKey: String): Account;
}

export interface WalletFactory {

    fromMnemonics(mnemonics: String): Wallet;

    fromJSON(serializedWallet: JSON): Wallet;
}

/* Dummy implementations */

export class DummyWallet implements Wallet {
    accounts: Set<Account> = new Set();

    getAccounts(): Map<Blockchain, Map<String, Account>> {
        throw new Error("Method not implemented.");
    }
    getBlockchainAccounts(blockchain: Blockchain): Map<String, Account> {
        throw new Error("Method not implemented.");
    }
    getCurrentAccount(): Account {
        throw new Error("Method not implemented.");
    }
    setCurrentAccount(blockchain: Blockchain, address: String): Account {
        throw new Error("Method not implemented.");
    }
    toJson(): JSON {
        throw new Error("Method not implemented.");
    }
    import(blockchain: Blockchain, name: String, address: String, publicKey: String, privateKey: String): Account {
        throw new Error("Method not implemented.");
    }

}


export class DummyWalletFactory implements WalletFactory {

    fromMnemonics(mnemonics: String): Wallet {
        throw new Error("Method not implemented.");
    }

    fromJSON(serializedWallet: JSON): Wallet {
        throw new Error("Method not implemented.");
    }
}

export class DummyNode implements Node {
    network: Network;
    constructor(network: Network) {
        this.network = network;
    }
    getNetwork(): Network {
        throw new Error("Method not implemented.");
    }
    setNetwork(network: Network): void {
        throw new Error("Method not implemented.");
    }
    getBalance(account: Account): number {
        throw new Error("Method not implemented.");
    }
    send(from: Account, toAddress: String, amount: number, data: String): void {
        throw new Error("Method not implemented.");
    }
    signMessage(account: Account, message: String): void {
        throw new Error("Method not implemented.");
    }
    signTransaction(account: Account, transaction: String): void {
        throw new Error("Method not implemented.");
    }
}
