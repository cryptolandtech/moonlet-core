"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./core/node");
class DynamicClass {
    constructor() {
        this.classStore = [
            node_1.GenericNode,
        ];
    }
    collectClasses(object) {
        for (const name in object) {
            if (object[name]) {
                this.classStore[name] = object[name];
            }
        }
    }
    getInstance(className, opts) {
        if (this.classStore[className] === undefined || this.classStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not loaded.`);
        }
        return new this.classStore[className](opts);
    }
}
exports.default = DynamicClass;
//# sourceMappingURL=class.store.js.map