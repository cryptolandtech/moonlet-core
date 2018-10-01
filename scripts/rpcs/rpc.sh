#!/bin/bash

if [[ "$1" == "start" ]]; then
    sh start_all.sh
else
    sh stop_all.sh
fi
