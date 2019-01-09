"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./core/node");
class DynamicClass {
    constructor() {
        this.classStore = [
            node_1.GenericNode,
        ];
    }
    /**
     * Collects and index classes so we can instantiate them later
     * @param object
     */
    collectClasses(object) {
        for (const name in object) {
            if (object[name]) {
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
    getInstance(className, opts) {
        if (this.classStore[className] === undefined || this.classStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not loaded.`);
        }
        if (opts === undefined) {
            return new this.classStore[className]();
        }
        else if (typeof opts === "object") {
            if (opts[0] !== undefined) {
                return new this.classStore[className](...opts);
            }
            else {
                return new this.classStore[className](opts);
            }
        }
        else {
            throw new Error(`Class type of \'${className}\' is not loaded.`);
        }
    }
}
exports.default = DynamicClass;
//# sourceMappingURL=class.store.js.map