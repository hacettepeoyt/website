#!/usr/bin/env bash

set -e

source util.sh

check "" GET
check "about" GET
check "events" GET
check "arge" GET
check "contact" GET
check "enroll" GET
