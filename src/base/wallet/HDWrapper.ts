// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js

const hdkey = require("hdkey");
import Wallet from "./wallet";

class HDWrapper {

    public static fromHDKey( hdkeyP: any) {
        const ret = new HDWrapper();
        ret.internalHdKey = hdkeyP;
        return ret;
    }

    public static fromMasterSeed( seedBuffer: Buffer ) {
        return HDWrapper.fromHDKey( hdkey.fromMasterSeed( seedBuffer ) );
    }

    public internalHdKey: any;

    public fromExtendedKey(base58key: any) {
        return HDWrapper.fromHDKey(hdkey.fromExtendedKey(base58key));
    }

    public privateExtendedKey() {
        if (!this.internalHdKey.privateExtendedKey) {
            throw new Error("This is a public key only wallet");
        }
        return this.internalHdKey.privateExtendedKey;
    }

    public publicExtendedKey() {
        return this.internalHdKey.publicExtendedKey;
    }

    public derivePath( path: any ) {
        return HDWrapper.fromHDKey(this.internalHdKey.derive(path));
    }

    public deriveChild( index: any ) {
        return HDWrapper.fromHDKey(this.internalHdKey.deriveChild(index));
    }

    public getWallet() {
        if (this.internalHdKey._privateKey) {
            return Wallet.fromPrivateKey(this.internalHdKey._privateKey);
        } else {
            return Wallet.fromPublicKey(this.internalHdKey._publicKey);
        }
    }

}

export default HDWrapper;
