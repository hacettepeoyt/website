#!/usr/bin/env bash

set -e

cd $(dirname "$BASH_SOURCE")

for f in test_*.sh; do
  echo "=== Running $f ==="
  ./$f
done
