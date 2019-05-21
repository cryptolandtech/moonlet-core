import { GenericNode } from "../../core/node";
import { Network } from "../../core/network";
import networks from "./networks";
import { BigNumber } from 'bignumber.js';
import { ZilliqaTransaction } from "./transaction";
import * as ZilliqaJsCrypto from "@zilliqa-js/crypto/dist/util";

import { fromBech32Address, toBech32Address } from "@zilliqa-js/crypto/dist/bech32"

export class ZilliqaNode extends GenericNode {

    public static readonly NETWORKS: Network[] = networks;

    /**
     * Creates an instance of zilliqa node.
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
        const call = this.rpcCall("GetBalance", [ fromBech32Address(caddress).replace("0x", "").toLowerCase() ], "") as Promise<any>;
        return call.then( (data) => {
            return new BigNumber( data.balance );
        }).catch( (error) => {
            if (error.message === "Account is not created") {
                return Promise.resolve(new BigNumber(0));
            }
            return Promise.reject( new Error(error) );
        });
    }

    /**
     * Gets nonce
     * @param caddress
     * @returns nonce
     */
    public getNonce(caddress: string): Promise<number> {
        const call = this.rpcCall("GetBalance", [ fromBech32Address(caddress).replace("0x", "").toLowerCase() ], "") as Promise<any>;
        return call.then( (data) => {
            return data.nonce;
        }).catch( (error) => {
            if (error.message === "Account is not created") {
                return Promise.resolve(0);
            }
            return Promise.reject( new Error(error) );
        });
    }

    /**
     * Estimates gas
     * @param callArguments
     * @returns gas estimate
     */
    public estimateGas(callArguments: any): Promise<number> {
        throw new Error("Method not implemented.");
        /*
        // https://github.com/Zilliqa/Zilliqa/blob/db0 0328e78364c5ae6049f483d8f5bc696027d79/src/libServer/Server.cpp#L580
        // not implemented yet.. returns "Hello"
        return this.rpcCall("GetGasEstimate", [
            callArguments,
        ], "number") as Promise<any>;
        */
    }

    /**
     * Gets transaction receipt
     * @param transaction
     * @returns transaction receipt
     */
    public getTransactionReceipt(transaction: ZilliqaTransaction): Promise<any> {
        if (transaction.id) {
            return this.rpcCall("GetTransaction", [ transaction.id.replace("0x", "").toLowerCase() ], "").then(data => {
                data.toAddr = toBech32Address(data.toAddr);
                return data;
            }) as Promise<any>;
        } else {
            return Promise.reject('No transaction id available.');
        }
    }

    /**
     * Sends a transaction to the current network
     * @param transaction
     * @returns result
     */
    public send(transaction: ZilliqaTransaction): Promise<string> {

        // cast properties as expected by Zilliqa Nodes.
        const SendObject = transaction.TXObject;
        SendObject.amount = SendObject.amount.toString();
        SendObject.gasPrice = SendObject.gasPrice.toString();
        SendObject.gasLimit = SendObject.gasLimit.toString();

        // remove once core accepts 0x
        SendObject.toAddr = ZilliqaJsCrypto.toChecksumAddress( SendObject.toAddr ).replace("0x", "");
        
        return this.sendRaw(SendObject);
    }

    /**
     * Sends a raw transaction to the current network
     * @param data
     * @returns result
     */
    public sendRaw(data: any): Promise<string> {
        return this.rpcCall("CreateTransaction", [data], "raw") as Promise<any>;
    }
}
