"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const npmhdkeyobject = require("hdkey");
class HDKey {
    static fromHDKey(npmhdkey) {
        const ret = new HDKey();
        ret.npmhdkey = npmhdkey;
        return ret;
    }
    static fromMasterSeed(seedBuffer) {
        return HDKey.fromHDKey(npmhdkeyobject.fromMasterSeed(seedBuffer));
    }
    derivePath(path) {
        return HDKey.fromHDKey(this.npmhdkey.derive(path));
    }
    deriveChild(index) {
        return HDKey.fromHDKey(this.npmhdkey.deriveChild(index));
    }
    getPrivateKey() {
        return this.npmhdkey._privateKey;
    }
    getPrivateKeyString() {
        return this.npmhdkey._privateKey.toString("hex");
    }
}
exports.default = HDKey;
//# sourceMappingURL=hdkey.js.map