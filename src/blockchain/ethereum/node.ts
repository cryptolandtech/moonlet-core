import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';
import { EthereumTransaction } from "./transaction";

export class EthereumNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    /**
     * Creates an instance of ethereum node.
     * @param [network]
     */
    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    /**
     * Gets balance
     * @param caddress
     * @returns balance
     */
    public getBalance(caddress: string): Promise<BigNumber> {
        return this.rpcCall("eth_getBalance", [
            caddress,
            'latest',
        ], "BigNumber") as Promise<any>;
    }

    /**
     * Gets nonce
     * @param caddress
     * @returns nonce
     */
    public getNonce(caddress: string): Promise<number> {
        return this.rpcCall("eth_getTransactionCount", [
            caddress,
            'latest',
        ], "number") as Promise<any>;
    }

    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    public estimateGas(callArguments: any): Promise<number> {
        return this.rpcCall("eth_estimateGas", [
            callArguments,
        ], "number") as Promise<any>;
    }

    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
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

    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    public send(transaction: EthereumTransaction): Promise<string> {
        return this.rpcCall("eth_sendRawTransaction", [  "0x" + transaction.raw.toString("hex") ], "raw") as Promise<any>;
    }

    /**
     * Sends a raw transaction to the current network
     * @param data
     * @returns result
     */
    public sendRaw(data: any): Promise<string> {
        return this.rpcCall("eth_sendRawTransaction", [ data ], "raw") as Promise<any>;
    }
}
