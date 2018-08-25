import { Blockchain } from "./blockchain";

export type Network = {
    blockchain: Blockchain;
    name: String;
    url: String;
    mainNet: boolean;
};