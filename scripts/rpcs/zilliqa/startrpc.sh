#!/bin/bash

# Exit script as soon as a command fails.
set -o errexit

moduleName="zilliqa"
softwareName="Kaya"
testrpc_port=4200
SeedFile="scripts/rpcs/_seed_words"
seedWords=$(<"$SeedFile")

testrpc_running() {
  nc -z localhost "$testrpc_port"
}

start_testrpc() {
  node_modules/.bin/kaya --accounts scripts/rpcs/account-fixtures.json > scripts/TestRPCData/$moduleName.output.log &
  testrpc_pid=$!
  echo $testrpc_pid > scripts/TestRPCData/$moduleName.process.pid
}

if testrpc_running; then
  if [[ "$1" != "use-existing" ]]; then
    echo "Killing existing $softwareName instance at port $testrpc_port"
    kill -9 $( lsof -i -P | grep $testrpc_port | awk '{print $2}' ) > /dev/null
    echo "Starting new $softwareName instance at port $testrpc_port"
    start_testrpc
  else
    echo "Using $softwareName instance at port $testrpc_port"
  fi
else
  echo "Starting new $softwareName instance at port $testrpc_port"
  start_testrpc
fi
