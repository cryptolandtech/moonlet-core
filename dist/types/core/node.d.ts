/// <reference types="node" />
import { Network } from "./network";
import { BigNumber } from "bignumber.js";
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
    abstract getBalance(address: string): Promise<BigNumber>;
    abstract getNonce(address: string): Promise<number>;
    abstract send(rawTransaction: Buffer): Promise<string>;
    getCurrentNetworkPathString(): any;
    getNetwork(): Network;
    setCustomNetworkUrl(url: string): void;
    resetCustomNetworkUrl(): void;
    call(method: string, params: any, cb?: any): Promise<any> | void;
    buildCall(cmethod: string, cparams: any): any;
}
