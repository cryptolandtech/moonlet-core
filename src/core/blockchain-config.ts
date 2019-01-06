import { Blockchain } from './blockchain';
export interface IBlockchainConfig {
    blockchain: Blockchain;
    mainCoin: string;
    units?: {
        [unit: string]: number,
    };
    unitsExtra?: {
        [unit: string]: number,
    };
}
