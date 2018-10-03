
1. MnemonicUtils.getAvailableWordLists will return all available world lists that can be used to generate mnemonics.

```
wordlists: {
    EN: ENGLISH_WORDLIST,
    JA: JAPANESE_WORDLIST,
    chinese_simplified: CHINESE_SIMPLIFIED_WORDLIST,
    chinese_traditional: CHINESE_TRADITIONAL_WORDLIST,
    english: ENGLISH_WORDLIST,
    french: FRENCH_WORDLIST,
    italian: ITALIAN_WORDLIST,
    japanese: JAPANESE_WORDLIST,
    korean: KOREAN_WORDLIST,
    spanish: SPANISH_WORDLIST
}
```
Note: using externally provided wordlists is not supported at the moment and should be PR'ed into upstream BIP39 package.


```typescript
try {
    const nonce = await TestNode.getNonce( undefined );
    assert.equal( nonce.constructor.name, "Error", "Should have returned an Error object" );
} catch (e) {
    console.log("catch:", e);
}

// OR

const test = TestNode.getNonce( undefined );
test.then( ( res ) => {
    console.log("res:", res);
}).catch( err => {
    console.log("2catch:", err);
});
```