/// <reference types="node" />
import { BigNumber } from "bignumber.js";
export declare abstract class GenericAccountUtils {
    requireType(target: any, expected: string, method: string): boolean;
    abstract isValidChecksumAddress(key: string): boolean;
    abstract toChecksumAddress(key: string): string;
    abstract isValidAddress(key: Buffer): boolean;
    abstract isValidPrivate(key: Buffer): boolean;
    abstract isValidPublic(key: Buffer): boolean;
    abstract publicToAddress(key: Buffer): Buffer;
    abstract privateToPublic(privateKey: Buffer): Buffer;
    abstract privateToAddress(privateKey: Buffer): Buffer;
    abstract addressBufferToChecksum(key: Buffer): string;
    abstract bufferToHex(buf: Buffer): string;
    abstract balanceToStd(input: number | string | BigNumber): string;
}
