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

add your identifier in src/core/blockchain.ts

copy src/ethereum to src/yourblockchain and create your types
