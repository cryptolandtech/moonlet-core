import { Blockchain } from "./blockchain";

export interface Network {
    blockchain: Blockchain;
    name: string;
    url: string;
    mainNet: boolean;
}
