"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HDWrapper_1 = require("./HDWrapper");
const utils_1 = require("../utils");
const bip39 = require('bip39');
class HDWallet {
    constructor(opts) {
        this.hdPathString = `m/44'/10018'/0'/0`;
        this.mnemonic = "";
        this.wallets = [];
        if (opts) {
            if (opts.hdPathString)
                this.hdPathString = opts.hdPathString;
            // init using mnemonic
            if (opts.mnemonic)
                this._initFromMnemonic(opts.mnemonic);
        }
    }
    addAccounts(numberOfAccounts = 1) {
        if (!this.root) {
            this._initFromMnemonic(bip39.generateMnemonic());
        }
        const oldLen = this.wallets.length;
        const newWallets = [];
        for (let i = oldLen; i < numberOfAccounts + oldLen; i++) {
            const child = this.root.deriveChild(i);
            const wallet = child.getWallet();
            newWallets.push(wallet);
            this.wallets.push(wallet);
        }
        // remove this async 
        const hexWallets = newWallets.map((w) => {
            // return sigUtil.normalize(w.getAddress().toString('hex'))
            return w.getAddress().toString('hex');
        });
        return Promise.resolve(hexWallets);
    }
    getAccounts() {
        return Promise.resolve(this.wallets.map((w) => {
            return w.getAddress().toString('hex');
        }));
    }
    signTransaction(address, tx) {
        const wallet = this._getWalletForAccount(address);
        var privKey = wallet.getPrivateKey();
        tx.sign(privKey);
        return Promise.resolve(tx);
    }
    getPrivateKeyForAccount(address) {
        return this._getWalletForAccount(address).getPrivateKey();
    }
    _initFromMnemonic(mnemonic) {
        this.mnemonic = mnemonic;
        const seed = bip39.mnemonicToSeed(mnemonic);
        this.hdWallet = HDWrapper_1.default.fromMasterSeed(seed);
        this.root = this.hdWallet.deriveChild(this.hdPathString);
    }
    _getWalletForAccount(account) {
        const targetAddress = utils_1.default.normalize(account);
        return this.wallets.find((w) => {
            const address = utils_1.default.normalize(w.getAddress().toString('hex'));
            return ((address === targetAddress) || (utils_1.default.normalize(address) === targetAddress));
        });
    }
}
exports.default = HDWallet;
//# sourceMappingURL=HDWallet.js.map