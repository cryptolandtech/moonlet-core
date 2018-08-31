import { ITransactionOptions } from './transaction';
export interface ITransactionOptions {};

export enum TransactionStatus {

}

export abstract class GenericTransaction<TO extends ITransactionOptions = ITransactionOptions> {
    txn: string; // transaction id from blockchain

    from: string;
    to: string;
    amount: number; // switch to BN
    nonce: number;
    options: TO;
    
    raw: ArrayBuffer;
    status: TransactionStatus; 

    constructor(from: string, to: string, amount: number, nonce: number, options: TO) {

    }
}