import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { ZilliqaAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";

import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";

export class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {

    /**
     * Creates an instance of zilliqa account.
     * @param accountOptions
     */
    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }

    /**
     * Gets balance
     * @returns a promise of a balance
     */
    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance(this.address);
    }

    /**
     * Gets nonce
     * @returns a promise of a nonce
     */
    public getNonce(): Promise<number> {
        return this.node.getNonce(this.address);
    }

    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasLimit
     * @param txGasPrice
     * @returns transfer transaction
     */
    public buildTransferTransaction(to: string, amount: string, nonce: number, txGasPrice: number, txGasLimit: number): ZilliqaTransaction {
        return this.buildTransaction(to, amount, nonce, Buffer.from(""), txGasPrice, txGasLimit);
    }

    /**
     * Estimates transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [txGasPrice]
     * @param [txGasLimit]
     * @returns a cost estimate
     */
    public estimateTransaction(to: string, amount: string, nonce: number, txdata: Buffer, txGasPrice?: number, txGasLimit?: number): Promise<number> {

        throw new Error("Method not implemented.");
        /*
        can be used once GetGasEstimate is implemented in the LookupNode
        // https://github.com/Zilliqa/Zilliqa/blob/db00328e78364c5ae6049f483d8f5bc696027d79/src/libServer/Server.cpp#L580
        // not implemented yet.. returns "Hello"

        return this.node.estimateGas(
            this.buildTransaction(to, amount, nonce, txdata, txGasPrice, txGasLimit).toParams()
        );
        */
    }

    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param txGasPrice
     * @param txGasLimit
     * @returns transaction
     */
    public buildTransaction(to: string, amount: string, nonce: number, txdata: Buffer, txGasPrice: number = 0, txGasLimit: number = 8000000): ZilliqaTransaction {
        return new ZilliqaTransaction(
            this.address,               // from me
            to,                         // to actual receiver
            amount,                     // value in qa
            nonce,                      // account nonce
            {
                gasPrice: txGasPrice,   // price in qa
                gasLimit: txGasLimit,   // max network allowed gas limit
                chainId: this.node.network.chainId, // current network chain id
                data: txdata,
            },
        );
    }

    /**
     * Signs transaction
     * @param transaction
     * @returns serialized data
     */
    public signTransaction(transaction: ZilliqaTransaction): Buffer {

        const TXObject = transaction.toParams( this.publicKey.replace("0x", "") );

        // the address should be checksummed and we need to lowercase it for signing
        // add 0x back to signing payload
        TXObject.toAddr = TXObject.toAddr.toLowerCase();

        const bytes = transaction.getProtoEncodedTx(TXObject);
        const signature = ZilliqaJsCrypto.sign(
            bytes,
            this.privateKey.replace("0x", ""),
            this.publicKey.replace("0x", ""),
        );

        TXObject.signature = signature;

        const serialized = Buffer.from(JSON.stringify(TXObject));
        transaction.TXObject = TXObject;
        transaction.setSignedResult(serialized);
        return serialized;
    }

    /**
     * not supported
     */
    public buildCancelTransaction(nonce: number, txGasPrice: number): ZilliqaTransaction | false {
        return false;
    }
}
