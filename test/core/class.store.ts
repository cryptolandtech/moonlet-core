import { assert } from "chai";
import mocha from "mocha";

import DynamicClass from "../../src/class.store";

describe("Core", async () => {

    describe("DynamicClass loader", async () => {

        describe("getInstance()", async () => {
            it("should fail silent on collect Classes", async () => {
                const classStore = new DynamicClass();
                classStore.collectClasses({
                    ClassName: false
                });
            });

            it("should throw if requested class name is not found in store", async () => {
                const classStore = new DynamicClass();

                assert.throws(() => {
                    // @ts-ignore: we're testing for this scenario
                    classStore.getInstance("test", undefined);
                }, /^Class type of \'test\' is not loaded\.$/);

            });
        });
    });
});
