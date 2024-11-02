#!/bin/bash
go mod init nextjs-wasm
tinygo build -o adder.wasm -target wasm adder.go
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js .