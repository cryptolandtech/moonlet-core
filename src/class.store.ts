import { GenericNode } from "./core/node";
import { AvailableClasses as Ethereum } from "./blockchain/ethereum/class.index";
import { AvailableClasses as Zilliqa } from "./blockchain/zilliqa/class.index";

const ClassStore: any = [
    GenericNode,
];

export default class DynamicClass {
    constructor() {
        this.collectClasses(Ethereum);
        this.collectClasses(Zilliqa);
    }

    public collectClasses( object: any ) {
        for ( const name in object ) {
            if ( object[name] ) {
                ClassStore[name] = object[name];
            }
        }
    }

    public getInstance(className: string, opts?: any) {
        if (ClassStore[className] === undefined || ClassStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not in the store`);
        }
        return new ClassStore[className](opts);
    }
}
