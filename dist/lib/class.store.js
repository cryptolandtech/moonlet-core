"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./core/node");
const class_index_1 = require("./blockchain/ethereum/class.index");
const class_index_2 = require("./blockchain/zilliqa/class.index");
const ClassStore = [
    node_1.GenericNode,
];
class DynamicClass {
    constructor() {
        this.collectClasses(class_index_1.AvailableClasses);
        this.collectClasses(class_index_2.AvailableClasses);
    }
    collectClasses(object) {
        for (const name in object) {
            if (object[name]) {
                ClassStore[name] = object[name];
            }
        }
    }
    getInstance(className, opts) {
        if (ClassStore[className] === undefined || ClassStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not in the store`);
        }
        return new ClassStore[className](opts);
    }
}
exports.default = DynamicClass;
//# sourceMappingURL=class.store.js.map