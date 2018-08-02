"use strict";
// inspired by https://github.com/MetaMask/eth-hd-keyring/blob/master/index.js
Object.defineProperty(exports, "__esModule", { value: true });
const bip39 = require("bip39");
const utils_1 = require("../utils");
const HDWrapper_1 = require("./HDWrapper");
const Wallet_1 = require("./Wallet");
// complete list at https://github.com/satoshilabs/slips/blob/master/slip-0044.md
const CoinTypes = {
    BTC: 0,
    LTC: 2,
    DOGE: 3,
    ETH: 61,
    ETC: 62,
    ZIL: 10018,
};
class HDWallet {
    constructor(opts) {
        this.hdPathString = "";
        this.mnemonic = "";
        this.coin = "";
        this.wallets = [];
        if (opts.coin) {
            this.coin = opts.coin;
            this.hdPathString = this.genPathString(opts.coin);
        }
        // init using mnemonic
        if (opts.mnemonic) {
            this._initFromMnemonic(opts.mnemonic);
            // since it is provided we should scan the blockchain for derrived accounts.
            if (opts.scan === true) {
                this.RunAccountDiscovery();
            }
        }
    }
    RunAccountDiscovery() {
        /*
            derive the first account's node (index = 0)
            derive the external chain node of this account
            scan addresses of the external chain; respect the gap limit described below
            if no transactions are found on the external chain, stop discovery
            if there are some transactions, increase the account index and go to step 1
        */
    }
    addAccountUsingPrivateKey(privateKey) {
        const wallet = Wallet_1.default.fromPrivateKey(privateKey);
        this.wallets.push(wallet);
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
        const hexWallets = [];
        for (const w in newWallets) {
            if (w) {
                hexWallets.push(utils_1.default.normalize(newWallets[w].getAddress().toString("hex")));
            }
        }
        return hexWallets;
    }
    getAccounts() {
        const hexWallets = [];
        for (const w in this.wallets) {
            if (w) {
                hexWallets.push(utils_1.default.normalize(this.wallets[w].getAddress().toString("hex")));
            }
        }
        return hexWallets;
    }
    signTransaction(address, tx) {
        const wallet = this._getWalletForAccount(address);
        const privKey = wallet.getPrivateKey();
        tx.sign(privKey);
        return Promise.resolve(tx);
    }
    getPrivateKeyForAccount(address) {
        return this._getWalletForAccount(address).getPrivateKey();
    }
    genPathString(coinType) {
        const CoinValue = CoinTypes[coinType];
        return `m/44'/` + CoinValue + `'/0'/0`;
    }
    _initFromMnemonic(mnemonic) {
        this.mnemonic = mnemonic;
        const seed = bip39.mnemonicToSeed(mnemonic);
        this.hdWallet = HDWrapper_1.default.fromMasterSeed(seed);
        this.root = this.hdWallet.derivePath(this.hdPathString);
    }
    _getWalletForAccount(account) {
        const targetAddress = utils_1.default.normalize(account);
        return this.wallets.find((w) => {
            const address = utils_1.default.normalize(w.getAddress().toString("hex"));
            return ((address === targetAddress) || (utils_1.default.normalize(address) === targetAddress));
        });
    }
}
exports.default = HDWallet;
//# sourceMappingURL=HDWallet.js.map