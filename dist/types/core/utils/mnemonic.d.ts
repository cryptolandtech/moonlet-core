/// <reference types="node" />
interface WordListItem {
    [key: string]: string[];
}
export default class Mnemonic {
    static getAvailableWordLists(): WordListItem;
    static generateMnemonic(language?: string): string;
    static mnemonicToSeed(mnemonic: string, language?: string, password?: string): Buffer;
    static getWordsFromMnemonic(mnemonic: string, language?: string): string[];
}
export {};
