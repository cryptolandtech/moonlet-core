import { Account } from "../core/account";
import { Blockchain } from "../core/blockchain";

export class EthereumAccount extends Account {
    constructor(...args) {
        super(...args);

        this.blockchain = Blockchain.ETHEREUM;
    }

    signTransaction() {}
    signMessage() {}
}