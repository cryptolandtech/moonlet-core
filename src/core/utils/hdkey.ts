import npmhdkey from "hdkey";

export default class HDKey {

    public static fromHDKey( parent: HDKey ): HDKey {
        const ret = new HDKey();
        ret.parent = parent;
        return ret;
    }

    public static fromMasterSeed( seedBuffer: Buffer ): HDKey {
        return HDKey.fromHDKey( npmhdkey.fromMasterSeed( seedBuffer ) );
    }

    public parent: any;

    public derivePath( path: any ): HDKey {
        return HDKey.fromHDKey( this.parent.derive(path) );
    }

    public deriveChild( index: any ): HDKey {
        return HDKey.fromHDKey( this.parent.deriveChild(index) );
    }

    public getPrivateKey(): string {
        return this.parent._privateKey;
    }

    public getPublicKey(): string {
        return this.parent._publicKey;
    }
}
