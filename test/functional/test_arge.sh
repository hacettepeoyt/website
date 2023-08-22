#!/usr/bin/env bash

set -e

source util.sh

check "arge" POST -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-raw "img=https://i.imgur.com/LYPm0SE.png&name=AOE2&description=aaaa&status=87&repository=https://github.com/hacettepeoyt&auth=$AUTH_KEY"

check_mongo_output "projects" "AOE2"

OBJECT_ID=$(get_object_id "projects" "AOE2")

check "arge/$OBJECT_ID" DELETE -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

check_mongo_output_fail "projects" "AOE2"
