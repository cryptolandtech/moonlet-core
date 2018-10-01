/// <reference types="node" />
export default class HDKey {
    static fromHDKey(npmhdkey: HDKey): HDKey;
    static fromMasterSeed(seedBuffer: Buffer): HDKey;
    npmhdkey: any;
    derivePath(path: any): HDKey;
    deriveChild(index: any): HDKey;
    getPrivateKey(): Buffer;
    getPrivateKeyString(): string;
}
