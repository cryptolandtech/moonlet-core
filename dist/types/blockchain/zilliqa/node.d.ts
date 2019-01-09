import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "./transaction";
export declare class ZilliqaNode extends GenericNode {
    static readonly NETWORKS: Network[];
    /**
     * Creates an instance of zilliqa node.
     * @param [network]
     */
    constructor(network?: Network);
    /**
     * Gets balance
     * @param caddress
     * @returns balance
     */
    getBalance(caddress: string): Promise<BigNumber>;
    /**
     * Gets nonce
     * @param caddress
     * @returns nonce
     */
    getNonce(caddress: string): Promise<number>;
    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    estimateGas(callArguments: any): Promise<number>;
    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
    getTransactionReceipt(transaction: ZilliqaTransaction): Promise<any>;
    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    send(transaction: ZilliqaTransaction): Promise<string>;
    /**
     * Sends a raw transaction to the current network
     * @param data
     * @returns result
     */
    sendRaw(data: any): Promise<string>;
}
