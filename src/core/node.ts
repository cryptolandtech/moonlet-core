import { Network } from "./network";

export abstract class GenericNode {
    public static readonly NETWORKS: Network[] = [];

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "Node";
    }

    public customNetworkUrl: boolean = false;
    public connected: boolean = false;
    public NETWORKS: Network[] = [];
    public network: Network = this.NETWORKS[0];

    public HDRootKey: any = null;

    public abstract getBalance(address: string): number;
    public abstract send(rawTransaction: Buffer): Promise<string>;

    public getCurrentNetworkPathString(): any {
        return `m/44'/` + this.network.HDCoinValue + `'/0'/0`;
    }

    public getNetwork(): Network {
        return this.network;
    }

    public setNetwork(network: Network) {
        this.customNetworkUrl = false;
        this.network = Object.assign({}, network);
    }

    public setCustomNetworkUrl(url: string) {
        this.network.url = url;
        this.customNetworkUrl = true;
    }

    public removeCustomNetworkUrl() {
        // find original url
        for ( const net in this.NETWORKS) {
            if (this.NETWORKS[net]) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }
}
