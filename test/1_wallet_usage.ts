import { assert } from "chai";
import mocha from "mocha";

import { Wallet, MnemonicUtils, Blockchains } from "../src/index";
import { GenericAccount, AccountType } from "../src/core/account";
import { GenericNode } from "../src/core/node";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";
const LooseAddress = "0x52b333c238Bf73888fDDe266E9D2A39B75752807";
const LoosePrivateKey = "5EE0CA06B0BFAB9BCFC8AB8BB6CABCBA4DA285F10611A3D17FBDD68A20B4EFB0";
const HardWareAddress = "0xc9e82F820F69C67263c0abd220f31bD0Cf73D28E";

const ZilLooseAddress = "0x693e20469bFFde10dD4d252d5f907Cebbd201BB6";
const ZilLoosePrivateKey = "0x195adc169bab9b6ed6c858089a42e47692b2c7fbe5a1b109c7225bcbd1ca89b9";
const ZilHardWareAddress = "0x78e44924bbc5f4b2c60b2aa9cedf7e0e66c68e36";

describe("Core", async () => {

    describe("Wallet - export / import", async () => {

        const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
        const mapper = defaultWallet.getClassMapper();

        const currentBlockchain = Blockchains.ETHEREUM;
        const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[currentBlockchain] );
        const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[currentBlockchain] );

        const walletBlockchain = defaultWallet.getBlockchain(currentBlockchain);
        const TestNode = walletBlockchain.getNode();

        // HD account setup
        const accountHD = defaultWallet.createAccount(currentBlockchain);

        // HD second
        const accountHD2 = defaultWallet.createAccount(currentBlockchain, 2);

        // Loose account setup
        const accountLoose = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: TestNode,
                type: AccountType.LOOSE,
                privateKey: LoosePrivateKey,
            }),
        );

        // custom Node
        const CustomNode: GenericNode = mapper.getInstance( NodeClassTypeString );
        const CustomNetworkId = 3;
        CustomNode.init( CustomNode.NETWORKS[ CustomNetworkId ] );
        CustomNode.setCustomNetworkUrl("http://127.0.0.1:1");

        // Loose account setup
        const accountLoose2 = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: CustomNode,
                type: AccountType.LOOSE,
                privateKey: LoosePrivateKey,
            }),
        );

        // HW account setup
        const accountHardware = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: TestNode,
                type: AccountType.HARDWARE,
                address: HardWareAddress,
            }),
        );

        // custom Node
        const CustomNode2: GenericNode = mapper.getInstance( NodeClassTypeString );
        CustomNode2.init( CustomNode.NETWORKS[ 4 ] );
        CustomNode2.setCustomNetworkUrl("http://127.0.0.1:1");

        // HW account setup
        const accountHardware2 = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: CustomNode2,
                type: AccountType.HARDWARE,
                address: HardWareAddress,
            }),
        );

        const zilBlockchain = Blockchains.ZILLIQA;
        const zilAccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[zilBlockchain] );
        const zilNodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[zilBlockchain] );

        const zilwalletBlockchain = defaultWallet.getBlockchain(zilBlockchain);
        const zilTestNode = zilwalletBlockchain.getNode();

        // HD account setup
        const zilaccountHD = defaultWallet.createAccount(zilBlockchain);

        // HD second
        const zilaccountHD2 = defaultWallet.createAccount(zilBlockchain, 1);

        // Loose account setup
        const zilaccountLoose = defaultWallet.importAccount(
            mapper.getInstance( zilAccountClassTypeString, {
                node: zilTestNode,
                type: AccountType.LOOSE,
                privateKey: ZilLoosePrivateKey.replace("0x", ""),
            }),
        );

        // custom Node
        const zilCustomNode: GenericNode = mapper.getInstance( zilNodeClassTypeString );
        const zilCustomNetworkId = 2;
        zilCustomNode.init( zilCustomNode.NETWORKS[ zilCustomNetworkId ] );
        zilCustomNode.setCustomNetworkUrl("http://127.0.0.1:1");

        // Loose account setup
        const zilaccountLoose2 = defaultWallet.importAccount(
            mapper.getInstance( zilAccountClassTypeString, {
                node: zilCustomNode,
                type: AccountType.LOOSE,
                privateKey: ZilLoosePrivateKey.replace("0x", ""),
            }),
        );

        // HW account setup
        const zilaccountHardware = defaultWallet.importAccount(
            mapper.getInstance( zilAccountClassTypeString, {
                node: zilTestNode,
                type: AccountType.HARDWARE,
                address: ZilHardWareAddress,
            }),
        );

        // custom Node
        const zilCustomNode2: GenericNode = mapper.getInstance( zilNodeClassTypeString );
        zilCustomNode2.init( zilCustomNode.NETWORKS[ 2 ] );
        zilCustomNode2.setCustomNetworkUrl("http://127.0.0.1:1");

        // HW account setup
        const zilaccountHardware2 = defaultWallet.importAccount(
            mapper.getInstance( zilAccountClassTypeString, {
                node: zilCustomNode2,
                type: AccountType.HARDWARE,
                address: ZilHardWareAddress,
            }),
        );

        describe("Wallet: setup, 2 Blockchains - 4 networks - 12 accounts ( HD / Loose / HW )", async () => {

            describe("ETHEREUM", async () => {

                it("should have 3 accounts on network 0", async () => {
                    const getAccounts = walletBlockchain.getAccounts();
                    assert.equal( getAccounts.length, 3, "getAccounts length does not match" );
                });

                it("should have 1 accounts on network 2", async () => {
                    const getAccounts = defaultWallet.getAccounts(currentBlockchain, false, true, 2 );
                    assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                });

                it("should have 1 accounts on network 3", async () => {
                    const getAccounts = defaultWallet.getAccounts(currentBlockchain, false, true, 3 );
                    assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                });

                it("should have 1 accounts on network 4", async () => {
                    const getAccounts = defaultWallet.getAccounts(currentBlockchain, false, true, 4 );
                    assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                });

                it("should validate account 1 and 2 ( HD Child )", async () => {
                    let scopeAccount = accountHD;
                    let HDKey = scopeAccount.hd;
                    assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                    assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                    assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );

                    scopeAccount = accountHD2;
                    HDKey = scopeAccount.hd;
                    assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                    assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                    assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                });

                it("should validate account 3 and 4 ( LOOSE )", async () => {
                    let scopeAccount = accountLoose;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                    assert.equal( LooseAddress, scopeAccount.address, "address did not match");

                    scopeAccount = accountLoose2;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                    assert.equal( LooseAddress, scopeAccount.address, "address did not match");
                });

                it("should validate account 5 and 6 ( HARDWARE )", async () => {
                    let scopeAccount = accountHardware;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address ) ), "address is invalid" );

                    scopeAccount = accountHardware2;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address ) ), "address is invalid" );
                });
            });

            describe("ZILLIQA", async () => {

                it("should have 3 accounts on network 0", async () => {
                    const getAccounts = zilwalletBlockchain.getAccounts();
                    assert.equal( getAccounts.length, 3, "getAccounts length does not match" );
                });

                it("should have 1 accounts on network 1", async () => {
                    const getAccounts = defaultWallet.getAccounts(zilBlockchain, false, true, 1 );
                    assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                });

                it("should have 2 accounts on network 2", async () => {
                    const getAccounts = defaultWallet.getAccounts(zilBlockchain, false, true, 2 );
                    assert.equal( getAccounts.length, 2, "getAccounts length does not match" );
                });

                it("should validate account 1 and 2 ( HD Child )", async () => {
                    let scopeAccount = zilaccountHD;
                    let HDKey = scopeAccount.hd;
                    assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                    assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                    assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );

                    scopeAccount = zilaccountHD2;
                    HDKey = scopeAccount.hd;
                    assert.isNotNull( HDKey, "HDRootKey should not be null" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                    assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                    assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                });

                it("should validate account 3 and 4 ( LOOSE )", async () => {
                    let scopeAccount = zilaccountLoose;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey, "hex" ) ), "private key is invalid" );
                    assert.equal( ZilLooseAddress, scopeAccount.address, "address did not match");

                    scopeAccount = zilaccountLoose2;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey, "hex" ) ), "private key is invalid" );
                    assert.equal( ZilLooseAddress, scopeAccount.address, "address did not match");
                });

                it("should validate account 5 and 6 ( HARDWARE )", async () => {
                    let scopeAccount = zilaccountHardware;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address.replace("0x", ""), "hex" ) ), "address is invalid" );

                    scopeAccount = zilaccountHardware2;
                    assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                    assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                    assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address.replace("0x", ""), "hex" ) ), "address is invalid" );
                });
            });
        });

        describe("toJSON()", async () => {

            const exportData = defaultWallet.toJSON();

            it("should return a string", async () => {
                assert.isTrue( typeof exportData === "string", "type is not string" );
            });

        });

        describe("fromJson()", async () => {

            const importedWallet = Wallet.fromJson( defaultWallet.toJSON() );

            describe("Wallet: setup, 2 Blockchains - 4 networks - 12 accounts ( HD / Loose / HW )", async () => {

                describe("ETHEREUM", async () => {

                    const importedWalletBlockchain = importedWallet.getBlockchain(currentBlockchain);
                    const getAllAccounts = importedWalletBlockchain.getAllAccounts();

                    it("should have 3 accounts on network 0", async () => {
                        const getAccounts = importedWalletBlockchain.getAccounts();
                        assert.equal( getAccounts.length, 3, "getAccounts length does not match" );
                    });

                    it("should have 1 accounts on network 2", async () => {
                        const getAccounts = importedWallet.getAccounts(currentBlockchain, false, true, 2 );
                        assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                    });

                    it("should have 1 accounts on network 3", async () => {
                        const getAccounts = importedWallet.getAccounts(currentBlockchain, false, true, 3 );
                        assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                    });

                    it("should have 1 accounts on network 4", async () => {
                        const getAccounts = importedWallet.getAccounts(currentBlockchain, false, true, 4 );
                        assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                    });

                    it("should validate account 1 and 2 ( HD Child )", async () => {
                        let scopeAccount = getAllAccounts[0];
                        let HDKey = scopeAccount.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                        assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );

                        scopeAccount = getAllAccounts[1];
                        HDKey = scopeAccount.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                        assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                    });

                    it("should validate account 3 and 4 ( LOOSE )", async () => {
                        let scopeAccount = getAllAccounts[2];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                        assert.equal( LooseAddress, scopeAccount.address, "address did not match");

                        scopeAccount = getAllAccounts[3];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey ) ), "private key is invalid" );
                        assert.equal( LooseAddress, scopeAccount.address, "address did not match");
                    });

                    it("should validate account 5 and 6 ( HARDWARE )", async () => {
                        let scopeAccount = getAllAccounts[4];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address ) ), "address is invalid" );

                        scopeAccount = getAllAccounts[5];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address ) ), "address is invalid" );
                    });

                });

                describe("ZILLIQA", async () => {

                    const importedWalletBlockchain = importedWallet.getBlockchain(Blockchains.ZILLIQA);
                    const getAllAccounts = importedWalletBlockchain.getAllAccounts();

                    console.log( getAllAccounts );

                    it("should have 3 accounts on network 0", async () => {
                        const getAccounts = importedWalletBlockchain.getAccounts();
                        assert.equal( getAccounts.length, 3, "getAccounts length does not match" );
                    });

                    it("should have 1 accounts on network 1", async () => {
                        const getAccounts = importedWallet.getAccounts(Blockchains.ZILLIQA, false, true, 1 );
                        assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
                    });

                    it("should have 2 accounts on network 2", async () => {
                        const getAccounts = importedWallet.getAccounts(Blockchains.ZILLIQA, false, true, 2 );
                        assert.equal( getAccounts.length, 2, "getAccounts length does not match" );
                    });

                    it("should validate account 1 and 2 ( HD Child )", async () => {
                        let scopeAccount = getAllAccounts[0];
                        let HDKey = scopeAccount.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                        assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );

                        scopeAccount = getAllAccounts[1];
                        HDKey = scopeAccount.hd;
                        assert.isNotNull( HDKey, "HDRootKey should not be null" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey.replace("0x", ""), "hex" ) ), "private key is invalid" );
                        assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                        assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                    });

                    it("should validate account 3 and 4 ( LOOSE )", async () => {
                        let scopeAccount = getAllAccounts[2];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey, "hex" ) ), "private key is invalid" );
                        assert.equal( ZilLooseAddress, scopeAccount.address, "address did not match");

                        scopeAccount = getAllAccounts[3];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidPrivate( Buffer.from( scopeAccount.privateKey, "hex" ) ), "private key is invalid" );
                        assert.equal( ZilLooseAddress, scopeAccount.address, "address did not match");
                    });

                    it("should validate account 5 and 6 ( HARDWARE )", async () => {
                        let scopeAccount = getAllAccounts[4];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address.replace("0x", ""), "hex"  ) ), "address is invalid" );

                        scopeAccount = getAllAccounts[5];
                        assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                        assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                        assert.isTrue( scopeAccount.utils.isValidAddress( Buffer.from( scopeAccount.address.replace("0x", ""), "hex" ) ), "address is invalid" );
                    });

                });
            });

        });

    });

});
