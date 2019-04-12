import { GenericTransaction, TransactionStatus } from './transaction';

import { GenericAccount } from "./account";

export class TransactionTracker {
    private static timeoutRef;
    private static readonly TIME_INTERVAL = 30000; // 30 sec
    private static transactions: {account: GenericAccount, transaction: GenericTransaction}[] = []; 

    static register(account: GenericAccount, transaction: GenericTransaction) {
        if (transaction.status !== TransactionStatus.SUCCESS && transaction.status !== TransactionStatus.FAILED) {
            TransactionTracker.transactions.push({account, transaction});
            TransactionTracker.run();
        }
    }

    static stop() {
        if (TransactionTracker.timeoutRef) {
            clearTimeout(TransactionTracker.timeoutRef);
            TransactionTracker.timeoutRef = undefined;
        }
    }

    static run(interval?: number) {
        TransactionTracker.stop();
        TransactionTracker.timeoutRef = setTimeout(() => {
            TransactionTracker.transactions.map(async (tx) => {
                try {
                    if (tx.transaction.status !== TransactionStatus.SUCCESS && tx.transaction.status !== TransactionStatus.FAILED) {
                        let receipt = await tx.account.node.getTransactionReceipt(tx.transaction);
                        //console.log(receipt);
                        tx.transaction.updateData(receipt);
                    } else {
                        let index = TransactionTracker.transactions.indexOf(tx);
                        TransactionTracker.transactions.splice(index, 1);
                    }
                } catch {
                    // TODO handle errors
                }
            });

            if (TransactionTracker.transactions.length > 0) {
                TransactionTracker.run();
            } else {
                TransactionTracker.stop();
            }
        }, interval || TransactionTracker.TIME_INTERVAL);
    }
}