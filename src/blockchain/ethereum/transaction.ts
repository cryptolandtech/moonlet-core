import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
import BigNumber from 'bignumber.js';

export interface IEthereumTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    chainId: number;
    data?: Buffer;
}

export class EthereumTransaction extends GenericTransaction<IEthereumTransactionOptions> {
    public value: number;
    public chainId: number;
    public gasPrice: number;
    public gasLimit: number;

    constructor(from: string, to: string, amount: number, nonce: number, options: IEthereumTransactionOptions) {
        super(from, to, nonce, options);

        this.value = amount;
        this.chainId = options.chainId;
        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
        this.data = options.data || Buffer.from("");
    }

    public toParams() {
        return {
            nonce: this.getNumberToHex( this.nonce ) as any,
            gasPrice: this.getNumberToHex( this.gasPrice ),
            gasLimit: this.getNumberToHex( this.gasLimit ),
            to: this.to,
            value: this.getNumberToHex( this.value ),
            data: "0x" + this.data,
            chainId: this.getNumberToHex( this.chainId ),
        };
    }
}
