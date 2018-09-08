import { GenericNode } from "../core/node";
import { Network } from "../core/network";
import networks from "./networks";

export class ZilliqaNode extends GenericNode {
    public static readonly NETWORKS: Network[] = networks;

    public getBalance(address: string): number {
        throw new Error("Method not implemented.");
    }

    public send(rawTransaction: Buffer): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
