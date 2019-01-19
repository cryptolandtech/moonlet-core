import { Ethereum } from '../../src/blockchain/ethereum/class.index';
import { assert } from "chai";
import mocha from "mocha";

import { Wallet, Blockchains, AccountType, MnemonicUtils } from "../../src/index";
import { GenericAccount } from "../../src/core/account";
import { GenericNode } from "../../src/core/node";
import { GenericTransaction } from "../../src/core/transaction";
import { GenericAccountUtils } from "../../src/core/account-utils";

import DynamicClassMapper from "../../src/class.store";
import Zilliqa from '../../src/blockchain/zilliqa/class.index';

const mapper = new DynamicClassMapper();
mapper.collectClasses(Zilliqa.AvailableClasses);
mapper.collectClasses(Ethereum.AvailableClasses);
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ZILLIQA] );

const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Core", async () => {

    describe("ZilliqaTransaction", async () => {

        describe("one Zilliqa account", async () => {

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
            defaultWallet.loadBlockchain(Ethereum);
            defaultWallet.loadBlockchain(Zilliqa);
            const blockchain = Blockchains.ZILLIQA;
            const AccountClassTypeString = GenericAccount.getImplementedClassName( Blockchains[blockchain] );
            const NodeClassTypeString = GenericNode.getImplementedClassName( Blockchains[blockchain] );
            const TransactionClassTypeString = GenericTransaction.getImplementedClassName( Blockchains[blockchain] );

            const account = defaultWallet.createAccount(blockchain);

            it("should create first account", async () => {

                const getAccount = defaultWallet.getAccounts(blockchain)[0];
                const getIndex = defaultWallet.accounts.get(blockchain)[0];

                assert.equal( getAccount.constructor.name, AccountClassTypeString, "class does not match expected" );
                assert.equal( account, getAccount, "Accounts do not match" );
                assert.equal( account, getIndex, "Accounts do not match" );

                assert.equal( NodeClassTypeString, account.node.constructor.name, "class does not match expected" );

                const HDKey = account.hd;
                assert.isNotNull( HDKey, "HDRootKey should not be null" );

                assert.isTrue( account.utils.isValidPrivate( Buffer.from(account.privateKey.replace("0x", ""), "hex") ), "private key is invalid" );
                assert.equal( HDKey.constructor.name, "HDKey", "HDKey class does not match expected" );
                assert.equal( HDKey.npmhdkey.depth, 5, "HDKey depth does not match" );
                assert.equal( HDKey.npmhdkey.index, 0, "HDKey index does not match" );

            });

            it("wallet should have 1 account", async () => {
                const getAccounts = defaultWallet.getAccounts(blockchain);
                assert.equal( getAccounts.length, 1, "getAccounts length does not match" );
            });

            describe("create a new zilliqa transaction, chainId = 1 (MainNet)", async () => {

                const txOptions = [
                    account.address,    // from me
                    account.address,    // to receiver
                    1,                  // value in qa
                    1,                  // account nonce
                    {
                        gasLimit: 1,    // default transfer gas limit
                        gasPrice: 1,    // price in qa
                        chainId: account.node.network.chainId, // current network chain id
                    },
                ];
                const Transaction: GenericTransaction = mapper.getInstance( TransactionClassTypeString, txOptions  );

                /*
                describe("toParams()", async () => {
                    const params = Transaction.toParams();

                    it("version should be 65537", async () => {
                        assert.equal( params.version, 65537, "params version does not match" );
                    });
                });
                */

            });

            describe("create a new zilliqa transaction, chainId = 2 (TestNet)", async () => {

                const txOptions = [
                    account.address,    // from me
                    account.address,    // to receiver
                    1,                  // value in qa
                    1,                  // account nonce
                    {
                        gasLimit: 1,    // default transfer gas limit
                        gasPrice: 1,    // price in qa
                        chainId: 2,     // current network chain id
                    },
                ];
                const Transaction: GenericTransaction = mapper.getInstance( TransactionClassTypeString, txOptions  );

                describe("toParams()", async () => {
                    const params = Transaction.toParams();

                    it("version should be 131073", async () => {
                        assert.equal( params.version, 131073, "params version does not match" );
                    });
                });

            });

        });

    });

});
