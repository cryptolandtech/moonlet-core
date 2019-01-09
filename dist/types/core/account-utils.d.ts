/// <reference types="node" />
import { BigNumber } from "bignumber.js";
export declare abstract class GenericAccountUtils {
    /**
     * Parameter type validation
     * @param target
     * @param expected
     * @param method
     * @returns true if type matches
     */
    requireType(target: any, expected: string, method: string): boolean;
    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    abstract isValidChecksumAddress(key: string): boolean;
    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    abstract toChecksumAddress(key: string): string;
    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    abstract isValidAddress(key: Buffer): boolean;
    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    abstract isValidPrivate(key: Buffer): boolean;
    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    abstract isValidPublic(key: Buffer): boolean;
    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    abstract publicToAddress(key: Buffer): Buffer;
    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    abstract privateToPublic(privateKey: Buffer): Buffer;
    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    abstract privateToAddress(privateKey: Buffer): Buffer;
    /**
     * Converts an address buffer to a checksummed address string
     * @param key
     * @returns checksumed address
     */
    abstract addressBufferToChecksum(key: Buffer): string;
    /**
     * Converts a buffer to a hex string
     * @param buf
     * @returns string
     */
    abstract bufferToHex(buf: Buffer): string;
    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    abstract balanceToStd(input: number | string | BigNumber): string;
}
