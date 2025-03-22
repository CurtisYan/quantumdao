# Quantum Consensus 部署指南

本文档提供了部署Quantum Consensus网站的详细步骤和解决方案。

## 常见错误修复

我们已经修复了以下TypeScript类型错误：

### 1. Canvas 'null' 检查问题
修复了以下文件中的canvas为null的类型安全问题：
- `components/enhanced-hero-animation.tsx`
- `components/hero-animation.tsx`
- `components/particle-background.tsx`

### 2. 模块类型定义问题
添加了所需依赖的类型定义：
- `@radix-ui/react-label`相关的类型

### 3. 翻译上下文类型问题
在`contexts/language-context.tsx`中添加了正确的类型定义：
- 添加了`TranslationEntry`和`TranslationsType`类型
- 修复了translations对象的索引签名问题

### 4. Canvas辅助函数库
创建了`lib/canvas-helpers.ts`辅助函数库：
- 提供类型安全的canvas操作方法
- 解决常见的"canvas is possibly null"错误
- 为未来的canvas开发提供更健壮的基础设施

## 部署步骤

### 1. 登录服务器
```bash
ssh root@112.74.51.206
```

### 2. 更新代码
```bash
cd /var/www/quantum-consensus/quantumdao/quantum-consensus
git pull origin main
```

### 3. 安装依赖
```bash
npm install
```

### 4. 重新构建
```bash
npm run build
```

### 5. 重启服务
如果使用PM2管理Node应用：
```bash
pm2 restart quantum-consensus
```

如果需要重新启动：
```bash
pm2 stop quantum-consensus 2>/dev/null || true
pm2 delete quantum-consensus 2>/dev/null || true
pm2 start npm --name "quantum-consensus" -- start
pm2 save
```

### 6. 验证部署
访问网站确认部署成功：
```
https://quantumdao.top
```

### 7. 问题排查
如果仍然遇到问题，可以：
- 检查PM2日志：`pm2 logs quantum-consensus`
- 检查Nginx日志：`tail -f /var/log/nginx/error.log`
- 检查构建错误：重新手动构建`npm run build`并查看错误信息

## 未来开发建议

1. 使用新创建的canvas-helpers库处理所有canvas操作，避免类型错误
2. 在添加新的UI组件时确保正确安装所有依赖包
3. 为国际化文本使用严格的类型定义
4. 进行任何更改后，在本地进行类型检查和构建测试`npm run build` 