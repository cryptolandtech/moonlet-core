import { Blockchain } from "./blockchain";

export class Account {
    blockchain: Blockchain;
    address: String;
    publicKey: String;
    privateKey: String;

    constructor(privateKey?: String, address?: string) {
        if (!(privateKey || address)) {
            throw new Error("Private key or address is mandatory.");
        }

        this.privateKey = privateKey;
        this.address = address;
    }

    signTransaction() {}
    signMessage() {}
}