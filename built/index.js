"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./base/storage/storage");
class Core {
    /*
        core stores account data, and loads it if present

        encryptionKey: string - if provided try to load data from storage and populate objects
    */
    setup(params, cb) {
        if (params && params.storageDriver) {
            this.storage = new storage_1.default(params.storageDriver);
        }
        else {
            this.storage = new storage_1.default();
        }
        if (params.encryptionKey) {
            // load storage, and decrypt using key
        }
        else {
            // just init
        }
        this.callback(cb);
        return true;
    }
    saveToStorage() {
        // make sure we have an encryption key set before trying to save anything
        // encrypt and save account data to storage
        return true;
    }
    destroy(clearStorage) {
        return true;
    }
    callback(fn, args, error) {
        if (error) {
            fn(error);
        }
        if (args) {
            fn(null, args);
        }
    }
}
module.exports = Core;
//# sourceMappingURL=index.js.map