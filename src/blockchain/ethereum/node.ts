import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';

export class EthereumNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    public getBalance(caddress: string): Promise<BigNumber> {
        return this.rpcCall("eth_getBalance", [
            caddress,
            'latest',
        ], "BigNumber") as Promise<any>;
    }

    public async getNonce(caddress: string): Promise<number> {
        return this.rpcCall("eth_getTransactionCount", [
            caddress,
            'pending',
        ], "number") as Promise<any>;
    }

    public send(rawTransaction: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
