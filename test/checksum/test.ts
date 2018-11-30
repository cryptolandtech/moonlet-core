import { assert } from "chai";
import mocha from "mocha";
import { checksummedStore } from './checksum.fixtures';
import * as ZilliqaJsCrypto from "@zilliqa-js/crypto";
const laksaUtil = require('laksa-core-crypto');

describe("Zilliqa address checksums", async () => {

    it("should match 3rd party laksa-core-crypto implementation", async () => {
        for (let i = 0; i < checksummedStore.length; i++) {
            if (checksummedStore[i]) {
                const current = checksummedStore[i].good;
                const officialAddr = ZilliqaJsCrypto.toChecksumAddress( current );
                const laksaAddr = laksaUtil.toChecksumAddress( current );
                assert.equal( officialAddr, laksaAddr, "Addresses do not match");

                assert.isTrue( laksaUtil.isValidChecksumAddress( officialAddr ), "Laksa isChecksumAddress check failed");
                assert.isTrue( ZilliqaJsCrypto.isValidChecksumAddress( laksaAddr ), "Official isChecksumAddress check failed");
            }
        }
    });

});
