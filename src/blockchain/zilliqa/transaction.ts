import { GenericTransaction, ITransactionOptions } from '../../core/transaction';

export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    pubKey: string;
    code: Buffer;
}

export class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    public version: number = 0.1;
    public pubKey: string;
    public code: Buffer;
    public amount: number;

    public chainId: number;
    public gasPrice: number;
    public gasLimit: number;

    constructor(from: string, to: string, amount: number, nonce: number, options: IZilliqaTransactionOptions) {
        super(from, to, nonce, options);

        this.amount = amount;
        this.pubKey = options.pubKey;
        this.code = options.code || Buffer.from("");

        this.gasPrice = options.gasPrice;
        this.gasLimit = options.gasLimit;
    }

    public toParams() {
        return {
            nonce: this.getNumberToHex( this.nonce ) as any,
            gasPrice: this.getNumberToHex( this.gasPrice ),
            gasLimit: this.getNumberToHex( this.gasLimit ),
            to: this.to,
            amount: this.getNumberToHex( this.amount ),
            code: "0x" + this.code,
            chainId: this.getNumberToHex( this.chainId ),
        };
    }
}
