import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { EthereumAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
    public defaultGasPriceInGwei: number = 30;

    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new EthereumAccountUtils();
        this.tryHdWalletSetup();
    }

    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance( this.address );
    }

    public getNonce(): Promise<number> {
        return this.node.getNonce(this.address);
    }

    public GWeiToWei(input: number): number {
        return input * 10 ** 9; // 10^9
    }

    public signTransaction(transaction: EthereumTransaction): boolean {
        throw new Error("Method not implemented.");
    }
    public signMessage(message: string): boolean {
        throw new Error("Method not implemented.");
    }

    public buildTransferTransaction(to: string, amount: number, nonce: number, priceInGWei?: number): EthereumTransaction {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;

        return new EthereumTransaction(
            this.address,               // from me
            to,                         // to receiver
            amount,                     // value in wei
            nonce,                      // account nonce
            {
                gasLimit: 21000,                            // default transfer gas limit
                gasPrice: this.GWeiToWei( priceInGWei ),    // price in gwei
                chainId: this.node.network.chainId,         // current network chain id
            },
        );
    }

    public buildCancelTransaction(nonce: number, priceInGWei?: number): EthereumTransaction {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;

        return new EthereumTransaction(
            this.address,               // from me
            this.address,               // to me
            0,                          // value zero
            nonce,                      // account nonce
            {
                gasLimit: 21000,                            // default transfer gas limit
                gasPrice: this.GWeiToWei( priceInGWei ),    // price in gwei
                chainId: this.node.network.chainId,         // current network chain id
            },
        );
    }

    public buildTransaction(): EthereumTransaction {
        throw new Error("Method not implemented.");
    }

    public send(transaction: EthereumTransaction): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
