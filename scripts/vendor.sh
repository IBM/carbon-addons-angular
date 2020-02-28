#!/usr/bin/env bash

set -e # exit with nonzero exit code if anything fails

mkdir -p src/vendor/@carbon

cp -R node_modules/@carbon/colors src/vendor/@carbon/
cp -R node_modules/@carbon/layout src/vendor/@carbon/
