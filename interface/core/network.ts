import { Blockchain } from "./blockchain";

export interface Network {
    blockchain: Blockchain;
    networkId: number,
    name: String;
    url: String;
    mainNet: boolean;
}
