import { GenericAccountUtils } from "../../core/account-utils";
const ZilliqaUtil = require('zilliqa.js/lib/util');

export class ZilliqaAccountUtils extends GenericAccountUtils {

    public isValidChecksumAddress( key: string ): boolean {
        throw new Error("Method not implemented.");
    }

    public toChecksumAddress( key: string ): string {
        throw new Error("Method not implemented.");
    }

    public isValidAddress( key: Buffer ): boolean {
        return ZilliqaUtil.isAddress( key.toString("hex") );
    }

    public isValidPrivate( key: Buffer ): boolean {
        return ZilliqaUtil.isPrivateKey( key.toString("hex") );
    }

    public isValidPublic( key: Buffer ): boolean {
        return ZilliqaUtil.isPubkey( key.toString("hex") );
    }

    public publicToAddress( key: Buffer ): Buffer {
        return ZilliqaUtil.getAddressFromPublicKey(key);
    }

    public privateToPublic( privateKey: Buffer ): Buffer {
        return ZilliqaUtil.getPubKeyFromPrivateKey(privateKey);
    }

    public privateToAddress( privateKey: Buffer ): Buffer {
        return ZilliqaUtil.getAddressFromPrivateKey(privateKey);
    }

    public addressBufferToChecksum( key: Buffer ): string {
        throw new Error("Method not implemented.");
    }

    public bufferToHex(buf: Buffer): string {
        this.requireType(buf, "Buffer", "bufferToHex");
        return '0x' + buf.toString('hex');
    }
}
