#!/usr/bin/env bash

set -e

source util.sh

check "events" POST -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-raw "img=https://i.imgur.com/LYPm0SE.png&name=OYG&description=aaaa&location=D8&time=10.30&date=01.01.1970&duration=1day&auth=$AUTH_KEY"

check_mongo_output "events" "OYG"

OBJECT_ID=$(get_object_id "events" "OYG")

check "events/$OBJECT_ID" DELETE -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

check_mongo_output_fail "events" "OYG"
