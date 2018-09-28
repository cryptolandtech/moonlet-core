import { Network } from "./network";
import HDKey from "./utils/hdkey";
import { Blockchain } from "./blockchain";
import BN from 'bn.js';
import axios from 'axios';

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
    public callId: number = 0;

    public init(network?: Network) {
        network = network || this.NETWORKS[0];
        this.customNetworkUrl = false;
        this.network = Object.assign({}, network);
    }

    public abstract getBalance(address: string): Promise<BN>;
    public abstract getNonce(address: string): Promise<number>;

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
        for (const net in this.NETWORKS) {
            if (this.network.chainId === this.NETWORKS[net].chainId) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }

    public call( method: string, params: any, cb?: any ): Promise<any> | void {

        const callData = this.buildCall(method, params);
        const callOptions = {};

        try {
            const action = axios.post( this.network.url, callData, callOptions );
            if (cb) {
                action.then(data => cb(null, data)).catch(error => cb(error));
            } else {
                return action;
            }
        } catch ( error ) {

            throw new Error("call:" + error);
        }
    }

    public buildCall( cmethod: string, cparams: any ): any {
        return {
            jsonrpc: '2.0',
            method: cmethod,
            params: cparams,
            id: ++this.callId,
        };
    }

}
