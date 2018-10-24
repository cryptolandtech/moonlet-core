import { Ethereum } from './../../src/blockchain/ethereum/class.index';
import { assert } from "chai";
import mocha from "mocha";

import DynamicClassMapper from "../../src/class.store";

import { Wallet, Blockchains } from "../../src/index";
import { GenericNode } from "../../src/core/node";
import { GenericAccount } from "../../src/core/account";
import { BigNumber } from 'bignumber.js';
import { EthereumTransaction } from "../../src/blockchain/ethereum/transaction";

import EthereumTx from 'ethereumjs-tx';
import { GenericTransaction } from "../../src/core/transaction";
import Zilliqa from '../../src/blockchain/zilliqa/class.index';

const mapper = new DynamicClassMapper();
mapper.collectClasses(Zilliqa.AvailableClasses);
mapper.collectClasses(Ethereum.AvailableClasses);
const DynamicClassName = GenericNode.getImplementedClassName( Blockchains[Blockchains.ETHEREUM] );

const receiverAddress = "0x52b333c238Bf73888fDDe266E9D2A39B75752807";
const mnemonic = "exchange neither monster ethics bless cancel ghost excite business record warfare invite";

describe("Core", async () => {

    describe("EthereumNode", async () => {

        describe("Infura test", async () => {

            const defaultWallet: Wallet = new Wallet(mnemonic, "EN");
            defaultWallet.loadBlockchain(Ethereum);
            defaultWallet.loadBlockchain(Zilliqa);
            const blockchain = Blockchains.ETHEREUM;
            const WalletBlockchain = defaultWallet.getBlockchain( blockchain );
            const WalletTestNode: GenericNode = WalletBlockchain.getNode();
            WalletTestNode.init( WalletTestNode.NETWORKS[ 2 ] );
            const account = defaultWallet.createAccount(blockchain);

            it("should work", async () => {
                try {
                    const nonce = await account.getNonce();
                    const tx = account.buildTransferTransaction(receiverAddress, 1, nonce, 30, 21000);
                    account.signTransaction(tx);
                    await account.send(tx);

                } catch (e) {
                    console.log(e);
                }
            });
        });
    });
});
