import { Network } from "./network";
import { BigNumber } from "bignumber.js";
import axios from 'axios';
import { GenericTransaction } from "./transaction";

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
    public blockchain: any;
    public HDRootKey: any = null;
    public callId: number = 0;

    public init(network?: Network) {
        network = network || this.NETWORKS[0];
        this.customNetworkUrl = false;
        this.blockchain = network.blockchain;
        this.network = Object.assign({}, network);
    }

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

    public rpcCall( method: string, params: any, dec?: string ): Promise<any> {

        const callData = this.buildCall(method, params);
        const callOptions = {};

        const action = axios.post( this.network.url, callData, callOptions );
        // console.log( "CallData: ", callData );
        return action.then( (data) => {
            // console.log( "return result:", data );
            if ( data.data.result !== undefined ) {
                return this.resultDecoder( data.data.result, dec );
            } else {
                return Promise.reject( data.data.error.message );
            }
        }).catch( (error) => {
            return Promise.reject( new Error(error) );
        });
    }

    public buildCall( cmethod: string, cparams: any ): any {
        return {
            jsonrpc: '2.0',
            method: cmethod,
            params: cparams,
            id: ++this.callId,
        };
    }

    public resultDecoder( data: any, type?: string ): any {
        if (type === "raw" || type === undefined || type === "" || type === null ) {
            return data;

        } else if (type === "BigNumber" ) {
            return new BigNumber( data );

        } else if (type === "number" ) {
            return parseInt(data, 16); // radix js default = 16

        } else if (type === "Buffer" ) {
            return Buffer.from(data);

        }
        throw new Error("type: [" + type + "] not implemented" );
    }

    public abstract getTransactionReceipt(transaction: GenericTransaction): Promise<any>;
    public abstract getBalance(address: string): Promise<BigNumber>;
    public abstract getNonce(address: string): Promise<number>;
    public abstract estimateGas(from: string, callArguments: any): Promise<number>;
    public abstract send(callArguments: any): Promise<string>;

}
