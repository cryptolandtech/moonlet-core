
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
