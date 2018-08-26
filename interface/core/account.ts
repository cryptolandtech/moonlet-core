import { Blockchain } from "./blockchain";
import GenericTransaction from "./transaction";

export class Account {
    public blockchain: Blockchain;
    public address: string;
    public publicKey: string;
    public privateKey: string;

    constructor(privateKey?: string, address?: string) {
        if (!(privateKey || address)) {
            throw new Error("Private key or address is mandatory.");
        }

        this.privateKey = privateKey;
        this.address = address;
    }

    /*
    call node and get transaction count for current address
    - most cases will not provide a callback and just wait for the result.
    */
    public async getNonce(callback: () => {}): Promise<number> {
        if (callback) {
            // pass request and callback to web3 library
        } else {
            // await and return result
            return 0;
        }
    }

    public buildTransaction(txn: any): GenericTransaction {
        const Transaction = new GenericTransaction();
        return Transaction;
    }

    public signTransaction(txn: GenericTransaction): string {
        return "";
    }

    public signMessage(object): string {
        return "";
    }
}
