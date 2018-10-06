import { assert } from "chai";
import mocha from "mocha";

import { Wallet, MnemonicUtils, Blockchains } from "../src/index";
import { GenericAccount, AccountType } from "../src/core/account";
import { GenericNode } from "../src/core/node";

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";
const LooseAddress = "0x52b333c238Bf73888fDDe266E9D2A39B75752807";
const LoosePrivateKey = "5EE0CA06B0BFAB9BCFC8AB8BB6CABCBA4DA285F10611A3D17FBDD68A20B4EFB0";
const HardWareAddress = "0xc9e82F820F69C67263c0abd220f31bD0Cf73D28E";

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

        // Loose account setup
        const accountLoose = defaultWallet.importAccount(
            mapper.getInstance( AccountClassTypeString, {
                node: TestNode,
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

        describe("Wallet: setup, 1 Blockchain - 3 accounts ( 1 HD / 1 Loose / 1 HW )", async () => {

            it("should have 3 accounts", async () => {
                // wallet should have 1 account
                const getAccounts = defaultWallet.getAccounts(currentBlockchain);
                assert.equal( getAccounts.length, 3, "getAccounts length does not match" );
            });

            it("should validate first account ( HD Child )", async () => {
                const scopeAccount = accountHD;
                const HDKey = scopeAccount.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );
                assert.isTrue( scopeAccount.utils.isValidPrivate( new Buffer( scopeAccount.privateKey ) ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
            });

            it("should validate second account ( LOOSE )", async () => {
                const scopeAccount = accountLoose;
                assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                assert.isTrue( scopeAccount.utils.isValidPrivate( new Buffer( scopeAccount.privateKey ) ), "private key is invalid" );
            });

            it("should validate third account ( HARDWARE )", async () => {
                const scopeAccount = accountHardware;
                assert.isUndefined( scopeAccount.hd, "HDRootKey should be undefined" );
                assert.equal( scopeAccount.privateKey, "", "privateKey should be undefined" );
                assert.isTrue( scopeAccount.utils.isValidAddress( new Buffer( scopeAccount.address ) ), "address is invalid" );
            });

        });

        describe("toJSON() -> export", async () => {

            const exportData = JSON.parse( defaultWallet.toJSON() );

            it("should ", async () => {
                console.log( exportData );
            });

        });
    });

});
