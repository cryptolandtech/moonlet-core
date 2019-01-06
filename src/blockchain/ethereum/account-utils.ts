import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";
const EthereumUtil = require('ethereumjs-util');

export class EthereumAccountUtils extends GenericAccountUtils {

    /**
     * Determines whether string is a valid checksummed address
     * @param key
     * @returns true if valid checksum address, false if not
     */
    public isValidChecksumAddress( key: string ): boolean {
        this.requireType(key, "string", "isValidChecksumAddress");
        return EthereumUtil.isValidChecksumAddress(key);
    }

    /**
     * Converts an address to a checksummed address
     * @param key
     * @returns checksumed address
     */
    public toChecksumAddress( key: string ): string {
        this.requireType(key, "string", "toChecksumAddress");
        return EthereumUtil.toChecksumAddress(key);
    }

    /**
     * Determines whether buffer contains a valid address
     * @param key
     * @returns true if valid address, false if not
     */
    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return EthereumUtil.isValidAddress( key );
    }

    /**
     * Determines whether buffer contains a valid private key
     * @param key
     * @returns true if valid private, false if not
     */
    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");

        let privateKey = key.toString();
        if (privateKey.length === 66) {
            privateKey = privateKey.replace("0x", "");
        }
        return !!privateKey.match(/^[0-9a-fA-F]{64}$/);
    }

    /**
     * Determines whether buffer contains a valid public key
     * @param key
     * @returns true if valid public, false if not
     */
    public isValidPublic( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPublic");
        return EthereumUtil.isValidPublic( key );
    }

    /**
     * Converts a public key to address
     * @param key
     * @returns address
     */
    public publicToAddress( key: Buffer ): Buffer {
        this.requireType(key, "Buffer", "publicToAddress");
        return EthereumUtil.pubToAddress(key);
    }

    /**
     * Converts a private key to public key
     * @param privateKey
     * @returns public key
     */
    public privateToPublic( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        return EthereumUtil.privateToPublic(privateKey);
    }

    /**
     * Converts a private key to address
     * @param privateKey
     * @returns address
     */
    public privateToAddress( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        return EthereumUtil.privateToAddress(privateKey);
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
    public bufferToHex( buf: Buffer ): string {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }

    /**
     * Converts a balance to it's lowest denominator
     * @param input
     * @returns string
     */
    public balanceToStd( input: BigNumber ): string {
        this.requireType(input, "BigNumber", "balanceToStd");
        return input.div(10 ** 18).toString();
    }
}
