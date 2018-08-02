const Node = require("../built/base/node/node");

const myNode = new Node({
    url:"http://localhost:4201",
    apiUrl:"https://scillaprod-api.aws.zilliqa.com",
});

console.log(myNode);
