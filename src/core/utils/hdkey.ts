const npmhdkeyobject = require("hdkey");

export default class HDKey {

    public static fromHDKey( npmhdkey: HDKey ): HDKey {
        const ret = new HDKey();
        ret.npmhdkey = npmhdkey;
        return ret;
    }

    public static fromMasterSeed( seedBuffer: Buffer ): HDKey {
        return HDKey.fromHDKey( npmhdkeyobject.fromMasterSeed( seedBuffer ) );
    }

    public npmhdkey: any;

    public derivePath( path: any ): HDKey {
        return HDKey.fromHDKey( this.npmhdkey.derive(path) );
    }

    public deriveChild( index: any ): HDKey {
        return HDKey.fromHDKey( this.npmhdkey.deriveChild(index) );
    }

    public getPrivateKey(): Buffer {
        return this.npmhdkey._privateKey;
    }

    public getPrivateKeyString(): string {
        return this.npmhdkey._privateKey.toString("hex");
    }
}
