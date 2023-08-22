#!/usr/bin/env bash

set -e

source util.sh

check "courses" POST -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-raw "img=https://i.imgur.com/LYPm0SE.png&name=VVindovvs12-101&description=aaaa&preRequisite[]=brain&preRequisite[]=eyes&location=D8&time=10.30&date=01.01.1970&duration=1day&auth=$AUTH_KEY"

check_mongo_output "courses" "VVindovvs12-101"

OBJECT_ID=$(get_object_id "courses" "VVindovvs12-101")

check "courses/$OBJECT_ID" DELETE -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

check_mongo_output_fail "courses" "VVindovvs12-101" -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"
