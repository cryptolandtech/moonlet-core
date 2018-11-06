import { GenericTransaction, ITransactionOptions } from '../../core/transaction';
const BN = require( 'bn.js' );

export interface IZilliqaTransactionOptions extends ITransactionOptions {
    gasPrice: number;
    gasLimit: number;
    pubKey?: string;
    code?: Buffer;
}

export class ZilliqaTransaction extends GenericTransaction<IZilliqaTransactionOptions> {
    public version: number = 0;
    public pubKey: string;
    public code: Buffer;
    public amount: number;

    public chainId: number;
    public gasPrice: number;
    public gasLimit: number;
    public TXObject: any;

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
            version: this.version,
            nonce: this.nonce,
            to: this.to.replace("0x", ""),  // remove 0x if present
            amount: new BN( this.amount ),
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            code: null,
            data: null,
            pubKey: null,
            // chainId: this.getNumberToHex( this.chainId ),
        };
    }
}
