import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import BN from 'bn.js';

export class ZilliqaNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    public getBalance(address: string): Promise<BN> {
        throw new Error("Method not implemented.");
    }

    public getNonce(caddress: string): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public send(rawTransaction: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
