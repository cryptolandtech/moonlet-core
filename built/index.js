"use strict";
/*
    configuration
    account
    address
    -- bip39
    blockchain
    wallet
    network
    storage
*/
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./base/storage/storage");
const appStorage = new storage_1.default();
appStorage.set("test", "value");
//# sourceMappingURL=index.js.map