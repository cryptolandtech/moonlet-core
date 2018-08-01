
abstract class BaseStorageDriverAbstract {
    public name: string = "generic";
    public ready: boolean = false;
    public data: any;

    public abstract get(key: string): Promise<any>;
    public abstract set(key: string, value: any): Promise<boolean>;
    public abstract remove(key: any): Promise<any>;
    public abstract clear(): Promise<boolean>;
    public abstract length(): Promise<number>;
    public abstract keys(): Promise<any>;
}

export default BaseStorageDriverAbstract;
