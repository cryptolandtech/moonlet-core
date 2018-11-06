import { GenericNode } from "./core/node";

export default class DynamicClass {
    classStore: any = [
        GenericNode
    ];

    public collectClasses( object: any ) {
        for ( const name in object ) {
            if ( object[name] ) {
                this.classStore[name] = object[name];
            }
        }
    }

    public getInstance(className: string, opts?: any) {
        if (this.classStore[className] === undefined || this.classStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not loaded.`);
        }
        return new this.classStore[className](opts);
    }
}
