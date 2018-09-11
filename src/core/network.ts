import { Blockchain } from "./blockchain";

export interface Network {
    blockchain: Blockchain;
    chainId: number;
    name: string;
    url: string;
    mainNet: boolean;
    HDCoinValue: number;
}
