import { GenericNode } from "../../core/node";
import { ZilliqaTransaction } from "./transaction";

import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';

export class ZilliqaNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    public getTransactionReceipt(transaction: ZilliqaTransaction): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public getBalance(address: string): Promise<BigNumber> {
        throw new Error("Method not implemented.");
    }

    public getNonce(caddress: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public estimateGas(from: string, callArguments: any): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public send(rawTransaction: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
