# Wallet Suite - Core Logic Package

## Setup

`npm install`

## build lib

`npm run build`

## testing

Run the whole testing suite

```doc
npm run test
```

Single test run

```doc
npm run test-single test/testfile.ts

    "coverage": "scripts/run_coverage.sh all",
    "coverage-reuse": "scripts/run_coverage.sh all use-existing",
    "test": "scripts/run_tests.sh all",
    "test-reuse": "scripts/run_tests.sh all use-existing",
    "test-single": "scripts/run_tests.sh single",
    "test-single-reuse": "scripts/run_tests.sh single use-existing",
    "testToHtml": "scripts/testOutputToHtml.sh",
    "start-all-rpcs": "scripts/rpcs/start_all.sh",
    "stop-all-rpcs": "scripts/rpcs/stop_all.sh"
```

Test Coverage

```doc
npm run coverage
```

## TestRPC Helpers

Start All test rpcs

```doc
npm run start-all-rpcs
```

Stop all running test rpcs ( that have pids stored )

```doc
npm run stop-all-rpcs
```

***All test commands have a -reuse option available, meant to allow developers to keep TestRPC running between multiple invocations.***

```doc
npm run test-reuse
```

## adding support for new blockchains

Fork this repo.

add your identifier in src/core/blockchain.ts

copy src/blockchain/ethereum to src/blockchain/yourblockchain and create your types

add your class indexer into src/class.store.ts

copy test/ethereum to test/yourblockchain and update the tests

make sure to add your testrpc setup scripts in the /scripts folder

Once complete, submit a PR.