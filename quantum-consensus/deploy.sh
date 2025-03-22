#!/bin/bash

# 设置变量
DOMAIN="quantumdao.top"
APP_NAME="quantum-consensus"

# 构建Docker镜像
echo "构建Docker镜像..."
docker build -t $APP_NAME:latest .

# 停止并删除旧容器（如果存在）
echo "停止旧容器..."
docker stop $APP_NAME 2>/dev/null || true
docker rm $APP_NAME 2>/dev/null || true

# 启动新容器
echo "启动新容器..."
docker run -d --name $APP_NAME \
  -p 3000:3000 \
  --restart always \
  $APP_NAME:latest

echo "部署完成！"
echo "在服务器上设置Nginx反向代理后，应用将可通过 https://$DOMAIN 访问" 