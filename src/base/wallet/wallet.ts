// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/index.js

import Utils from "../utils";

class Wallet {
    private privKey: string;
    private pubKey: string;
    
    constructor(priv: any, pub: any) {
        if (priv && pub) {
            throw new Error('Cannot supply both a private and a public key to the constructor');
        }

        if (priv && !Utils.isValidPrivate(priv.toString('hex'))) {
            throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid):');
        }
        
        if (pub && !Utils.isValidPublic(pub.toString('hex'))) {
            throw new Error('Invalid public key');
        }
          
        this.privKey = priv
        this.pubKey = pub
    }

    public getPrivateKey() {
        return this.privKey;
    }

    public getPublicKey() {
        if(this.pubKey === "") {
            this.pubKey = Utils.getPublicKeyfromPrivateKey(this.privKey);
        }
        return this.pubKey
    }
    
    public getAddress() {
        return Utils.getAddressFromPublicKey(this.getPublicKey());
    }

    static fromPublicKey(key: any) {
        return new Wallet("", key);
    }

    static fromPrivateKey(key: any) {
        return new Wallet(key, "");
    }

}

export default Wallet;
