const Core = require("../built/index.js");

const appCore = new Core();
const mnemonic = "between culture long bounce pact oxygen panel fun assist favorite symptom floor";

appCore.setup({
    coin: "ZIL", 
    mnemonic: mnemonic,
});

// console.log(appCore.wallets);

/*
let addresses;
// console.log(addresses);
appCore.createAccount({
    coin: "ZIL"
});

appCore.createAccount({
    coin: "ETH", 
    mnemonic: mnemonic,
})

appCore.createAccount({
    coin: "ZIL"
});

addresses = appCore.getAllAddresses();
console.log(addresses);

addresses = appCore.getAddressesGroupedByCoin();
console.log(addresses);
*/

console.log("Mnemonic: ", mnemonic);
console.log("\nInitialized Core");
console.log("Addresses: ", appCore.getAddressesGroupedByCoin() );

appCore.createAccount({
    coin: "ZIL"
});
console.log("\nCreating Additional ZIL Account");
console.log("Addresses: ", appCore.getAddressesGroupedByCoin() );

console.log("\nCreating new ETH Root Account");
appCore.createAccount({
    coin: "ETH", 
    mnemonic: mnemonic,
})
console.log("Addresses: ", appCore.getAddressesGroupedByCoin() );

/*

    Flow: 1 

    Create new wallet
        - select type ( BTC / ETH / ZIL )
        - get mnemonic string
        - get accounts ( addresses & pks )
        - create transaction
        - validate transaction string


    Import wallet from mnemonic with Zil type
        - get mnemonic string
        - get accounts ( addresses & pks )
        - create transaction
        - validate transaction string

    Import wallet from pk with Zil type
        - get mnemonic string
        - get accounts ( addresses & pks )
        - create transaction
        - validate transaction string


*/

