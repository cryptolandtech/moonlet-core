import { ZilliqaUtil as Utils } from "generichd-wallet";

// const validateArgs = Utils.validateArgs;

class Node {
    private url: string;
    private apiUrl: string;

    constructor( args: any ) {
        /*
        validateArgs(args, {
            url: [Utils.isUrl],
        });
        */
        this.url = args.url;
        this.apiUrl = "https://api.zilliqa.com";
    }

    // implement methods
}

module.exports = Node;
