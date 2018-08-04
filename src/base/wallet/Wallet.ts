// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/index.js
const ethUtil = require('ethereumjs-util');
import zilUtil from "../utils";

class Wallet {

    public static fromPublicKey( key: Buffer, nonStrict?: boolean, type?: string ) {
        if (nonStrict) {
            key = Wallet.getUtilProvider(type).importPublic(key);
        }
        return new Wallet("", key, type);
    }

    public static fromPrivateKey(key: Buffer, type?: string ) {
        return new Wallet(key, "", type);
    }

    public static getUtilProvider(type?: string) {
        let provider: any = ethUtil;
        if (type === "ZIL") {
            provider = zilUtil;
        }
        return provider;
    }

    public loose: boolean = false;
    public utilProvider: any;
    private privKey: Buffer;
    private pubKey: Buffer;
    private type: string = "ETH";

    constructor(priv: Buffer | string, pub?: Buffer | string, type?: string) {
        if (priv && pub) {
            throw new Error("Cannot supply both a private and a public key to the constructor");
        }

        if (type) {
            this.type = type;
        }
        this.utilProvider = Wallet.getUtilProvider(this.type);

        if (priv && !this.utilProvider.isValidPrivate(priv)) {
            throw new Error("Private key does not satisfy the curve requirements (ie. it is invalid):");
        }

        if (pub && !this.utilProvider.isValidPublic(pub)) {
            throw new Error("Invalid public key");
        }

        if (priv && typeof(priv) !== "string") {
            this.privKey = priv;
        } else {
            this.privKey = new Buffer("");
        }

        if (pub && typeof(pub) !== "string") {
            this.pubKey = pub;
        } else {
            this.pubKey = new Buffer("");
        }
    }

    public setUtilProvider(provider: any) {
        this.utilProvider = provider;
    }

    public getPrivateKey(): Buffer {
        const keyString = this.utilProvider.bufferToHex(this.privKey);
        if ( keyString === "" || keyString === "0x") {
            throw new Error("Error: This is a public key only wallet");
        }
        return this.privKey;
    }

    public getPrivateKeyString(): string {
        return this.utilProvider.bufferToHex(this.getPrivateKey());
    }

    public getPublicKey(): Buffer {
        const keyString = this.utilProvider.bufferToHex(this.pubKey);
        if ( keyString === "" || keyString === "0x") {
            this.pubKey = this.utilProvider.privateToPublic(this.privKey);
        }
        return this.pubKey;
    }

    public getPublicKeyString(): string {
        return this.utilProvider.bufferToHex(this.getPublicKey());
    }

    public getAddress(): Buffer {
        return this.utilProvider.publicToAddress( this.getPublicKey() );
    }

    public getAddressString(): string {
        return this.utilProvider.bufferToHex(this.getAddress());
    }

}

export default Wallet;
