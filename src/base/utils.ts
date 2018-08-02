const { secp256k1, randomBytes, pbkdf2Sync, sha3, sha256 } = require("bcrypto");
const isWebUri = require("valid-url").isWebUri;

class Utils {

    // TODO: implement
    public static normalize( str: any ): any {
        return str;
    }

    public static isValidAddress( key: string ): boolean {
        return RegExp(/^[0-9a-fA-F]{40}$/).test(key);
    }

    public static isValidPrivate( key: string ): boolean {
        return RegExp(/^[0-9a-fA-F]{64}$/).test(key);
    }

    public static isValidPublic( key: string ): boolean {
        return RegExp(/^[0-9a-fA-F]{66}$/).test(key);
    }

    public static publicToAddress( key: string ): string {
        return key;
    }

    public static getPublicKeyfromPrivateKey( privateKey: any ): string {
        if ( typeof(privateKey) === "string" ) {
            privateKey = new Buffer(privateKey, "hex");
        }
        const pubKey = secp256k1.publicKeyCreate(privateKey, true);
        return pubKey.toString("hex");
    }

    public static getAddressFromPrivateKey( privateKey: any ): string {
        if ( typeof(privateKey) === "string" ) {
            privateKey = new Buffer(privateKey, "hex");
        }
        const pubKey = secp256k1.publicKeyCreate(privateKey, true);
        const pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        const address = pubKeyHash.toString("hex", 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }

    public static getAddressFromPublicKey( pubKey: any ): string {
        if (typeof(pubKey) === "string") {
            pubKey = new Buffer(pubKey, "hex");
        }
        const pubKeyHash = sha256.digest(pubKey); // sha256 hash of the public key
        const address = pubKeyHash.toString("hex", 12); // rightmost 160 bits/20 bytes of the hash
        return address;
    }

    public static validateArgs(args: any, requiredArgs: any, optionalArgs?: any) {

        for (const key of Object.keys(requiredArgs)) {
        // for (const key in requiredArgs) {
            if (args[key] === undefined) {
                throw new Error("Key not found: " + key);
            }

            for (let i = 0 ; i < requiredArgs[key].length ; i++) {
                if (typeof(requiredArgs[key][i]) !== "function") {
                    throw new Error("Validator is not a function");
                }
                if (!requiredArgs[key][i](args[key])) {
                    throw new Error("Validation failed for " + key);
                }
            }
        }

        for (const key in optionalArgs) {
            if (args[key]) {
                for (let i = 0 ; i < optionalArgs[key].length; i++) {
                    if (typeof(optionalArgs[key][i]) !== "function") {
                        throw new Error("Validator is not a function");
                    }
                    if (!optionalArgs[key][i](args[key])) {
                        throw new Error("Validation failed for " + key);
                    }
                }
            }
        }
        return true;
    }

    public static isUrl(url: string): boolean {
        return isWebUri(url);
    }

}

export default Utils;
