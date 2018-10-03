import { GenericNode } from "../../core/node";
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

    public getBalance(address: string): Promise<BigNumber> {
        return Promise.reject("Method not implemented.");
    }

    public getNonce(caddress: string): Promise<number> {
        return Promise.reject("Method not implemented.");
    }

    public send(rawTransaction: Buffer): Promise<string> {
        return Promise.reject("Method not implemented.");
    }

}
