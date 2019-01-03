import { GenericAccountUtils } from "../../core/account-utils";
import { BigNumber } from "bignumber.js";

import { validation as ZilliqaJsValidation } from "@zilliqa-js/util";
import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";

export class ZilliqaAccountUtils extends GenericAccountUtils {

    public isValidChecksumAddress( address: string ): boolean {
        this.requireType(address, "string", "isValidChecksumAddress");
        return ZilliqaJsCrypto.isValidChecksumAddress( address );
    }

    public toChecksumAddress( address: string ): string {
        this.requireType(address, "string", "toChecksumAddress");
        return ZilliqaJsCrypto.toChecksumAddress( address );
    }

    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return ZilliqaJsValidation.isAddress( key.toString("hex") );
    }

    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");
        return ZilliqaJsValidation.isPrivateKey( key.toString("hex") );
    }

    public isValidPublic( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPublic");
        return ZilliqaJsValidation.isPubKey( key.toString("hex") );
    }

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

    public balanceToStd(input: BigNumber): string {
        this.requireType(input, "BigNumber", "balanceToStd");
        return input.div(10 ** 12).toString();
    }
}
