"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./base/storage/storage");
const HDWallet_1 = require("./base/wallet/HDWallet");
class Core {
    constructor() {
        this.wallets = [];
        this.environment = "node";
    }
    /*
        core stores account data, and loads it if present

        encryptionKey: string - if provided try to load data from storage and populate objects
    */
    setup(params, cb) {
        let wallet = {};
        if (params.env) {
            this.environment = params.env;
        }
        if (!params.encryptionKey) {
            if (!params.coin) {
                throw new Error("Please specify param.coin type");
            }
            wallet = new HDWallet_1.default({
                coin: params.coin,
                mnemonic: params.mnemonic,
            });
            wallet.addAccounts(1);
        }
        else {
            // load storage, and decrypt using key
            this.storage = new storage_1.default(params.encryptionKey);
            // load wallet using mnemonic and coin in storage.
            wallet = {};
        }
        // index wallet
        this.indexWallet(wallet);
        if (cb) {
            this.callback(cb, wallet);
        }
        return true;
    }
    createAccount(params) {
        if (this.hasWalletType(params.coin)) {
            const parentWallet = this.getWalletTypeHD(params.coin);
            if (params.privatekey) {
                return parentWallet.addAccountUsingPrivateKey(params.privatekey);
            }
            else {
                return this.getWalletTypeHD(params.coin).addAccounts(1);
            }
        }
        else {
            // we need a new HDWallet to store this type
            const wallet = new HDWallet_1.default({
                coin: params.coin,
                mnemonic: params.mnemonic,
            });
            wallet.addAccounts(1);
            this.indexWallet(wallet);
        }
    }
    getAddressesGroupedByCoin() {
        const addresses = {};
        for (const wall in this.wallets) {
            if (wall) {
                const addrByCoin = [];
                const accounts = this.wallets[wall].getAccounts();
                for (const addr in accounts) {
                    if (addr) {
                        addrByCoin.push(accounts[addr]);
                    }
                }
                addresses[this.wallets[wall].coin] = addrByCoin;
            }
        }
        return addresses;
    }
    getAllAddresses() {
        const addresses = [];
        for (const wall in this.wallets) {
            if (wall) {
                const accounts = this.wallets[wall].getAccounts();
                for (const addr in accounts) {
                    if (addr) {
                        addresses.push(accounts[addr]);
                    }
                }
            }
        }
        return addresses;
    }
    saveToStorage() {
        // make sure we have an encryption key set before trying to save anything
        // encrypt and save account data to storage
        return true;
    }
    destroy(clearStorage) {
        return true;
    }
    hasWalletType(coin) {
        const wallet = this.getWalletTypeHD(coin);
        if (wallet !== false) {
            return true;
        }
        return false;
    }
    getWalletTypeHD(coin) {
        for (const wall in this.wallets) {
            if (wall) {
                if (this.wallets[wall].coin === coin) {
                    return this.wallets[wall];
                }
            }
        }
        return false;
    }
    indexWallet(wallet) {
        this.wallets.push(wallet);
    }
    callback(fn, args, error) {
        if (error) {
            fn(error);
        }
        if (args) {
            fn(null, args);
        }
    }
}
module.exports = Core;
//# sourceMappingURL=index.js.map