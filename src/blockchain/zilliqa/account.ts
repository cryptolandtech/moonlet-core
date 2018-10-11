import { GenericAccount, IaccountOptions } from "../../core/account";
import { ZilliqaTransaction, IZilliqaTransactionOptions } from "./transaction";
import { ZilliqaAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";
import { util as OfficialUtil } from 'zilliqa-js';

export class ZilliqaAccount extends GenericAccount<ZilliqaTransaction, IZilliqaTransactionOptions> {
    public defaultGasPriceInZil: number = 10;

    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new ZilliqaAccountUtils();
        this.tryHdWalletSetup();
    }

    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance( this.address );
    }

    public getNonce(): Promise<number> {
        return this.node.getNonce( this.address );
    }

    public estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number> {
        return this.node.estimateGas( this.address,
            new ZilliqaTransaction(
                this.address,               // from me
                to,                         // to actual receiver
                amount,                     // value in wei
                nonce,                      // account nonce
                {
                    gasLimit: 10,                           // max network allowed gas limit
                    gasPrice: this.defaultGasPriceInZil,    // price in zil
                },
            ).toParams(),
        );
    }

    public buildTransferTransaction(to: string, amount: number, nonce: number, priceInZil?: number): ZilliqaTransaction {

        return new ZilliqaTransaction(
            this.address,               // from me
            to,                         // to receiver
            amount,                     // value in wei
            nonce + 1,                  // account nonce
            {
                gasLimit: 10,           // default transfer gas limit
                gasPrice: priceInZil,   // price in gwei
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
        const tx = OfficialUtil.createTransactionJson( this.privateKey.substr(2), transaction.toParams() );
        const serialized = Buffer.from( JSON.stringify(tx) );
        transaction.TXObject = tx;
        transaction.setSignedResult( serialized );
        return serialized;
    }

    public signMessage(message: string): Buffer {
        throw new Error("Method not implemented.");
    }

}
