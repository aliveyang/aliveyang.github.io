# Giscus 评论系统配置指南

本指南将帮助你完成从 Disqus 到 Giscus 的评论系统迁移。

## 什么是 Giscus？

Giscus 是一个基于 GitHub Discussions 的评论系统，具有以下优势：

- **开源免费**：完全开源，无广告
- **隐私友好**：不追踪用户，符合 GDPR
- **GitHub 集成**：使用 GitHub 账号登录，对开发者友好
- **Markdown 支持**：完整的 Markdown 和代码高亮支持
- **主题自适应**：支持亮色/暗色主题自动切换
- **轻量快速**：比 Disqus 更轻量，加载更快

## 配置步骤

### 1. 启用 GitHub Discussions

1. 访问你的仓库：https://github.com/aliveyang/aliveyang.github.io
2. 点击 **Settings** (设置)
3. 在左侧菜单找到 **Features** (功能)
4. 勾选 **Discussions** (讨论)

### 2. 安装 Giscus App

1. 访问：https://github.com/apps/giscus
2. 点击 **Install** (安装)
3. 选择 **Only select repositories** (仅选择的仓库)
4. 选择 `aliveyang/aliveyang.github.io`
5. 点击 **Install** 完成安装

### 3. 获取配置参数

1. 访问 Giscus 配置页面：https://giscus.app/zh-CN
2. 在 "仓库" 输入框填写：`aliveyang/aliveyang.github.io`
3. 等待验证通过（显示绿色勾号）
4. 在 "Discussion 分类" 选择：
   - 推荐选择 **Announcements** (公告) - 只有仓库维护者可以创建新讨论
   - 或选择 **General** (常规) - 任何人都可以创建新讨论
5. 向下滚动到 "启用 giscus" 部分
6. 复制以下两个重要参数：
   - `data-repo-id="..."`
   - `data-category-id="..."`

### 4. 更新配置文件

编辑 `config.toml`，找到 `[params.giscus]` 部分，填入你获取的参数：

```toml
[params.giscus]
  enable = true
  repo = "aliveyang/aliveyang.github.io"
  repoId = "R_kgDO..."  # 从 giscus.app 复制
  category = "Announcements"  # 或 "General"
  categoryId = "DIC_kwDO..."  # 从 giscus.app 复制
  mapping = "pathname"
  strict = "0"
  reactionsEnabled = "1"
  emitMetadata = "0"
  inputPosition = "top"
  theme = "preferred_color_scheme"
  lang = "zh-CN"
  loading = "lazy"
```

### 5. 测试评论系统

1. 本地测试：
   ```bash
   hugo server -D
   ```
   访问 http://localhost:1313 查看文章页面

2. 部署到生产环境：
   ```bash
   git add .
   git commit -m "feat: 迁移评论系统从 Disqus 到 Giscus"
   git push origin dev
   ```

3. 等待 GitHub Actions 部署完成后，访问你的博客文章页面，应该能看到 Giscus 评论框

## 配置选项说明

### mapping（映射方式）
- `pathname`：使用页面路径（推荐）
- `url`：使用完整 URL
- `title`：使用页面标题
- `og:title`：使用 Open Graph 标题

### inputPosition（评论框位置）
- `top`：评论框在评论列表上方
- `bottom`：评论框在评论列表下方

### theme（主题）
- `light`：亮色主题
- `dark`：暗色主题
- `preferred_color_scheme`：跟随系统主题（推荐）
- `transparent_dark`：透明暗色
- 更多主题：https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme

## 禁用评论系统

如果需要临时禁用评论系统，只需在 `config.toml` 中设置：

```toml
[params.giscus]
  enable = false
```

## 单篇文章禁用评论

在文章的 Front Matter 中添加：

```toml
+++
title = "文章标题"
date = 2025-01-04
comments = false  # 禁用评论
+++
```

然后修改 `layouts/partials/giscus.html`，在第一行添加条件判断：

```html
{{ if and .Site.Params.giscus.enable (ne .Params.comments false) }}
```

## 迁移现有评论

Giscus 无法直接导入 Disqus 评论。如果需要保留旧评论，有以下选择：

1. **保留 Disqus**：暂时保留 Disqus 代码（已注释），需要时可以恢复
2. **手动迁移**：将重要评论手动复制到 GitHub Discussions
3. **双系统并存**：同时显示两个评论系统（不推荐）

## 故障排查

### 评论框不显示

1. 检查 GitHub Discussions 是否已启用
2. 检查 Giscus App 是否已安装并授权
3. 检查 `repoId` 和 `categoryId` 是否正确
4. 打开浏览器控制台查看错误信息

### 无法发表评论

1. 确认已登录 GitHub 账号
2. 确认仓库是公开的（public）
3. 如果使用 Announcements 分类，确认你是仓库维护者

### 评论加载缓慢

1. 检查网络连接
2. Giscus 使用 GitHub API，在某些地区可能较慢
3. 考虑使用 `loading="lazy"` 延迟加载

## 进一步定制

### 自定义样式

编辑 `layouts/partials/giscus.html` 中的 `<style>` 部分：

```css
.giscus-comments {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e4e8;
  /* 添加你的自定义样式 */
}
```

### 自定义主题

Giscus 支持自定义 CSS 主题，详见：
https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#custom-themes

## 相关资源

- Giscus 官网：https://giscus.app/zh-CN
- Giscus GitHub：https://github.com/giscus/giscus
- 高级用法：https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
- 问题反馈：https://github.com/giscus/giscus/discussions

## 对比 Disqus

| 特性 | Giscus | Disqus |
|------|--------|--------|
| 开源 | ✅ 是 | ❌ 否 |
| 免费 | ✅ 完全免费 | ⚠️ 有广告 |
| 隐私 | ✅ 不追踪 | ❌ 追踪用户 |
| 加载速度 | ✅ 快 | ⚠️ 较慢 |
| Markdown | ✅ 完整支持 | ⚠️ 有限支持 |
| 代码高亮 | ✅ 支持 | ❌ 不支持 |
| 登录方式 | GitHub | 多种方式 |
| 适用人群 | 技术博客 | 通用博客 |

## 总结

Giscus 是一个现代化、轻量级的评论系统，特别适合技术博客。通过本指南，你应该能够成功完成迁移。如有问题，欢迎在 GitHub Discussions 中提问。
