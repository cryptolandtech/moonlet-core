import { GenericAccountUtils } from "../../core/account-utils";
const EthereumUtil = require('ethereumjs-util');

export class EthereumAccountUtils extends GenericAccountUtils {

    public isValidChecksumAddress( key: string ): boolean {
        this.requireType(key, "string", "isValidChecksumAddress");
        return EthereumUtil.isValidChecksumAddress(key);
    }

    public toChecksumAddress( key: string ): string {
        this.requireType(key, "string", "toChecksumAddress");
        return EthereumUtil.toChecksumAddress(key);
    }

    public isValidAddress( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidAddress");
        return EthereumUtil.isValidAddress( key );
    }

    public isValidPrivate( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPrivate");

        let privateKey = key.toString();
        if (privateKey.length === 66) {
            privateKey = privateKey.substr(2);
        }
        return !!privateKey.match(/^[0-9a-fA-F]{64}$/);
    }

    public isValidPublic( key: Buffer ): boolean {
        this.requireType(key, "Buffer", "isValidPublic");
        return EthereumUtil.isValidPublic( key );
    }

    public publicToAddress( key: Buffer ): Buffer {
        this.requireType(key, "Buffer", "publicToAddress");
        return EthereumUtil.pubToAddress(key);
    }

    public privateToPublic( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToPublic");
        return EthereumUtil.privateToPublic(privateKey);
    }

    public privateToAddress( privateKey: Buffer ): Buffer {
        this.requireType(privateKey, "Buffer", "privateToAddress");
        return EthereumUtil.privateToAddress(privateKey);
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
