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

import Storage from "./base/storage/storage";

const appStorage = new Storage();
appStorage.set("test", "value");
