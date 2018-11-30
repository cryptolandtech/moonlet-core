import { IBlockchainConfig } from "./blockchain-config";
import { Network } from "./network";

export interface IBlockchainImplementation {
    AvailableClasses: {
        [className: string]: any,
    };
    config: IBlockchainConfig;
    networks: Network[];
}
