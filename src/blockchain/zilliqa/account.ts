import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { ZilliqaAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";

import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";

export class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {
    public minGasPriceInZil: number = 100;
    public minGasLimit: number = 10;

    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }

    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance(this.address);
    }

    public getNonce(): Promise<number> {
        return this.node.getNonce(this.address);
    }

    public estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number> {
        return this.node.estimateGas(
            new ZilliqaTransaction(
                this.address,               // from me
                to,                         // to actual receiver
                amount,                     // value in wei
                nonce + 1,                  // account nonce
                {
                    gasLimit: this.minGasLimit,         // max network allowed gas limit
                    gasPrice: this.minGasPriceInZil,    // price in zil
                    chainId: this.node.network.chainId, // current network chain id
                },
            ).toParams(),
        );
    }

    public buildTransferTransaction(to: string, amount: number, nonce: number, txgasLimit: number, priceInZil: number): ZilliqaTransaction {

        if (priceInZil < this.minGasPriceInZil) {
            throw Error("Minimum gas limit for a ZIL transaction is: " + this.minGasPriceInZil + " supplied gas was: " + priceInZil);
        }

        return new ZilliqaTransaction(
            this.address,               // from me
            to,                         // to receiver
            amount,                     // value in wei
            nonce + 1,                  // account nonce
            {
                gasLimit: txgasLimit,   // default transfer gas limit
                gasPrice: priceInZil,   // price in zil
                chainId: this.node.network.chainId, // current network chain id
            },
        );
    }

    public estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, priceInGWei?: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public buildTransaction(): ZilliqaTransaction {
        throw new Error("Method not implemented.");
    }

    public signTransaction(transaction: ZilliqaTransaction): Buffer {

        const TXObject = transaction.toParams( this.publicKey.replace("0x", "") );

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

    public signMessage(message: string): Buffer {
        throw new Error("Method not implemented.");
    }

}
