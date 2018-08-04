// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js

const reqhdkey = require("hdkey");
import Wallet from "./Wallet";

class HDWrapper {

    public static fromHDKey( hdkeyP: any, type?: string ) {
        const ret = new HDWrapper();
        if (type) {
            ret.type = type;
        }
        ret.internalHdKey = hdkeyP;
        return ret;
    }

    public static fromMasterSeed( seedBuffer: Buffer, type?: string ) {
        return HDWrapper.fromHDKey( reqhdkey.fromMasterSeed( seedBuffer ), type );
    }

    public static fromExtendedKey(base58key: any, type?: string) {
        return HDWrapper.fromHDKey( reqhdkey.fromExtendedKey(base58key), type );
    }

    public type: string = "ETH";
    public internalHdKey: any;

    public privateExtendedKey() {
        if (!this.internalHdKey.privateExtendedKey) {
            throw new Error("Error: This is a public key only wallet");
        }
        return this.internalHdKey.privateExtendedKey;
    }

    public publicExtendedKey() {
        return this.internalHdKey.publicExtendedKey;
    }

    public derivePath( path: any ) {
        return HDWrapper.fromHDKey( this.internalHdKey.derive(path), this.type );
    }

    public deriveChild( index: any ) {
        return HDWrapper.fromHDKey( this.internalHdKey.deriveChild(index), this.type );
    }

    public getWallet() {
        if (this.internalHdKey._privateKey) {
            return Wallet.fromPrivateKey(this.internalHdKey._privateKey, this.type);
        } else {
            return Wallet.fromPublicKey(this.internalHdKey._publicKey, true, this.type);
        }
    }
}

export default HDWrapper;
