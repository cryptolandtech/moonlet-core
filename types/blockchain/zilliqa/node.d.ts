/// <reference types="node" />
import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import { BigNumber } from 'bignumber.js';
export declare class ZilliqaNode extends GenericNode {
    static readonly NETWORKS: Network[];
    constructor(network?: Network);
    getBalance(address: string): Promise<BigNumber>;
    getNonce(caddress: string): Promise<number>;
    send(rawTransaction: Buffer): Promise<string>;
}
