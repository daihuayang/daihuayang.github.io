#!/bin/bash
# SSH 连接维护脚本
ssh-add -D
ssh-add --apple-use-keychain ~/.ssh/github_key
ssh -O check github.com
ping -c 4 github.com 