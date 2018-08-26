import { Account } from "./account";
import { Network } from "./network";

export abstract class GenericNode {
    public static readonly Account;
    public static readonly networks;

    private network: Network;

    public abstract getBalance(account: Account): number;
    public abstract send(rawTransaction);

    public getNetwork(): Network {
        return this.network;
    }

    public setNetwork(network: Network) {
        this.network = network;
    }
}
