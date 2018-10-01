#!/bin/bash

if [[ "$1" == "start" ]]; then
    sh rpcs/start_all.sh
else
    sh rpcs/stop_all.sh
fi
