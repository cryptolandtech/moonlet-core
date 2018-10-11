import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "./transaction";
import axios from 'axios';

export class ZilliqaNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    constructor(network?: Network) {
        super();
        this.NETWORKS = networks;
        this.init(network);
    }

    public getBalance(caddress: string): Promise<BigNumber> {
        const call = this.rpcCall("GetBalance", [ caddress.replace("0x", "").toLowerCase() ], "") as Promise<any>;
        return call.then( (data) => {
            return new BigNumber( data.balance );
        }).catch( (error) => {
            return Promise.reject( new Error(error) );
        });
    }

    public getNonce(caddress: string): Promise<number> {
        const call = this.rpcCall("GetBalance", [ caddress.replace("0x", "").toLowerCase() ], "") as Promise<any>;
        return call.then( (data) => {
            return data.nonce;
        }).catch( (error) => {
            return Promise.reject( new Error(error) );
        });
    }

    public estimateGas(from: string, callArguments: any): Promise<number> {
        /*
        // not implemented by Zilliqa yet.. returns "Hello"
        return this.rpcCall("GetGasEstimate", [
            callArguments,
        ], "number") as Promise<any>;
        */
        return Promise.resolve(99);
    }

    public getTransactionReceipt(transaction: ZilliqaTransaction): Promise<any> {
        if ( transaction.receipt !== undefined ) {
            return Promise.resolve( transaction.receipt );
        } else {
            /*
            // not implemented by Zilliqa yet.. returns "Hello"
            return this.rpcCall("GetTransactionReceipt", [transaction.txn], "raw").then(data => {
                transaction.setReceiptStatus( data );
                return Promise.resolve( data );
            }).catch(error => {
                return Promise.reject( error );
            });
            */

            const data = {
                transactionHash: transaction.txn,
                transactionIndex: 0,
                blockHash: "0xDummy",
                blockNumber: 2,
                contractAddress: "0xDummy",
                cumulativeGasUsed: 2,
                gasUsed: 2,
                logs: [],
                status: "0x1",
            };
            transaction.setReceiptStatus( data );

            return Promise.resolve( data );

        }
    }

    public send(transaction: ZilliqaTransaction): Promise<string> {
        return this.sendRaw( transaction.TXObject );
    }

    public sendRaw(rawTransaction: string): Promise<string> {
        return this.rpcCall("CreateTransaction", [rawTransaction], "raw") as Promise<any>;
    }

}
