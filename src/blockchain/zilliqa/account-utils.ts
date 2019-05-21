import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";

import * as ZilliqaJsValidation from "@zilliqa-js/util/dist/validation";
import * as ZilliqaJsCrypto from "@zilliqa-js/crypto/dist/util";

export class ZilliqaAccountUtils extends GenericAccountUtils {

    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    public isValidChecksumAddress( address: string ): boolean {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ZilliqaJsCrypto.isValidChecksumAddress( address );
    }

    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    public toChecksumAddress( address: string ): string {
        this.requireType(address, "string", "toChecksumAddress");
        return ZilliqaJsCrypto.toChecksumAddress( address );
    }

    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return ZilliqaJsValidation.isAddress( key.toString("hex") );
    }

    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");
        return ZilliqaJsValidation.isPrivateKey( key.toString("hex") );
    }

    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    public isValidPublic( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPublic");
        return ZilliqaJsValidation.isPubKey( key.toString("hex") );
    }

    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    public publicToAddress( key: Buffer ): Buffer {
        this.requireType(key, "Buffer", "publicToAddress");

        if (key.length === 32 || key.length === 33) {
            return Buffer.from(
                // official receives string.
                ZilliqaJsCrypto.getAddressFromPublicKey(key.toString("hex")),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    public privateToPublic( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        if (privateKey.length === 32) {
            return Buffer.from(
                // official receives string.
                ZilliqaJsCrypto.getPubKeyFromPrivateKey( privateKey.toString("hex") ),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    public privateToAddress( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToAddress");

        if (privateKey.length === 32) {
            return Buffer.from(
                // official receives string.
                ZilliqaJsCrypto.getAddressFromPrivateKey( privateKey.toString("hex") ),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    /**
     * Converts an address buffer to a checksummed address string
     * @param key
     * @returns checksumed address
     */
    public addressBufferToChecksum( key: Buffer ): string {
        this.requireType(key, "Buffer", "addressBufferToChecksum");
        if ( key.length === 20 || key.length === 22 ) {
            return this.toChecksumAddress( key.toString("hex") );
        }
        throw new Error("address buffer length is invalid");
    }

    /**
     * Converts a buffer to a hex string
     * @param buf
     * @returns string
     */
    public bufferToHex(buf: Buffer): string {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }

    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    public balanceToStd(input: BigNumber): string {
        this.requireType(input, "BigNumber", "balanceToStd");
        return input.div(10 ** 12).toString();
    }
}
