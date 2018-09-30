import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";
// import { util as ZilliqaUtil } from 'zilliqa-js';
const ZilliqaUtil = require('zilliqa-js').util;
// const ZilliqaUtil = require('zilliqa.js');
// const ZilliqaUtil = Zilliqa.utilszz;

export class ZilliqaAccountUtils extends GenericAccountUtils {

    public isValidChecksumAddress( address: string ): boolean {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ZilliqaUtil.isValidChecksumAddress( address );
    }

    public toChecksumAddress( address: string ): string {
        this.requireType(address, "string", "toChecksumAddress");
        return ZilliqaUtil.toChecksumAddress( address );
    }

    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return ZilliqaUtil.isAddress( key.toString("hex") );
    }

    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");
        return ZilliqaUtil.isPrivateKey( key.toString("hex") );
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

    public balanceToStd( input: number | string | BigNumber): string {
        if ( typeof input === "number" || typeof input === "string" ) {
            return new BigNumber( input ).div(10 ** 2).toString();
        }
        return input.div(10 ** 2).toString();
    }
}
