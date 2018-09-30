"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bip = require("bip39");
class Mnemonic {
    static getAvailableWordLists() {
        return bip.wordlists;
    }
    static generateMnemonic(language) {
        language = language || "EN";
        const wordlists = Mnemonic.getAvailableWordLists();
        if (Object.keys(wordlists).find(k => k === language)) {
            return bip.generateMnemonic(undefined, undefined, wordlists[language]);
        }
        throw new Error("Mnemonics language '" + language + "' is not supported.");
    }
    static mnemonicToSeed(mnemonic, language, password) {
        language = language || "EN";
        const wordlists = Mnemonic.getAvailableWordLists();
        if (bip.validateMnemonic(mnemonic, wordlists[language])) {
            return bip.mnemonicToSeed(mnemonic, password);
        }
        throw new Error("Invalid Mnemonic.");
    }
    static getWordsFromMnemonic(mnemonic, language) {
        const JPSeparator = '\u3000';
        language = language || "EN";
        if (language === "JP" || language === "JA") {
            return mnemonic.split(JPSeparator);
        }
        else {
            return mnemonic.split(" ");
        }
    }
}
exports.default = Mnemonic;
//# sourceMappingURL=mnemonic.js.map