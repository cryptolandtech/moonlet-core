"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const validateArgs = utils_1.default.validateArgs;
class Node {
    constructor(args) {
        validateArgs(args, {
            url: [utils_1.default.isUrl],
        });
        this.url = args.url;
        this.apiUrl = "https://api.zilliqa.com";
    }
}
module.exports = Node;
//# sourceMappingURL=node.js.map