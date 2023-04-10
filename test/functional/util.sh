#!/usr/bin/env bash

set -e

AUTH_KEY="${AUTH_KEY:-unrequitedloveandhewhosleepsbeneath}"
NODE_LOCAL_PORT="${NODE_LOCAL_PORT:-3000}"
BASE_URL="${BASE_URL:-http://127.0.0.1:$NODE_LOCAL_PORT}"

check() {
  ENDPOINT="$1"
  METHOD="$2"
  shift 2

  printf "Checking endpoint $ENDPOINT with method $METHOD... "
  if curl -fsSL -X $METHOD $BASE_URL/$ENDPOINT "$@" > /dev/null; then
    echo -e "\033[32mpass\033[0m"
  else
    echo -e "\033[31mfail\033[0m"
    false
  fi
}

check_output() {
  ENDPOINT="$1"
  OUTPUT="$2"
  shift 2

  printf "Checking endpoint $ENDPOINT for output '$OUTPUT'... "
  if curl -fsSL -X GET $BASE_URL/$ENDPOINT "$@" | grep "$OUTPUT" > /dev/null; then
    echo -e "\033[32mpass\033[0m"
  else
    echo -e "\033[31mfail\033[0m"
    false
  fi 
}

check_output_fail() {
  ENDPOINT="$1"
  OUTPUT="$2"
  shift 2

  printf "Checking endpoint $ENDPOINT for output without '$OUTPUT'... "
  if ! curl -fsSL -X GET $BASE_URL/$ENDPOINT "$@" | grep "$OUTPUT" > /dev/null; then
    echo -e "\033[32mpass\033[0m"
  else
    echo -e "\033[31mfail\033[0m"
    false
  fi 
}

