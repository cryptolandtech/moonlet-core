import BaseStorageDriverAbstract from "./drivers/BaseStorageDriverAbstract";
import BaseStorageDriverGeneric from "./drivers/BaseStorageDriverGeneric";

interface StorageConstructorParams {
    driver: BaseStorageDriverAbstract;
}

class Storage {
    public driver: BaseStorageDriverAbstract;
    public ready: boolean = false;

    constructor(params?: StorageConstructorParams) {
        if (params && params.driver) {
            this.driver = params.driver;
        } else {
            this.driver = new BaseStorageDriverGeneric();
        }
        this.ready = true;
    }

    public changeDriver(newDriver: BaseStorageDriverAbstract): void {
        this.driver = newDriver;
    }

    public async get(key: string) {
        return await this.driver.get(key);
    }

    public async set(key: string, value: any) {
        return await this.driver.set(key, value);
    }

    public async remove(key: any) {
        return await this.driver.remove(key);
    }

    public async clear() {
        return await this.driver.clear();
    }

    public async length() {
        return await this.driver.clear();
    }

    public async keys() {
        return await this.driver.keys();
    }
}

export default Storage;
