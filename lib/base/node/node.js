"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const validateArgs = Utils.validateArgs;
class Node {
    constructor(args) {
        /*
        validateArgs(args, {
            url: [Utils.isUrl],
        });
        */
        this.url = args.url;
        this.apiUrl = "https://api.zilliqa.com";
    }
}
module.exports = Node;
//# sourceMappingURL=node.js.map