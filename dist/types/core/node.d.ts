import { Network } from "./network";
import { BigNumber } from "bignumber.js";
import { GenericTransaction } from "./transaction";
export declare abstract class GenericNode {
    static readonly NETWORKS: Network[];
    static getImplementedClassName(name: string): string;
    customNetworkUrl: boolean;
    connected: boolean;
    NETWORKS: Network[];
    network: Network;
    blockchain: any;
    HDRootKey: any;
    callId: number;
    init(network?: Network): void;
    getCurrentNetworkPathString(): any;
    getNetwork(): Network;
    setCustomNetworkUrl(url: string): void;
    resetCustomNetworkUrl(): void;
    rpcCall(method: string, params: any, dec?: string): Promise<any>;
    buildCall(cmethod: string, cparams: any): any;
    resultDecoder(data: any, type?: string): any;
    abstract getTransactionReceipt(transaction: GenericTransaction): Promise<any>;
    abstract getBalance(address: string): Promise<BigNumber>;
    abstract getNonce(address: string): Promise<number>;
    abstract estimateGas(from: string, callArguments: any): Promise<number>;
    abstract send(callArguments: any): Promise<string>;
}
