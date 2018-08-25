import { GenericNode } from "../core/generic-node";
import { EthereumAccount } from "./ethereum-account";
import networks from "./networks";

export default class EthereumNode extends GenericNode {
    static readonly Account = EthereumAccount;
    static readonly networks = networks;

    getBalance(account: EthereumAccount): number {
        throw new Error("Method not implemented.");
    }

    send(rawTransaction) {}
}