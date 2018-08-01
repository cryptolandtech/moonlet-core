// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js

const hdkey = require('hdkey');
import Wallet from "./wallet";

class HDWrapper {
    private _hdkey: any;

    static fromHDKey (hdkey: any) {
        var ret = new HDWrapper()
        ret._hdkey = hdkey
        return ret
    }

    static fromMasterSeed (seedBuffer: Buffer) {
        return HDWrapper.fromHDKey(hdkey.fromMasterSeed(seedBuffer));
    }

    public fromExtendedKey (base58key: any) {
        return HDWrapper.fromHDKey(hdkey.fromExtendedKey(base58key))
    }

    public privateExtendedKey () {
        if (!this._hdkey.privateExtendedKey) {
            throw new Error('This is a public key only wallet')
        }
        return this._hdkey.privateExtendedKey
    }

    public publicExtendedKey () {
        return this._hdkey.publicExtendedKey
    }

    public derivePath (path: any) {
        return HDWrapper.fromHDKey(this._hdkey.derive(path))
    }

    public deriveChild (index: any) {
        return HDWrapper.fromHDKey(this._hdkey.deriveChild(index))
    }

    public getWallet () {
        if (this._hdkey._privateKey) {
            return Wallet.fromPrivateKey(this._hdkey._privateKey)
        } else {
            return Wallet.fromPublicKey(this._hdkey._publicKey)
        }
    }

}

export default HDWrapper;
