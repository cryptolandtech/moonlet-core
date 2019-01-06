import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { EthereumAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";
import EthereumJsTx from 'ethereumjs-tx';

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
    public defaultGasPriceInGwei: number = 30;
    public supportsCancel: boolean = true;

    /**
     * Creates an instance of ethereum account.
     * @param accountOptions
     */
    constructor(accountOptions: IaccountOptions) {
        super(accountOptions);
        this.utils = new EthereumAccountUtils();
        this.tryHdWalletSetup();
    }

    /**
     * Gets balance
     * @returns a promise of a balance
     */
    public getBalance(): Promise<BigNumber> {
        return this.node.getBalance( this.address );
    }

    /**
     * Gets nonce
     * @returns a promise of a nonce
     */
    public getNonce(): Promise<number> {
        return this.node.getNonce(this.address);
    }

    /**
     * Gweis to wei
     * @param input
     * @returns to wei
     */
    public GWeiToWei(input: number): number {
        return input * 10 ** 9; // 10^9
    }

    /**
     * Builds cancel transaction
     *
     * @remarks
     * Sending a transaction with the same nonce but with higher gas price
     * will cancel an existing non mined transaction if included into a block.
     *
     * @param nonce         - account nonce
     * @param tGasPrice     - gas price in lowest denominator ( wei )
     * @returns a new cancel transaction
     */
    public buildCancelTransaction(nonce: number, txGasPrice: number): EthereumTransaction {

        return new EthereumTransaction(
            this.address,                           // from me
            this.address,                           // to me
            0,                                      // value zero
            nonce,                                  // account nonce
            {
                gasLimit: 21000,                    // default transfer gas limit
                gasPrice: txGasPrice,               // price in wei
                chainId: this.node.network.chainId, // current network chain id
            },
        );
    }

    /**
     * Estimates transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @returns a cost estimate
     */
    public estimateTransferTransaction(to: string, amount: number, nonce: number): Promise<number> {
        return this.node.estimateGas(
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

    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param gasLimit
     * @param gasPrice
     * @returns transfer transaction
     */
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

    /**
     * Estimates transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [priceInGWei]
     * @returns transaction
     */
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

        return this.node.estimateGas( GasEstimationTransaction.toParams() );
    }

    /**
     * Builds transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param txgasLimit
     * @param priceInGWei
     * @returns transaction
     */
    public buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txgasLimit: number, priceInGWei: number): EthereumTransaction {
        return new EthereumTransaction(
            this.address,               // from me
            to,                         // to actual receiver
            amount,                     // value in wei
            nonce,                      // account nonce
            {
                gasLimit: txgasLimit,                       // max network allowed gas limit
                gasPrice: this.GWeiToWei( priceInGWei ),    // price in gwei
                chainId: this.node.network.chainId,         // current network chain id
                data: txdata,
            },
        );
    }

    /**
     * Signs transaction
     * @param transaction
     * @returns transaction
     */
    public signTransaction(transaction: EthereumTransaction): Buffer {
        const tx = new EthereumJsTx( transaction.toParams() );
        tx.sign( Buffer.from( this.privateKey.replace("0x", "") , "hex" ) );
        const serialized = tx.serialize();
        transaction.setSignedResult( serialized );
        return serialized;
    }

    /**
     * Signs message
     * @param message
     * @returns message
     */
    public signMessage(message: string): Buffer {
        throw new Error("Method not implemented.");
    }

}
