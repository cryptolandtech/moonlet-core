import { Network } from "./network";

export abstract class GenericNode{
    static readonly NETWORKS: Network[];
    private network: Network;

    constructor(network: Network) {
        this.network = network;
    }

    abstract getBalance(address: string): number;
    abstract send(rawTransaction);

    getNetwork(): Network {
        return this.network;
    }

    setNetwork(network: Network) {
        this.network = network;
    }
}