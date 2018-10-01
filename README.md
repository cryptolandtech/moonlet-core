# Moonlet - Core Package

## Setup

`npm install`

## Build lib

`npm run build`

## Testing

Run the whole testing suite

```doc
npm run test
```

Single test run

```doc
npm run test-single test/testfile.ts
```

Run tests in specific path

```doc
npm run test-single "test/1.core/*.ts"
```

Test Coverage

```doc
npm run coverage
```

***All test commands have a -reuse option available, meant to allow developers to keep TestRPC running between multiple invocations.***

Example:

```doc
npm run test-reuse
npm run test-single-reuse test/testfile.ts
npm run coverage-reuse
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

## Adding support for new blockchains

Fork this repo.

add your identifier in src/core/blockchain.ts

copy src/blockchain/ethereum to src/blockchain/yourblockchain and create your types

add your class indexer into src/class.store.ts

copy test/ethereum to test/yourblockchain and update the tests

make sure to add your testrpc setup scripts in the /scripts folder

Once complete, submit a PR.

## License

MIT