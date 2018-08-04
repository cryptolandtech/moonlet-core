
// Core
interface CoreSetupParams {
    coin: string;
    mnemonic?: string;
    encryptionKey?: string;
    env?: string;
}

interface HDWalletOptions {
    coin: string;
    mnemonic?: string;
    scan?: boolean;
}

interface StorageConstructorParams {
    driver: any;
}

declare module 'zilliqa.js'
declare module 'zilliqa.js/lib/util'