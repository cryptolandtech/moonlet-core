import { Network } from "./network";
import { BigNumber } from "bignumber.js";
import axios from 'axios';
import { GenericTransaction } from "./transaction";

export abstract class GenericNode {
    public static readonly NETWORKS: Network[] = [];

    /**
     * Gets implemented class name
     * @param name
     * @returns class name string
     */
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

    /**
     * Initialises node on specified network or default if network param is not supplied
     * @param [network]
     */
    public init(network?: Network) {
        network = network || this.NETWORKS[0];
        this.customNetworkUrl = false;
        this.blockchain = network.blockchain;
        this.network = Object.assign({}, network);
    }

    /**
     * Gets current network path string
     * @returns current network path string
     */
    public getCurrentNetworkPathString(): any {
        return `m/44'/` + this.network.HDCoinValue + `'/0'/0`;
    }

    /**
     * Gets current network
     * @returns network
     */
    public getNetwork(): Network {
        return this.network;
    }

    /**
     * Sets custom network url
     * @param url
     */
    public setCustomNetworkUrl(url: string) {
        this.network.url = url;
        this.customNetworkUrl = true;
    }

    /**
     * Resets custom network url
     */
    public resetCustomNetworkUrl() {
        for (const net in this.NETWORKS) {
            if (this.network.chainId === this.NETWORKS[net].chainId) {
                this.network.url = this.NETWORKS[net].url;
                this.customNetworkUrl = false;
            }
        }
    }

    public rpcCallRaw( method: string, params: any): Promise<any> {
        const callData = this.buildCall(method, params);
        const callOptions = {};
        const action = axios.post( this.network.url, callData, callOptions );
        //console.log( "CallData: ", callData );
        return action.then( (data) => {
            //console.log( "return result:", data );
            Promise.resolve(data);
        });
    }

    /**
     * Posts an RPC call to the current network
     * @param method - RPC Method name
     * @param params - RPC Method parameters
     * @param [dec]  - Result decoder type
     * @returns raw or decoded result
     */
    public rpcCall( method: string, params: any, dec?: string ): Promise<any> {
        return this.rpcCallRaw(method, params).then( (data) => {
            //console.log( "return result:", data );
            if ( data.data.result !== undefined ) {
                return this.resultDecoder( data.data.result, dec );
            } else {
                return Promise.reject( data.data.error.message );
            }
        }).catch( (error) => {
            // console.log( "return error:", method, params, error );
            return Promise.reject( new Error(error) );
        });
    }

    /**
     * Build an RPC call
     * @param cmethod
     * @param cparams
     * @returns call
     */
    public buildCall( cmethod: string, cparams: any ): any {
        return {
            jsonrpc: '2.0',
            method: cmethod,
            params: cparams,
            id: ++this.callId,
        };
    }

    /**
     * Converts the received data into the requested type
     * @param data
     * @param [type]
     * @returns decoded result
     */
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

    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
    public abstract getTransactionReceipt(transaction: GenericTransaction): Promise<any>;

    /**
     * Gets balance
     * @param address
     * @returns balance
     */
    public abstract getBalance(address: string): Promise<BigNumber>;

    /**
     * Gets nonce
     * @param address
     * @returns nonce
     */
    public abstract getNonce(address: string): Promise<number>;

    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    public abstract estimateGas(callArguments: any): Promise<number>;

    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    public abstract send(transaction: GenericTransaction): Promise<string>;

}
