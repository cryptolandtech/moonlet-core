#!/bin/bash
sh scripts/rpcs/start_all.sh $2
echo ""
echo "--------------------------------------------------------------------"
echo " Running all tests in \"test\" folder:"
echo "--------------------------------------------------------------------"

nyc mocha

echo "--------------------------------------------------------------------"
echo ""
sh scripts/rpcs/stop_all.sh $2
echo ""