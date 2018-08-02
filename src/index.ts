
import Storage from "./base/storage/storage";

interface SetupParams {
    encryptionKey: string;
    storageDriver?: string;
}

class Core {

    public storage: any;
    public events: any;

    private state: any;

    /*
        core stores account data, and loads it if present

        encryptionKey: string - if provided try to load data from storage and populate objects
    */
    public setup( params: SetupParams, cb: any ): boolean {

        if ( params && params.storageDriver ) {
            this.storage = new Storage( params.storageDriver );
        } else {
            this.storage = new Storage();
        }

        if ( params.encryptionKey ) {
            // load storage, and decrypt using key

        } else {
            // just init
        }

        this.callback(cb);
        return true;
    }

    public saveToStorage(): boolean {
        // make sure we have an encryption key set before trying to save anything
        // encrypt and save account data to storage
        return true;
    }

    public destroy( clearStorage: boolean ): boolean {
        return true;
    }

    public callback(fn: (error: any, args?: any) => any , args?: any, error?: any) {
        if ( error ) {
            fn( error );
        }
        if ( args ) {
            fn( null, args );
        }
    }
}

module.exports = Core;
