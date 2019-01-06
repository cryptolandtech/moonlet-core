import { GenericNode } from "./core/node";

export default class DynamicClass {
    public classStore: any = [
        GenericNode,
    ];

    /**
     * Collects and index classes so we can instantiate them later
     * @param object
     */
    public collectClasses( object: any ) {
        for ( const name in object ) {
            if ( object[name] ) {
                this.classStore[name] = object[name];
            }
        }
    }

    /**
     * Gets a class instance for supplied name and options
     * @param className
     * @param [opts]
     * @returns supplied class instance
     */
    public getInstance(className: string, opts?: any) {
        if (this.classStore[className] === undefined || this.classStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not loaded.`);
        }
        return new this.classStore[className](opts);
    }
}
