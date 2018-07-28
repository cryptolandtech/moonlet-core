import BaseStorageDriverAbstract from "./BaseStorageDriverAbstract";

class BaseStorageDriverGeneric extends BaseStorageDriverAbstract {
    public name: string = "generic";
    public ready: boolean = false;

    constructor() {
        super();
        this.data = new Object();
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
}

export default BaseStorageDriverGeneric;
