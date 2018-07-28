"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStorageDriverGeneric_1 = require("./drivers/BaseStorageDriverGeneric");
class Storage {
    constructor(params) {
        this.ready = false;
        if (params && params.driver) {
            this.driver = params.driver;
        }
        else {
            this.driver = new BaseStorageDriverGeneric_1.default();
        }
        this.ready = true;
    }
    changeDriver(newDriver) {
        this.driver = newDriver;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.get(key);
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.set(key, value);
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.remove(key);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.clear();
        });
    }
    length() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.clear();
        });
    }
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driver.keys();
        });
    }
}
exports.default = Storage;
//# sourceMappingURL=storage.js.map