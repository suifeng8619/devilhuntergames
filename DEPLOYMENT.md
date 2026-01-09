# Devil Hunter Games - 部署指南

## 🚀 快速部署到 Vercel

### 方法 1：GitHub Integration（推荐）

#### 步骤 1：创建 GitHub 仓库

```bash
# 在 GitHub 上创建新仓库：devilhuntergames
# 然后在本地连接远程仓库

git remote add origin https://github.com/YOUR_USERNAME/devilhuntergames.git
git branch -M main
git push -u origin main
```

#### 步骤 2：连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Import Project"
4. 选择你的 `devilhuntergames` 仓库
5. Vercel 会自动检测 Next.js 配置
6. 点击 "Deploy"（无需任何配置）

#### 步骤 3：配置自定义域名

1. 部署完成后，进入项目设置
2. 点击 "Domains"
3. 添加 `devilhuntergames.com`
4. 按照 Vercel 提示配置 DNS 记录

### 方法 2：Vercel CLI（快速）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 首次部署
vercel

# 部署到生产环境
vercel --prod
```

---

## ✅ 部署前检查清单

### 功能检查
- [x] 所有页面构建成功（17个路由）
- [x] 契约详情页全部生成（8个）
- [x] Build Planner 交互正常
- [x] Quick Start 指南完整
- [x] 天赋列表显示正常

### SEO 检查
- [x] sitemap.xml 生成（/sitemap.xml）
- [x] robots.txt 生成（/robots.txt）
- [x] 所有页面有 unique metadata
- [x] Open Graph 标签配置
- [x] Twitter 卡片配置

### 性能检查
- [x] 生产构建成功（2.1秒编译）
- [x] 所有页面使用 SSG
- [x] 字体优化（next/font/google）
- [x] 代码自动分割

### 响应式检查
- [x] Header 移动端汉堡菜单
- [x] Footer 响应式布局
- [x] 数据库卡片网格自适应
- [x] Build Planner 移动端友好

---

## 📊 部署后验证

### 1. 基础功能测试

访问以下 URL 确认正常：

```
https://devilhuntergames.com
https://devilhuntergames.com/quick-start
https://devilhuntergames.com/builds/planner
https://devilhuntergames.com/database/contracts
https://devilhuntergames.com/database/contracts/future-devil
https://devilhuntergames.com/database/talents
https://devilhuntergames.com/sitemap.xml
https://devilhuntergames.com/robots.txt
```

### 2. SEO 验证

#### Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加资源：`devilhuntergames.com`
3. 验证所有权（选择 DNS 或 HTML 标签验证）
4. 提交 sitemap：`https://devilhuntergames.com/sitemap.xml`

#### 测试工具

- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/

### 3. 社交媒体预览

#### Open Graph 测试
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

输入你的页面 URL 查看预览效果。

### 4. 性能指标

使用 Lighthouse 检查以下指标（目标值）：

```
Performance:        > 90
Accessibility:      > 95
Best Practices:     > 90
SEO:                > 95

Core Web Vitals:
├── LCP (Largest Contentful Paint):  < 2.5s
├── FID (First Input Delay):         < 100ms
└── CLS (Cumulative Layout Shift):   < 0.1
```

### 5. 浏览器兼容性

测试以下浏览器：
- Chrome（最新版）
- Safari（最新版）
- Firefox（最新版）
- Edge（最新版）

移动端测试：
- iOS Safari
- Android Chrome

---

## 🔧 常见部署问题

### 问题 1：构建失败 - TypeScript 错误

**解决方案**：
```bash
# 本地构建测试
npm run build

# 如果有类型错误，修复后重新提交
git add .
git commit -m "fix: Resolve TypeScript errors"
git push
```

### 问题 2：404 错误 - 页面找不到

**原因**：动态路由配置问题

**检查**：
- `/app/database/contracts/[id]/page.tsx` 中的 `generateStaticParams` 是否正常
- `content/database/contracts.json` 文件是否存在

### 问题 3：样式错误 - Tailwind 不生效

**解决方案**：
```bash
# 检查 tailwind.config.ts 中的 content 配置
# 应该包含所有组件路径
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### 问题 4：字体加载慢

**已优化**：使用 `next/font/google` 自动优化字体加载

### 问题 5：sitemap.xml 404

**检查**：
- `/app/sitemap.ts` 文件是否存在
- 构建日志中是否有 sitemap.xml 生成记录

---

## 🎯 部署后待办事项

### 立即执行（Day 1）

- [ ] 提交 sitemap 到 Google Search Console
- [ ] 配置 Google Analytics（可选）
- [ ] 在 Discord/Reddit 宣传网站
- [ ] 创建社交媒体账号（Twitter/Discord）

### 本周执行（Week 1）

- [ ] 监控 Vercel Analytics 数据
- [ ] 收集用户反馈
- [ ] 修复用户报告的 bug
- [ ] 优化首页转化率

### 本月执行（Month 1）

- [ ] 分析 SEO 表现（Search Console）
- [ ] 优化核心关键词排名
- [ ] 添加更多契约/天赋（如游戏更新）
- [ ] 开始 Phase 2 开发（搜索、Build对比）

---

## 📈 监控与维护

### Vercel Dashboard

访问 [Vercel Dashboard](https://vercel.com/dashboard) 监控：

- **部署状态**：每次 git push 自动部署
- **Analytics**：访问量、页面性能
- **Logs**：构建日志、运行时错误
- **Domains**：域名配置、SSL 证书

### Google Search Console

定期检查（每周）：

- **Performance**：点击率、展示次数、排名
- **Coverage**：索引覆盖率、爬取错误
- **Enhancements**：结构化数据、移动可用性
- **Sitemap**：sitemap 提交状态

### Google Analytics（可选）

如需添加：

```bash
# 在 Vercel 环境变量中添加
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

然后在 `app/layout.tsx` 中添加 Google Analytics 脚本。

---

## 🚨 紧急回滚

如果部署后发现严重问题：

### Vercel Dashboard 回滚

1. 进入项目的 Deployments 页面
2. 找到上一个稳定版本
3. 点击 "Promote to Production"
4. 立即回滚到旧版本

### Git 回滚

```bash
# 回滚到上一个 commit
git revert HEAD
git push

# 或强制回滚到指定版本
git reset --hard <commit-hash>
git push -f  # 慎用！会覆盖远程历史
```

---

## 📞 获取帮助

### 官方资源

- **Next.js 文档**: https://nextjs.org/docs
- **Vercel 文档**: https://vercel.com/docs
- **Vercel 支持**: https://vercel.com/support

### 社区资源

- **Next.js Discord**: https://discord.gg/nextjs
- **Vercel Discord**: https://discord.gg/vercel
- **GitHub Issues**: 项目仓库的 Issues 页面

---

## ✨ 总结

当前项目状态：
- ✅ MVP 开发完成（100%）
- ✅ 所有功能测试通过
- ✅ SEO 优化完成
- ✅ 性能优化完成
- 🚀 **准备部署到 Vercel**

下一步：执行上述部署步骤，开始收集真实用户反馈！

---

**最后更新**: 2026-01-09
**项目状态**: Ready for Production 🎉
