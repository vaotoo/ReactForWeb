#!/bin/bash
export NODE_PATH=/home/xiaoju/node-v8.9.1-linux-x64:/home/xiaoju/node-v8.9.1-linux-x64/lib/node_modules
export PATH=/home/xiaoju/node-v8.9.1-linux-x64/bin:$PATH
workspace=$(cd $(dirname $0) && pwd -P)
rm -rf dist
rm -rf output
mkdir output
npm install
npm run build
mv dist output