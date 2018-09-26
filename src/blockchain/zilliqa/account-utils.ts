import { GenericAccountUtils } from "../../core/account-utils";

const { Zilliqa } = require('zilliqa-js');
const zilliqa = new Zilliqa( { nodeUrl: "" } );
const ZilliqaUtil = zilliqa.util;

// should be done in the library
const sha256 = require('hash.js/lib/hash/sha/256');

export class ZilliqaAccountUtils extends GenericAccountUtils {

    public isValidChecksumAddress( address: string ): boolean {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ( this.isValidAddress( Buffer.from(address.substr(2), "hex")) && (this.toChecksumAddress(address) === address) );
    }

    public toChecksumAddress( address: string ): string {
        this.requireType(address, "string", "toChecksumAddress");

        address = address.toLowerCase().replace('0x', '');
        const hash = sha256().update(address, 'hex').digest('hex');

        let ret = '0x';
        for (let i = 0; i < address.length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
                ret += address[i].toUpperCase();
            } else {
                ret += address[i];
            }
        }

        return ret;
    }

    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return ZilliqaUtil.isAddress( key.toString("hex") );
    }

    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");
        return !!key.toString("hex").match(/^[0-9a-fA-F]{64}$/);
        // return ZilliqaUtil.verifyPrivateKey( key.toString("hex") );
    }

    public isValidPublic( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPublic");
        return ZilliqaUtil.isPubKey( key.toString("hex") );
    }

    public publicToAddress( key: Buffer ): Buffer {
        this.requireType(key, "Buffer", "publicToAddress");

        if (key.length === 32 || key.length === 33) {
            return Buffer.from(
                // official receives string.
                ZilliqaUtil.getAddressFromPublicKey(key.toString("hex")),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    public privateToPublic( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        if (privateKey.length === 32) {
            return Buffer.from(
                // official receives string.
                ZilliqaUtil.getPubKeyFromPrivateKey( privateKey.toString("hex") ),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    public privateToAddress( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToAddress");

        if (privateKey.length === 32) {
            return Buffer.from(
                // official receives string.
                ZilliqaUtil.getAddressFromPrivateKey( privateKey.toString("hex") ),
            "hex");
        }
        throw new Error("private key length is invalid");
    }

    public addressBufferToChecksum( key: Buffer ): string {
        this.requireType(key, "Buffer", "addressBufferToChecksum");
        if ( key.length === 20 || key.length === 22 ) {
            return this.toChecksumAddress( key.toString("hex") );
        }
        throw new Error("address buffer length is invalid");
    }

    public bufferToHex(buf: Buffer): string {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }
}
