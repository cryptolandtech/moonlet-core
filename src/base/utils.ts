const { secp256k1, randomBytes, pbkdf2Sync, sha3, sha256 } = require("bcrypto");

class Utils {

    static normalize(str: any): any {
        return str;
    }

    static isValidAddress(key: string): boolean {
        return RegExp(/^[0-9a-fA-F]{40}$/).test(key);
    }

    static isValidPrivate(key: string): boolean {
        return RegExp(/^[0-9a-fA-F]{64}$/).test(key);
    }

    static isValidPublic(key: string): boolean {
        return RegExp(/^[0-9a-fA-F]{66}$/).test(key);
    }

    static publicToAddress(key: string): string {
        return key;
    }

    static getPublicKeyfromPrivateKey(privateKey:any): string {
        if (typeof(privateKey) == 'string') privateKey = new Buffer(privateKey, 'hex');
        let pubKey = secp256k1.publicKeyCreate(privateKey, true);
        return pubKey.toString('hex');
    }

    static getAddressFromPrivateKey(privateKey:any): string {
        if (typeof(privateKey) == 'string') privateKey = new Buffer(privateKey, 'hex');
        let pubKey = secp256k1.publicKeyCreate(privateKey, true);
        let pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        let address = pubKeyHash.toString('hex', 12); // rightmost 160 bits/20 bytes of the hash
        return address
    }

    static getAddressFromPublicKey(pubKey:any): string {
        if (typeof(pubKey) == 'string') pubKey = new Buffer(pubKey, 'hex');
        let pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        let address = pubKeyHash.toString('hex', 12); // rightmost 160 bits/20 bytes of the hash
        return address
    }
}

export default Utils;
