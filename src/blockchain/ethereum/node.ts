import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';
import { EthereumTransaction } from "./transaction";

export class EthereumNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    public getBalance(caddress: string): Promise<BigNumber> {
        return this.rpcCall("eth_getBalance", [
            caddress,
            'latest',
        ], "BigNumber") as Promise<any>;
    }

    public getNonce(caddress: string): Promise<number> {
        return this.rpcCall("eth_getTransactionCount", [
            caddress,
            'latest',
        ], "number") as Promise<any>;
    }

    public estimateGas(from: string, callArguments: any): Promise<number> {
        return this.rpcCall("eth_estimateGas", [
            callArguments,
        ], "number") as Promise<any>;
    }

    public getTransactionReceipt(transaction: EthereumTransaction): Promise<any> {
        if ( transaction.receipt !== undefined ) {
            return Promise.resolve( transaction.receipt );
        } else {
            return this.rpcCall("eth_getTransactionReceipt", [transaction.txn], "raw").then(data => {
                transaction.setReceiptStatus( data );
                return Promise.resolve( data );
            }).catch(error => {
                return Promise.reject( error );
            });
        }
    }

    public send(transaction: EthereumTransaction): Promise<string> {
        return this.sendRaw( transaction.raw.toString("hex") );
    }

    public sendRaw(rawTransaction: string): Promise<string> {
        return this.rpcCall("eth_sendRawTransaction", [rawTransaction], "raw") as Promise<any>;
    }

}
