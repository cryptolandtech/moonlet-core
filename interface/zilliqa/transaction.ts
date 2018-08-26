import GenericTransaction from "../core/transaction";

export default class ZilliqaTransaction extends GenericTransaction {
    public version: number;
    public amount: number;
    public pubKey: string;
    public code: string;
}
