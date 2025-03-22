# Quantum Consensus 网站

量子共识官方网站项目，基于Next.js构建的Web3项目展示平台。

## 本地开发指南

### 环境准备
- Node.js >= 14.0.0
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
开发服务器将在 http://localhost:3000 启动

## 代码更新与部署流程

当您修改了代码并需要将更改部署到线上环境时，请按照以下步骤操作：

### 1. 本地开发与测试

```bash
# 本地启动项目进行测试
npm run dev

# 构建项目检查是否有错误
npm run build
```

### 2. 提交代码到仓库

```bash
# 添加修改的文件
git add .

# 提交更改，使用有意义的提交信息
git commit -m "描述你的更改，例如：修复首页响应式问题"

# 推送到远程仓库
git push origin main
```

### 3. 服务器部署

登录到服务器后执行以下命令：

```bash
# 进入项目目录
cd /var/www/quantum-consensus/quantumdao/quantum-consensus

# 拉取最新代码
git pull origin main

# 安装依赖（如果有新增依赖）
npm install

# 构建项目
npm run build

# 重启应用
pm2 restart quantum-consensus

# 如果PM2中没有该应用，则使用以下命令启动
# pm2 start npm --name "quantum-consensus" -- start

# 保存PM2配置
pm2 save
```

### 4. 验证部署

访问 https://quantumdao.top 确认更改已成功部署。

## Nginx配置检查

如果网站无法访问或出现问题，可能需要检查Nginx配置：

```bash
# 检查Nginx配置是否正确
sudo nginx -t

# 如果有错误，编辑配置文件
sudo nano /etc/nginx/sites-enabled/quantumdao.top

# 确保配置正确指向应用端口（通常是3000）
# server {
#     listen 80;
#     server_name quantumdao.top www.quantumdao.top;
#     location / {
#         proxy_pass http://localhost:3000;
#         ...
#     }
# }

# 重启Nginx使配置生效
sudo systemctl restart nginx
```

## 故障排除

### 常见问题

1. **构建失败**：检查TypeScript类型错误和依赖问题
   ```bash
   # 查看详细构建日志
   npm run build
   ```

2. **网站无法访问**：检查PM2和Nginx状态
   ```bash
   # 检查应用运行状态
   pm2 status
   
   # 查看应用日志
   pm2 logs quantum-consensus
   
   # 检查Nginx错误
   sudo tail -f /var/log/nginx/error.log
   ```

3. **依赖问题**：确保所有依赖都已安装
   ```bash
   # 清除node_modules并重新安装
   rm -rf node_modules
   npm install
   ```

## 技术栈

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI
- PM2 (生产环境进程管理)
- Nginx (反向代理) 