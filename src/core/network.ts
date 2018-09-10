import { Blockchain } from "./blockchain";

export interface Network {
    blockchain: Blockchain;
    networkId: number;
    name: string;
    url: string;
    mainNet: boolean;
    HDCoinValue: number;
}
