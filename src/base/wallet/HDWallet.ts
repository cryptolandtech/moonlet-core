// inspired by https://github.com/MetaMask/eth-hd-keyring/blob/master/index.js

const bip39 = require("bip39");
import Utils from "../utils";
import HDWrapper from "./HDWrapper";
import Wallet from "./Wallet";

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
    public hdPathString: string = "";
    public mnemonic: string = "";
    public hdWallet: any;
    public root: any;
    public wallets: any;
    public coin: string = "";

    constructor( opts: HDWalletOptions ) {
        this.wallets = [];

        if ( opts.coin ) {
            this.coin = opts.coin;
            this.hdPathString = this.genPathString(opts.coin);
        }

        // init using mnemonic
        if ( opts.mnemonic ) {
            this._initFromMnemonic(opts.mnemonic);
            // since it is provided we should scan the blockchain for derrived accounts.
            if (opts.scan === true) {
                this.RunAccountDiscovery();
            }
        }
    }

    public RunAccountDiscovery() {
        /*
            derive the first account's node (index = 0)
            derive the external chain node of this account
            scan addresses of the external chain; respect the gap limit described below
            if no transactions are found on the external chain, stop discovery
            if there are some transactions, increase the account index and go to step 1
        */

    }

    public addAccountUsingPrivateKey( privateKey: string ) {
        const wallet = Wallet.fromPrivateKey( new Buffer(privateKey), this.coin );
        this.wallets.push(wallet);
    }

    public addAccounts( numberOfAccounts = 1 ) {
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

        const hexWallets: any = [];
        for (const w in newWallets) {
            if (w) {
                hexWallets.push( newWallets[w].getAddressString() );
            }
        }
        return hexWallets;
    }

    public getAccounts() {
        const hexWallets: any = [];
        for (const w in this.wallets) {
            if (w) {
                hexWallets.push( this.wallets[w].getAddressString() );
            }
        }
        return hexWallets;
    }

    public signTransaction( address: string, tx: any ) {
        const wallet = this._getWalletForAccount(address);
        const privKey = wallet.getPrivateKey();
        tx.sign(privKey);
        return Promise.resolve(tx);
    }

    public getPrivateKeyForAccount(address: string) {
        return this._getWalletForAccount(address).getPrivateKeyString();
    }

    private genPathString( coinType: any ): any {
        const CoinValue: number = (CoinTypes as any)[coinType];
        return `m/44'/` + CoinValue + `'/0'/0`;
    }

    private _initFromMnemonic(mnemonic: string) {
        this.mnemonic = mnemonic;
        const seed = bip39.mnemonicToSeed(mnemonic);
        this.hdWallet = HDWrapper.fromMasterSeed(seed, this.coin);
        this.root = this.hdWallet.derivePath(this.hdPathString);
    }

    private _getWalletForAccount(account: string) {
        const targetAddress = Utils.normalize(account);
        return this.wallets.find( (w: any) => {
            const address = w.getAddressString();
            return ((address === targetAddress) || (Utils.normalize(address) === targetAddress));
        });
    }
}

export default HDWallet;
