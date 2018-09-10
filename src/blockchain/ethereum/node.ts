import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";

export class EthereumNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        network = network || this.NETWORKS[0];
        this.setNetwork( network );
    }

    public getBalance(address: string): number {
        throw new Error("Method not implemented.");
    }

    public send(rawTransaction: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
