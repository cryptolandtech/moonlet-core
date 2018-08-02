import BaseStorageDriverAbstract from "./BaseStorageDriverAbstract";

class BaseStorageDriverEncrypted extends BaseStorageDriverAbstract {
    public name: string = "encrypted";
    public ready: boolean = false;
    private key: string = "";

    constructor(decriptionKey?: string) {
        super();
        this.data = new Object();
        if ( decriptionKey ) {
            this.key = decriptionKey;
            // load stored data
        }
    }

    public async get(key: string) {
        return await this.data[key];
    }

    public async set(key: string, value: any) {
        this.data[key] = value;
        return await true;
    }

    public async remove(key: any) {
        this.data[key] = null;
        return await true;
    }

    public async clear() {
        this.data = [];
        return await true;
    }

    public async length() {
        return await this.data.length;
    }

    public async keys() {
        return await Object.keys(this.data);
    }

    private async load() {
        //
    }
}

export default BaseStorageDriverEncrypted;
