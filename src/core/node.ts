import { Network } from "./network";

export abstract class GenericNode {
    public static readonly NETWORKS: Network[];
    private network: Network;

    constructor(network: Network) {
        this.network = network;
    }

    public abstract getBalance(address: string): number;
    public abstract send(rawTransaction: Buffer): Promise<string>;

    public getNetwork(): Network {
        return this.network;
    }

    public setNetwork(network: Network) {
        this.network = network;
    }
}
