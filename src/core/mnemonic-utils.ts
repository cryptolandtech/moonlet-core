import * as bip from "bip39";

interface WordListItem {
    [key: string]: string[];
}

export default class MnemonicUtils {

    public static getAvailableWordLists(): WordListItem[] {
        return bip.wordlists;
    }

    public static generateMnemonic(language?: string ): string {
        language = language || "EN";
        const wordlists = MnemonicUtils.getAvailableWordLists();

        if ( Object.keys(wordlists).find(k => k === language) ) {
            return bip.generateMnemonic(undefined, undefined, wordlists[language as any]);
        }

        throw new Error("Mnemonics language '" + language + "' is not supported.");
    }

    public static mnemonicToSeed(mnemonic: string, password?: string) {
        return bip.mnemonicToSeed (mnemonic, password);
    }

    public static getWordsFromMnemonic(mnemonic: string, language?: string): string[] {
        const JPSeparator = '\u3000';
        language = language || "EN";
        if ( language === "JP" || language === "JA") {
            return mnemonic.split( JPSeparator );
        } else {
            return mnemonic.split( " " );
        }
    }
}
