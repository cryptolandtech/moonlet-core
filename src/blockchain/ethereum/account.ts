import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { EthereumAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";
import EthereumTx from 'ethereumjs-tx';

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
    public defaultGasPriceInGwei: number = 30;
    public supportsCancel: boolean = true;

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

    public estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number> {
        return this.node.estimateGas( this.address,
            new EthereumTransaction(
                this.address,               // from me
                to,                         // to actual receiver
                amount,                     // value in wei
                nonce,                      // account nonce
                {
                    gasLimit: 6700000,                                      // max network allowed gas limit
                    gasPrice: this.GWeiToWei( this.defaultGasPriceInGwei ), // price in gwei
                    chainId: this.node.network.chainId,                     // current network chain id
                },
            ).toParams(),
        );
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

    public estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, priceInGWei?: number): Promise<number> {
        priceInGWei = priceInGWei || this.defaultGasPriceInGwei;

        const GasEstimationTransaction = new EthereumTransaction(
            this.address,               // from me
            to,                         // to actual receiver
            amount,                     // value in wei
            nonce,                      // account nonce
            {
                gasLimit: 6700000,                          // max network allowed gas limit
                gasPrice: this.GWeiToWei( priceInGWei ),    // price in gwei
                chainId: this.node.network.chainId,         // current network chain id
                data: txdata,
            },
        );

        return this.node.estimateGas( this.address, GasEstimationTransaction.toParams() );
    }

    public buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txgasLimit: number, priceInGWei: number): EthereumTransaction {
        return new EthereumTransaction(
            this.address,               // from me
            to,                         // to actual receiver
            amount,                     // value in wei
            nonce,                      // account nonce
            {
                gasLimit: txgasLimit,                          // max network allowed gas limit
                gasPrice: this.GWeiToWei( priceInGWei ),    // price in gwei
                chainId: this.node.network.chainId,         // current network chain id
                data: txdata,
            },
        );
    }

    public signTransaction(transaction: EthereumTransaction): Buffer {
        const tx = new EthereumTx( transaction.toParams() );
        tx.sign( Buffer.from( this.privateKey.substr( 2 ) , "hex" ) );
        const serialized = tx.serialize();
        transaction.setSignedResult( serialized );
        return serialized;
    }

    public signMessage(message: string): Buffer {
        throw new Error("Method not implemented.");
    }

}
