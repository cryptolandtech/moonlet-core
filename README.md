# Wallet Suite - Core Logic Package

## Setup
`npm install`

## build lib
`npm run build`

## testing
Run the whole testing suite
`npm run test`

Single test run
```
npm run test-single test/testfile.ts
```

## adding support for new blockchains

Fork this repo.

add your identifier in src/core/blockchain.ts

copy src/blockchain/ethereum to src/blockchain/yourblockchain and create your types

add your class indexer into src/class.store.ts

copy test/ethereum to test/yourblockchain and update the tests

Once complete, submit a PR.