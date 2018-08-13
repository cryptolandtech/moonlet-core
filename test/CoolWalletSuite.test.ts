import HDWallet from '../src/base/wallet/HDWallet';
import { DummyWallet, Blockchain, DummyNode, Network, DummyWalletFactory, Account } from '../src/base/wallet/CoolWalletSuite';

describe.skip('Cool Wallet Suite', function () {
    it('Usage examples', function () {

        // ----------------------
        // Using Wallet Class
        // ----------------------
        const wallet = new DummyWallet();
        wallet.import(Blockchain.Ethereum, "ETH 1", "0x876524e876..", "pubkey0dfh", "privateKey");
        wallet.import(Blockchain.Ethereum, "ETH 2", "0x25356a4e5c..", "pubkey...", "privateKey");
        wallet.import(Blockchain.Bitcoin, "BTC 1", "1oyugde64gffo", "pubkey", "privateKey");

        let account = wallet.setCurrentAccount(Blockchain.Ethereum, "0x876524e876..");

        // do stuff
        // Using the node
        let node = new DummyNode(new Network("Ethereum Main Net", Blockchain.Ethereum, "https://ropsten.infura.io/v3/dededed34345"))
        node.getBalance(account);
        node.signMessage(wallet.getCurrentAccount(), "My cool wallet");

        // ----------------------
        // Using Wallet Factory
        // ----------------------
        const factory = new DummyWalletFactory();
        const wallet2 = factory.fromMnemonics("mnemonic phrase");
        let accounts = wallet2.getAccounts();

        // select first ETH account
        // @ts-ignore
        let ethAddresses = accounts.get(Blockchain.Ethereum);
        // @ts-ignore
        let ethAccountAddress = ethAddresses.get("some address");
        // @ts-ignore
        let account2 = wallet2.setCurrentAccount(Blockchain.Ethereum, ethAccountAddress.address);

        // do stuff
        node.getBalance(account);
        node.signMessage(wallet.getCurrentAccount(), "My cool wallet");

        // ----------------------
        // Single Account
        // ----------------------
        // const node = new Node(/* network config, from a const */);
        const account3 = new Account("ETH", Blockchain.Ethereum, "0xaddress.....", "public key", "private key");

        // do stuff
        node.getBalance(account);
        node.signMessage(wallet.getCurrentAccount(), "My cool wallet");
    })
})
