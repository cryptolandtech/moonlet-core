/// <reference types="node" />
import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import { BigNumber } from 'bignumber.js';
export declare class EthereumNode extends GenericNode {
    static readonly NETWORKS: Network[];
    constructor(network?: Network);
    getBalance(caddress: string): Promise<BigNumber>;
    getNonce(caddress: string): Promise<number>;
    send(rawTransaction: Buffer): Promise<string>;
}
