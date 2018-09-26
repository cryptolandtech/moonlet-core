import { Network } from "./network";
import HDKey from "./utils/hdkey";
import { Blockchain } from "./blockchain";

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
    public blockchain: Blockchain;
    public HDRootKey: any = null;

    public abstract getBalance(address: string): number;
    public abstract send(rawTransaction: Buffer): Promise<string>;

    public getCurrentNetworkPathString(): any {
        return `m/44'/` + this.network.HDCoinValue + `'/0'/0`;
    }

    public getNetwork(): Network {
        return this.network;
    }

    public setCustomNetworkUrl(url: string) {
        this.network.url = url;
        this.customNetworkUrl = true;
    }

    public resetCustomNetworkUrl() {
        for ( const net in this.NETWORKS) {
            if (this.network.chainId === this.NETWORKS[net].chainId) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }

}
