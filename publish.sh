#!/bin/bash


# 执行打包命令
yarn build

git add ./

echo $1

# 修改版本号 major | minor | patch
npm version $1

# 发布
npm publish