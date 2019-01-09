import { IBlockchainConfig } from './blockchain-config';
import BigNumber from 'bignumber.js';
export declare class Amount {
    static config: Map<string, {
        [unit: string]: number;
    }>;
    /**
     * Add configuration
     * @param config
     */
    static addConfig(config: IBlockchainConfig): void;
    coin: string;
    private value;
    /**
     * Creates an instance of amount.
     * @param value
     * @param coin
     * @param [unit]
     */
    constructor(value: number | BigNumber, coin: string, unit?: string);
    plus(amount: Amount): Amount;
    minus(amount: Amount): Amount;
    dividedBy(amount: Amount): Amount;
    multipliedBy(amount: Amount): Amount;
    toBigNumber(unit?: string): BigNumber;
    toNumber(unit?: string): number;
    toString(unit?: string): string;
    private withUnit;
    private assertSameCoins;
}
