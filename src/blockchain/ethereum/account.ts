import { GenericAccount, IaccountOptions } from "../../core/account";
import { EthereumTransaction, IEthereumTransactionOptions } from "./transaction";
import { EthereumAccountUtils } from "./account-utils";
import { BigNumber } from "bignumber.js";
import EthereumJsTx from 'ethereumjs-tx';

export class EthereumAccount extends GenericAccount<EthereumTransaction, IEthereumTransactionOptions> {
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
     * Builds cancel transaction
     *
     * @remarks
     * Sending a transaction with the same nonce but with higher gas price
     * will cancel an existing non mined transaction if included into a block.
     *
     * @param nonce         - account nonce
     * @param txGasPrice     - gas price in lowest denominator ( wei )
     * @returns a new cancel transaction
     */
    public buildCancelTransaction(nonce: number, txGasPrice: number): EthereumTransaction {
        return this.buildTransferTransaction(this.address, 0, nonce, txGasPrice, 21000);
    }

    /**
     * Builds transfer transaction
     * @param to
     * @param amount
     * @param nonce
     * @param txGasPrice
     * @param txGasLimit
     * @returns transfer transaction
     */
    public buildTransferTransaction(to: string, amount: number, nonce: number, txGasPrice: number, txGasLimit: number): EthereumTransaction {
        return this.buildTransaction(to, amount, nonce, Buffer.from(""), txGasPrice, txGasLimit);
    }

    /**
     * Params ethereum account
     * @param to
     * @param amount
     * @param nonce
     * @param txdata
     * @param [txGasPrice]
     * @param [txGasLimit]
     * @returns a cost estimate
     */
    public estimateTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txGasPrice: number = 1, txGasLimit: number = 6700000): Promise<number> {
        return this.node.estimateGas( 
            this.buildTransaction(to, amount, nonce, txdata, txGasPrice, txGasLimit).toParams() 
        );
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
    public buildTransaction(to: string, amount: number, nonce: number, txdata: Buffer, txGasPrice: number = 1, txGasLimit: number = 6700000): EthereumTransaction {
        return new EthereumTransaction(
            this.address,               // from me
            to,                         // to actual receiver
            amount,                     // value in wei
            nonce,                      // account nonce
            {
                gasPrice: txGasPrice,   // price in gwei
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
    public signTransaction(transaction: EthereumTransaction): Buffer {
        const tx = new EthereumJsTx( transaction.toParams() );
        tx.sign( Buffer.from( this.privateKey.replace("0x", "") , "hex" ) );
        const serialized = tx.serialize();
        transaction.setSignedResult( serialized );
        return serialized;
    }

}
