/// <reference types="node" />
import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";
export declare class EthereumAccountUtils extends GenericAccountUtils {
    isValidChecksumAddress(key: string): boolean;
    toChecksumAddress(key: string): string;
    isValidAddress(key: Buffer): boolean;
    isValidPrivate(key: Buffer): boolean;
    isValidPublic(key: Buffer): boolean;
    publicToAddress(key: Buffer): Buffer;
    privateToPublic(privateKey: Buffer): Buffer;
    privateToAddress(privateKey: Buffer): Buffer;
    addressBufferToChecksum(key: Buffer): string;
    bufferToHex(buf: Buffer): string;
    balanceToStd(input: number | string | BigNumber): string;
}
