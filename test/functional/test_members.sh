#!/usr/bin/env bash

set -e

source util.sh

# FIXME: This can return 404 while enrollment being successful.
echo "Ignore if the following command returns a 404:"
check "enroll" POST -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-raw 'firstName=Kasane&lastName=Teto&email=c%40d.org&department=m&degree=4.+S%C4%B1n%C4%B1f&mobileNumber=123&studentID=123&groupChat=Signal&tellus=aaaa' || true

check_output "members" "Teto" -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

check "members/123" DELETE -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

check_output_fail "members" "Teto" -H "Content-Type: application/json" --data "{\"auth\": \"$AUTH_KEY\"}"

