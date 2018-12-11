import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "./transaction";
export declare class ZilliqaNode extends GenericNode {
    static readonly NETWORKS: Network[];
    constructor(network?: Network);
    getBalance(caddress: string): Promise<BigNumber>;
    getNonce(caddress: string): Promise<number>;
    estimateGas(from: string, callArguments: any): Promise<number>;
    getTransactionReceipt(transaction: ZilliqaTransaction): Promise<any>;
    send(transaction: ZilliqaTransaction): Promise<string>;
    sendRaw(rawTransaction: string): Promise<string>;
}
