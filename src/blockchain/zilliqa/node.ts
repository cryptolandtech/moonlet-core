import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "./transaction";

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
            if (error.message === "Account is not created") {
                return Promise.resolve(new BigNumber(0));
            }
            return Promise.reject( new Error(error) );
        });
    }

    public getNonce(caddress: string): Promise<number> {
        const call = this.rpcCall("GetBalance", [ caddress.replace("0x", "").toLowerCase() ], "") as Promise<any>;
        return call.then( (data) => {
            return data.nonce;
        }).catch( (error) => {
            if (error.message === "Account is not created") {
                return Promise.resolve(0);
            }
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
            return Promise.resolve( transaction.txn.TranID );
        }
    }

    public send(transaction: ZilliqaTransaction): Promise<string> {

        // cast properties as expected by Zilliqa Nodes.
        const SendObject = transaction.TXObject;
        SendObject.amount = SendObject.amount.toString();
        SendObject.gasPrice = SendObject.gasPrice.toString();
        SendObject.gasLimit = SendObject.gasLimit.toString();

        return this.sendRaw( SendObject );
    }

    public sendRaw(rawTransaction: string): Promise<string> {
        return this.rpcCall("CreateTransaction", [rawTransaction], "raw") as Promise<any>;
    }

}
