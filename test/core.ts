import { assert } from "chai";
import mocha from "mocha";
import { Core } from "../src/index";

const TestMnemonic = "between culture long bounce pact oxygen panel fun assist favorite symptom floor";

describe("Core", () => {

    let appCore: Core;

    beforeEach( () => {
        appCore = new Core();
    });

    it("Should instantiate with no accounts", () => {
        const accountCount = appCore.getAllAddresses().length;
        assert.equal(accountCount, 0, "Address count invalid");
    });

    describe("setup()", () => {

        describe("Passing params.mnemonic and params.coin", () => {

            it("Should work and create first account", () => {

                appCore.setup({
                    coin: "ZIL",
                    mnemonic: TestMnemonic,
                });

                const accountCount = appCore.getAllAddresses().length;
                assert.equal(accountCount, 1, "Address count invalid");
            });

            it("Should throw if called twice", () => {

                appCore.setup({
                    coin: "ZIL",
                    mnemonic: TestMnemonic,
                });

                assert.throws(() => {
                    appCore.setup({
                        coin: "ZIL",
                        mnemonic: TestMnemonic,
                    });
                }, /^Core already initialized. \( setup method \)$/);

            });
        });

        describe("Passing params.encryptionKey", () => {
            // this is where we load our saved wallets from disk / localstorage

            it("Should throw if params.path is not specified", () => {
                assert.throws(() => {
                    appCore.setup({
                        encryptionKey: "This is my password",
                    });
                }, /^Please specify storage path$/);
            });

            // WIP
            it("Should throw if the path does not exist", () => {
                assert.throws(() => {
                    appCore.setup({
                        encryptionKey: "This is my password",
                        path: "test/encrypted.DataStore",
                    });
                }, /^Invalid storage path \/ key$/);
            });
        });
    });

    describe("createAccount() - same coin as setup", () => {

        it("Should create second account", () => {

            appCore.setup({
                coin: "ZIL",
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: "ZIL" });

            const accountCount = appCore.getAllAddresses().length;
            assert.equal(accountCount, 2, "Address count invalid");
        });
    });

    describe("createAccount() - different coin", () => {

        it("Should create second account", () => {

            appCore.setup({
                coin: "ZIL",
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: "ETH" });

            const accountCount = appCore.getAllAddresses().length;
            assert.equal(accountCount, 2, "Address count invalid");
        });
    });

    describe("getAddressesGroupedByCoin()", () => {

        it("Should throw if we're managing ZERO wallets", () => {

            assert.throws(() => {
                appCore.getAddressesGroupedByCoin();
            }, /^No wallets present.$/);

        });

        it("Should return one group if only one coin is used", () => {

            appCore.setup({
                coin: "ZIL",
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: "ZIL" });

            const groupedAddresses = appCore.getAddressesGroupedByCoin();
            assert.equal(Object.keys(groupedAddresses).length, 1, "Coin group count invalid");
        });

        it("Should return a group key index named by coin parameter", () => {
            const coinSymbol = "ZIL";
            appCore.setup({
                coin: coinSymbol,
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: coinSymbol });

            const groupedAddresses = appCore.getAddressesGroupedByCoin();
            assert.equal(groupedAddresses.hasOwnProperty( coinSymbol ), true, "Object Key missing");
        });

        it("Should return two groups if we manage two different coin wallets", () => {

            appCore.setup({
                coin: "ZIL",
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: "ETH" });

            const groupedAddresses = appCore.getAddressesGroupedByCoin();
            assert.equal(Object.keys(groupedAddresses).length, 2, "Coin group count invalid");
        });

        it("Should return a group key index named by second coin parameter", () => {
            const coinSymbol = "ZIL";
            const coinSymbolTwo = "ETH";
            appCore.setup({
                coin: coinSymbol,
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: coinSymbolTwo });

            const groupedAddresses = appCore.getAddressesGroupedByCoin();
            assert.equal(groupedAddresses.hasOwnProperty( coinSymbol ), true, "First Object Key missing");
            assert.equal(groupedAddresses.hasOwnProperty( coinSymbolTwo ), true, "Second Object Key missing");
        });

        it("Should return an object and store the address values in an array bound to the key ( { coin: [addr] } )", () => {
            const coinSymbol = "ZIL";
            const coinSymbolTwo = "ETH";
            appCore.setup({
                coin: coinSymbol,
                mnemonic: TestMnemonic,
            });

            appCore.createAccount({ coin: coinSymbolTwo });

            const groupedAddresses = appCore.getAddressesGroupedByCoin();
            assert.isArray(groupedAddresses[coinSymbol], "Return value is not an array");
            assert.isArray(groupedAddresses[coinSymbolTwo], "Return value is not an array");
        });
    });

    describe("getAddressesGroupedByCoin()", () => {
        //
    });

    describe("hasWalletType()", () => {
        //
    });

    describe("getWalletTypeHD()", () => {
        //
    });

    describe("removeAccount()", () => {
        //
    });

    describe("removeCoinAccounts()", () => {
        //
    });
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
    */
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
