
import Storage from "./base/storage/storage";
import HDWallet from "./base/wallet/HDWallet";

class Core {

    public storage: any;
    public events: any;

    public wallets: any = [];
    private state: any;
    private environment: string = "node";

    private initialized: boolean = false;

    /*
        core stores account data, and loads it if present

        encryptionKey: string - if provided try to load data from storage and populate objects
    */
    public setup( params: CoreSetupParams, cb?: any ): boolean {
        if (!this.initialized) {
            this.initialized = true;
            let wallet: any = {};

            if ( params.env ) {
                this.environment = params.env;
            }

            if ( !params.encryptionKey ) {

                if (!params.coin) {
                    throw new Error("Please specify param.coin type");
                }

                wallet = new HDWallet({
                    coin: params.coin,
                    mnemonic: params.mnemonic,
                });

                wallet.addAccounts( 1 );

            } else {
                // load storage, and decrypt using key
                this.storage = new Storage( params.encryptionKey );

                // load wallet using mnemonic and coin in storage.
                wallet = {};
            }

            // index wallet
            this.indexWallet(wallet);

            if (cb) {
                this.callback(cb, wallet);
            }
            return true;

        } else {
            throw new Error('Core already initialized. \( setup method \)');
        }
    }

    public createAccount( params: {coin: string, mnemonic?: string, privatekey?: string } ): any {
        if (this.hasWalletType(params.coin)) {
            const parentWallet =  this.getWalletTypeHD(params.coin);

            if ( params.privatekey ) {
                return parentWallet.addAccountUsingPrivateKey( params.privatekey );
            } else {
                return this.getWalletTypeHD(params.coin).addAccounts(1);
            }

        } else {
            // we need a new HDWallet to store this type
            const wallet = new HDWallet({
                coin: params.coin,
                mnemonic: params.mnemonic,
            });
            wallet.addAccounts( 1 );
            this.indexWallet(wallet);
        }
    }

    public getAddressesGroupedByCoin(): string[] {
        const addresses: any = {};
        for ( const wall in this.wallets) {
            if (wall) {
                const addrByCoin: string[] = [];
                const accounts = this.wallets[wall].getAccounts();
                for (const addr in accounts) {
                    if (addr) {
                        addrByCoin.push( accounts[addr] );
                    }
                }
                addresses[this.wallets[wall].coin] = addrByCoin;
            }
        }
        return addresses;
    }

    public getAllAddresses(): string[] {
        const addresses: any = [];
        for ( const wall in this.wallets) {
            if (wall) {
                const accounts = this.wallets[wall].getAccounts();
                for (const addr in accounts) {
                    if (addr) {
                        addresses.push( accounts[addr] );
                    }
                }
            }
        }
        return addresses;
    }

    public saveToStorage(): boolean {
        // make sure we have an encryption key set before trying to save anything
        // encrypt and save account data to storage
        return true;
    }

    public destroy( clearStorage: boolean ): boolean {
        return true;
    }

    private hasWalletType(coin: string): boolean {
        const wallet: any = this.getWalletTypeHD(coin);
        if (wallet !== false) {
            return true;
        }
        return false;
    }

    private getWalletTypeHD(coin: string) {
        for ( const wall in this.wallets) {
            if (wall) {
                if (this.wallets[wall].coin === coin ) {
                    return this.wallets[wall];
                }
            }
        }
        return false;
    }

    private indexWallet( wallet: any ) {
        this.wallets.push( wallet );
    }

    private callback(fn: (error: any, args?: any) => any , args?: any, error?: any) {
        if ( error ) {
            fn( error );
        }
        if ( args ) {
            fn( null, args );
        }
    }
}

export default Core;
