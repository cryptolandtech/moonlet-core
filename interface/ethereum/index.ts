import { GenericNode } from "../core/generic-node";
import { EthereumAccount } from "./ethereum-account";
import networks from "./networks";

export default class EthereumNode extends GenericNode {
    public static readonly Account = EthereumAccount;
    public static readonly networks = networks;

    public getBalance(account: EthereumAccount): number {
        throw new Error("Method not implemented.");
    }

    public send(rawTransaction) {
        //
    }
}
