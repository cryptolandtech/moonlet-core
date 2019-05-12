import { BigNumber } from "bignumber.js";

export abstract class GenericAccountUtils {

    public static getImplementedClassName(name: string) {
        name = name.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1) + "AccountUtils";
    }

    /**
     * Parameter type validation
     * @param target
     * @param expected
     * @param method
     * @returns true if type matches
     */
    public requireType( target: any, expected: string, method: string ): boolean {
        if ( expected === "Buffer") {
            if ( !Buffer.isBuffer( target ) ) {
                throw new Error(method + ": parameter must be a Buffer().");
            }
        } else if ( expected === "BigNumber") {
            if ( !BigNumber.isBigNumber( target ) ) {
                throw new Error(method + ": parameter must be of type BigNumber.");
            }
        } else if ( typeof target !== expected ) {
            if ( target.constructor.name !== expected) {
                throw new Error(method + ": parameter must be of type " + expected + ".");
            }
        }
        return true;
    }

    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    public abstract isValidChecksumAddress( key: string ): boolean;

    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    public abstract toChecksumAddress( key: string ): string;

    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    public abstract isValidAddress( key: Buffer ): boolean;

    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    public abstract isValidPrivate( key: Buffer ): boolean;

    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    public abstract isValidPublic( key: Buffer ): boolean;

    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    public abstract publicToAddress( key: Buffer ): Buffer;

    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    public abstract privateToPublic( privateKey: Buffer ): Buffer;

    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    public abstract privateToAddress( privateKey: Buffer ): Buffer;

    /**
     * Converts an address buffer to a checksummed address string
     * @param key
     * @returns checksumed address
     */
    public abstract addressBufferToChecksum( key: Buffer ): string;

    /**
     * Converts a buffer to a hex string
     * @param buf
     * @returns string
     */
    public abstract bufferToHex( buf: Buffer): string;

    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    public abstract balanceToStd( input: number | string | BigNumber): string;

}
