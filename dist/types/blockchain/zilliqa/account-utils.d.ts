/// <reference types="node" />
import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";
export declare class ZilliqaAccountUtils extends GenericAccountUtils {
    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    isValidChecksumAddress(address: string): boolean;
    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    toChecksumAddress(address: string): string;
    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    isValidAddress(key: Buffer): boolean;
    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    isValidPrivate(key: Buffer): boolean;
    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    isValidPublic(key: Buffer): boolean;
    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    publicToAddress(key: Buffer): Buffer;
    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    privateToPublic(privateKey: Buffer): Buffer;
    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    privateToAddress(privateKey: Buffer): Buffer;
    /**
     * Converts an address buffer to a checksummed address string
     * @param key
     * @returns checksumed address
     */
    addressBufferToChecksum(key: Buffer): string;
    /**
     * Converts a buffer to a hex string
     * @param buf
     * @returns string
     */
    bufferToHex(buf: Buffer): string;
    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    balanceToStd(input: BigNumber): string;
}
