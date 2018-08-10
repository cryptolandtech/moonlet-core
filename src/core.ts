
import { Wallet } from "generichd-wallet";
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

                if (!params.path) {
                    throw new Error("Please specify storage path");
                }
                // load storage, and decrypt using key
                this.storage = new Storage({
                    path: params.path,
                    encryptionKey: params.encryptionKey,
                });

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

    public removeAccount( params: {coin: string, idx: number } ): boolean {
        //
        return true;
    }

    public removeCoinAccounts( coin: string ): boolean {
        //
        return true;
    }

    public getAddressesGroupedByCoin(): string[] {
        const addresses: any = {};
        if (this.wallets.length > 0) {
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
        } else {
            throw new Error('No wallets present.');
        }
        return addresses;
    }

    /*
    bad as we need to know coin type for each address
    */
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

    public getAddressData( address: string | number ) {
        // load data for this address from the node provider attached to the wallet.
    }

    public loadNodeData( address: string | number , callback?: () => {} ) {
        // iterate through wallets and call this.getAddressData()
    }

    public setEncryptionKey( encryptionKey: string ): boolean {
        // this.storage = new Storage( encryptionKey );
        return true;
    }

    public saveToStorage(): boolean {
        // make sure we have an encryption key set before trying to save anything
        // encrypt and save account data to storage
        return true;
    }

    public destroy( clearStorage: boolean ): boolean {
        return true;
    }

    public hasWalletType(coin: string): boolean {
        const wallet: any = this.getWalletTypeHD(coin);
        if (wallet !== false) {
            return true;
        }
        return false;
    }

    public getWalletTypeHD(coin: string): any {
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
