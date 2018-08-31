import { GenericNode } from "../core/node";
import { Network } from "../core/network";
import networks from "./networks";

export class EthereumNode extends GenericNode {
    static readonly NETWORKS: Network[] = networks;

    getBalance(address: string): number {
        throw new Error("Method not implemented.");
    }

    send(rawTransaction) {}
}