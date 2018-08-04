/*
    Wrapper over zilliqa.js/lib/util, used to provide a standardized interface for HDWallets
*/
const ZilliqaUtil = require('zilliqa.js/lib/util');

class Utils {

    public static normalize( str: string ): string {
        return str.toUpperCase();
    }

    public static isValidAddress( key: Buffer ): boolean {
        return ZilliqaUtil.isAddress( key.toString("hex") );
    }

    public static isValidPrivate( key: Buffer ): boolean {
        return ZilliqaUtil.isPrivateKey( key.toString("hex") );
    }

    public static isValidPublic( key: Buffer ): boolean {
        return ZilliqaUtil.isPubkey( key.toString("hex") );
    }

    public static publicToAddress( key: string ): Buffer {
        return new Buffer( ZilliqaUtil.getAddressFromPublicKey(key) );
    }

    public static privateToPublic( privateKey: string | Buffer ): Buffer {
        return ZilliqaUtil.getPubKeyFromPrivateKey(privateKey);
    }

    public static privateToAddress( privateKey: string | Buffer ): Buffer {
        return ZilliqaUtil.getAddressFromPrivateKey(privateKey);
    }

    public static bufferToHex = (buf: Buffer) => {
        return '0x' + buf.toString('hex').toUpperCase();
    }

}

export default Utils;
