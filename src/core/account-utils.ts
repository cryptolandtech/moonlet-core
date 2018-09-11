export abstract class GenericAccountUtils {

    public requireType( target: any, expected: string, method: string ): boolean {
        if ( expected === "Buffer") {
            if ( !Buffer.isBuffer( target ) ) {
                throw new Error(method + ": parameter must be a Buffer().");
            }
        } else if ( typeof target !== expected ) {
            throw new Error(method + ": parameter must be of type " + expected + ".");
        }
        return true;
    }

    public abstract isValidChecksumAddress( key: string ): boolean;

    public abstract toChecksumAddress( key: string ): string;

    public abstract isValidAddress( key: Buffer ): boolean;

    public abstract isValidPrivate( key: Buffer ): boolean;

    public abstract isValidPublic( key: Buffer ): boolean;

    public abstract publicToAddress( key: Buffer ): Buffer;

    public abstract privateToPublic( privateKey: Buffer ): Buffer;

    public abstract privateToAddress( privateKey: Buffer ): Buffer;

    public abstract addressBufferToChecksum( key: Buffer ): string;

    public abstract bufferToHex( buf: Buffer): string;
}
