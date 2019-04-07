import { TransactionStatus } from './transaction';
import { Blockchain } from './blockchain';
export enum WalletEventType {
    TRANSACTION_UPDATE = 'TRANSACTION_UPDATE'
}

export type WalletEventData = IWalletTransactionUpdate;

export interface IWalletTransactionUpdate {
    blockchain: Blockchain,
    address: string,
    transactionId: string,
    status: TransactionStatus
}

export class WalletEventEmitter {
    private static subscribers = [];

    static emit(type: WalletEventType, data?: WalletEventData) {
        setTimeout(() => 
            WalletEventEmitter.subscribers.map(callback => {
                if (typeof callback === 'function') {
                    callback(type, data);
                }
            })
        );
    };

    static subscribe(callback: (type: WalletEventType, data: WalletEventData) => any): () => any {
        if (typeof callback === 'function') {
            WalletEventEmitter.subscribers.push(callback);
        }

        return () => {
            WalletEventEmitter.subscribers.splice(WalletEventEmitter.subscribers.indexOf(callback), 1);
        }
    };
}