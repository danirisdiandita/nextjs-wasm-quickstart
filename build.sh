#!/bin/bash

MODULE_NAME=cpp/adder
OUTPUT_JS=src/wasm/adder_wasm.js

mkdir -p src/wasm

emcc ${MODULE_NAME}.cpp \
 -o ${OUTPUT_JS} \
 -s EXPORT_ES6=1 \
 -s 'EXPORT_NAME="$MODULE_NAME"' \
 -s 'ENVIRONMENT="web"' \
 -s 'SINGLE_FILE=1'
