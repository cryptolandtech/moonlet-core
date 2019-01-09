import { Network } from "./network";
import { BigNumber } from "bignumber.js";
import { GenericTransaction } from "./transaction";
export declare abstract class GenericNode {
    static readonly NETWORKS: Network[];
    /**
     * Gets implemented class name
     * @param name
     * @returns class name string
     */
    static getImplementedClassName(name: string): string;
    customNetworkUrl: boolean;
    connected: boolean;
    NETWORKS: Network[];
    network: Network;
    blockchain: any;
    HDRootKey: any;
    callId: number;
    /**
     * Initialises node on specified network or default if network param is not supplied
     * @param [network]
     */
    init(network?: Network): void;
    /**
     * Gets current network path string
     * @returns current network path string
     */
    getCurrentNetworkPathString(): any;
    /**
     * Gets current network
     * @returns network
     */
    getNetwork(): Network;
    /**
     * Sets custom network url
     * @param url
     */
    setCustomNetworkUrl(url: string): void;
    /**
     * Resets custom network url
     */
    resetCustomNetworkUrl(): void;
    /**
     * Posts an RPC call to the current network
     * @param method - RPC Method name
     * @param params - RPC Method parameters
     * @param [dec]  - Result decoder type
     * @returns raw or decoded result
     */
    rpcCall(method: string, params: any, dec?: string): Promise<any>;
    /**
     * Build an RPC call
     * @param cmethod
     * @param cparams
     * @returns call
     */
    buildCall(cmethod: string, cparams: any): any;
    /**
     * Converts the received data into the requested type
     * @param data
     * @param [type]
     * @returns decoded result
     */
    resultDecoder(data: any, type?: string): any;
    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
    abstract getTransactionReceipt(transaction: GenericTransaction): Promise<any>;
    /**
     * Gets balance
     * @param address
     * @returns balance
     */
    abstract getBalance(address: string): Promise<BigNumber>;
    /**
     * Gets nonce
     * @param address
     * @returns nonce
     */
    abstract getNonce(address: string): Promise<number>;
    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    abstract estimateGas(callArguments: any): Promise<number>;
    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    abstract send(transaction: GenericTransaction): Promise<string>;
}
