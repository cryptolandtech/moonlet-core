import EthereumTx from 'ethereumjs-tx';

export default class Deployer {

    public address: string;
    public privateKey: string;
    public node: any;

    constructor( address: string, privateKey: string) {
        this.address = address;
        this.privateKey = privateKey;
    }

    public async createTx( node: any, txdata: string ): Promise<any> {
        const tx = new EthereumTx( {
            from: this.address,
            nonce: await node.getNonce(this.address),
            data: txdata,
            gasPrice: 20000000000, // default rpc
            gasLimit: 6700000,
        });
        tx.sign( Buffer.from( this.privateKey, "hex" ) );
        return tx.serialize();
    }

    public async getTransactionReceipt(id: string): Promise<any> {
        return this.node.rpcCall("eth_getTransactionReceipt", [id], "raw") as Promise<any>;
    }

    public async deployContract(node: any, txdata: string ): Promise<any> {
        this.node = node;
        const tx = await this.createTx( node, txdata );
        const txHash = await this.node.sendRaw( tx );
        return this.getTransactionReceipt( txHash );
    }

}
