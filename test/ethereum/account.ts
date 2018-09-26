import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericAccount, AccountType } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";

const mapper = new DynamicClassMapper();

describe("Core", async () => {

    describe("EthereumAccount", async () => {

        describe("instantiating new object", async () => {

            const wallet: Wallet = new Wallet();
            const TestNode: GenericNode = wallet.getNode(Blockchains.ETHEREUM);
            const DynamicClassName = GenericAccount.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

            it("should throw if creating an HD account that is missing accountOptions.hd", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.HD,
                    });
                }, /^accountOptions.hd parameter missing$/);
            });

            it("should throw if creating a LOOSE account that is missing accountOptions.privateKey", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.LOOSE,
                    });
                }, /^accountOptions.privateKey parameter missing$/);
            });

            it("should throw if creating a HARDWARE account that is missing accountOptions.address", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                        type: AccountType.HARDWARE,
                    });
                }, /^accountOptions.address parameter missing$/);
            });

            it("should throw if creating an account with no type", async () => {
                assert.throws(() => {
                    const account: GenericAccount = mapper.getInstance( DynamicClassName, {
                        node: TestNode,
                    });
                }, /^accountOptions.type \'undefined\' not found$/);
            });
        });
    });
});
