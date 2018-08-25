import { Network } from "./network";
import { Account } from "./account";

export abstract class GenericNode {
    static readonly Account;
    static readonly networks;

    private network: Network;

    abstract getBalance(account: Account): number;
    abstract send(rawTransaction);

    getNetwork(): Network {
        return this.network;
    }

    setNetwork(network: Network) {
        this.network = network;
    }
}