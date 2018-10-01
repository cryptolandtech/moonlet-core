import Wallet from "./core/wallet";
import { Blockchain as Blockchains } from "./core/blockchain";
import { AccountType } from "./core/account";
import MnemonicUtils from "./core/utils/mnemonic";
export { Wallet, Blockchains, AccountType, MnemonicUtils, };
declare global {
    interface Window {
        Wallet: typeof Wallet;
    }
}
