/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['quantumdao.top'],
    unoptimized: true
  },
  output: 'standalone', // 用于生成独立部署的项目
  // 添加环境变量配置
  env: {
    SITE_URL: 'https://quantumdao.top'
  }
};

module.exports = nextConfig; 