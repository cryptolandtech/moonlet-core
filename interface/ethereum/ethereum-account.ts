import { Account } from "../core/account";
import { Blockchain } from "../core/blockchain";
import GenericTransaction from "../core/transaction";

export class EthereumAccount extends Account {
    constructor(...args) {
        super(...args);

        this.blockchain = Blockchain.ETHEREUM;
    }

    public signTransaction(txn: GenericTransaction): string {
        // uses this.privateKey
        return "";
    }

    public signMessage(data: string): string {
        //
        return data;
    }
}
