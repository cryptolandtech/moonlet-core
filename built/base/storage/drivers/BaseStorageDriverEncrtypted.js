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
const BaseStorageDriverAbstract_1 = require("./BaseStorageDriverAbstract");
// useful only for devices that have local storage ( desktop / mobile / extension )
class BaseStorageDriverEncrypted extends BaseStorageDriverAbstract_1.default {
    constructor(path, decriptionKey) {
        super();
        this.name = "encrypted";
        this.ready = false;
        this.key = "";
        this.data = new Object();
        if (decriptionKey) {
            this.key = decriptionKey;
            // load stored data
        }
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.data[key];
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[key] = value;
            return yield true;
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data[key] = null;
            return yield true;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = [];
            return yield true;
        });
    }
    length() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.data.length;
        });
    }
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Object.keys(this.data);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            //
        });
    }
}
exports.default = BaseStorageDriverEncrypted;
//# sourceMappingURL=BaseStorageDriverEncrtypted.js.map