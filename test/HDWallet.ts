import { assert } from "chai";
import mocha from "mocha";
import HDWallet from "../src/base/wallet/HDWallet";

describe("HDWallet", () => {

    const TestMnemonic = "between culture long bounce pact oxygen panel fun assist favorite symptom floor";

    let module: HDWallet;

    beforeEach( () => {
        // const parameters: CoreSetupParams = [];
        module = new HDWallet( {coin: "ZIL"} );
    });

    it("Should instantiate with no accounts", () => {
        // const accountCount = module..getAllAddresses().length;
        // assert.equal(accountCount, 0, "Address count invalid");
    });

});
