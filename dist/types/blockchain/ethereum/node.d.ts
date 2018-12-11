import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import { BigNumber } from 'bignumber.js';
import { EthereumTransaction } from "./transaction";
export declare class EthereumNode extends GenericNode {
    static readonly NETWORKS: Network[];
    constructor(network?: Network);
    getBalance(caddress: string): Promise<BigNumber>;
    getNonce(caddress: string): Promise<number>;
    estimateGas(from: string, callArguments: any): Promise<number>;
    getTransactionReceipt(transaction: EthereumTransaction): Promise<any>;
    send(transaction: EthereumTransaction): Promise<string>;
    sendRaw(rawTransaction: string): Promise<string>;
}
