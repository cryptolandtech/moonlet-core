// inspired by https://github.com/MetaMask/eth-hd-keyring/blob/master/index.js

import HDWrapper from "./HDWrapper";
import Utils from "../utils";
const bip39 = require('bip39');

interface options {
    mnemonic?: string,
    hdPathString?: string
}

class HDWallet {
    public hdPathString:string = `m/44'/10018'/0'/0`;
    public mnemonic: string = "";
    public hdWallet: any;
    public root: any;
    public wallets: any;

    constructor (opts?: options) {
        this.wallets = [];

        if (opts){ 
            if( opts.hdPathString ) this.hdPathString = opts.hdPathString;

            // init using mnemonic
            if( opts.mnemonic ) this._initFromMnemonic(opts.mnemonic);
        }
    }

    public addAccounts (numberOfAccounts = 1) {
        if (!this.root) {
            this._initFromMnemonic(bip39.generateMnemonic())
        }

        const oldLen = this.wallets.length
        const newWallets = []
        for (let i = oldLen; i < numberOfAccounts + oldLen; i++) {
            const child = this.root.deriveChild(i)
            const wallet = child.getWallet()
            newWallets.push(wallet)
            this.wallets.push(wallet)
        }

        // remove this async 
        const hexWallets = newWallets.map((w) => {
            // return sigUtil.normalize(w.getAddress().toString('hex'))
            return w.getAddress().toString('hex');
        })

        return Promise.resolve(hexWallets)
    }

    public getAccounts () {
        return Promise.resolve(this.wallets.map((w: any) => {
            return w.getAddress().toString('hex');
        }))
    }

    public signTransaction (address: string, tx: any) {
        const wallet = this._getWalletForAccount(address)
        var privKey = wallet.getPrivateKey()
        tx.sign(privKey)
        return Promise.resolve(tx)
    }

    public getPrivateKeyForAccount(address: string) {
        return this._getWalletForAccount(address).getPrivateKey();
    }

    private _initFromMnemonic (mnemonic: string) {
        this.mnemonic = mnemonic;
        const seed = bip39.mnemonicToSeed(mnemonic)
        this.hdWallet = HDWrapper.fromMasterSeed(seed)
        this.root = this.hdWallet.deriveChild(this.hdPathString)
    }

    private _getWalletForAccount (account: string) {
        const targetAddress = Utils.normalize(account);
        return this.wallets.find( (w: any) => {
            const address = Utils.normalize( w.getAddress().toString('hex') );
            return ((address === targetAddress) || (Utils.normalize(address) === targetAddress));
        })
    }
}

export default HDWallet;
