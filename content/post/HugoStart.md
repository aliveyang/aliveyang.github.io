+++
tags = ["Hugo"]
date = "2019-06-15"
title = "Hugo 使用备忘"
+++
**Hugo 基础使用**
<!--more-->

Hugo 是用 Go 编写的静态站点生成器

## 安装

### Windows 手动安装
下载 [hugo.exe](https://github.com/gohugoio/hugo/releases) 配置全局环境变量
```bash
hugo version
```

### 快速安装
```bash
# macOS
brew install hugo

# Windows
choco install hugo -confirm

# Linux
sudo apt-get install hugo
```

## 基本操作

### 创建站点
```bash
hugo new site myblog
```

### 添加主题
```bash
cd myblog/themes
git clone https://github.com/NightFarmer/hugo-theme-yelee.git yelee
```

### 配置 config.toml
```toml
baseURL = "https://aliveyang.github.io/"
languageCode = "zh-CN"
title = "alive yang"
theme = "yelee"

[params]
  description = "alive yang's blog"
  author = "alive yang"
  use_cdn = true              # 启用 CDN
  lazy_load_images = true     # 图片懒加载

# 忽略文件
ignoreFiles = ["draft\\.md$", "private\\.md$", "我的模板\\.md$"]

# 资源压缩
[minify]
  [minify.tdewolff.html]
    keepWhitespace = false
  [minify.tdewolff.css]
    keepCSS2 = false
  [minify.tdewolff.js]
    keepVarNames = false

# 图片优化
[imaging]
  quality = 85
  resampleFilter = "lanczos"
```

### 创建文章
```bash
hugo new post/my-post.md
```

**文章模板**
```markdown
+++
title = "文章标题"
date = 2025-12-13
tags = ["标签1", "标签2"]
+++
**简介**
<!--more-->
# 正文内容
```

### 本地运行
```bash
# 使用便捷脚本（Windows）
dev.bat

# 或直接运行
hugo server -w -D
```
访问 http://localhost:1313

### 构建
```bash
# 使用便捷脚本（Windows）
build.bat

# 或直接构建
hugo --minify
```
生成文件在 `./public/`

## GitHub Actions 自动部署

`.github/workflows/action.yml`
```yaml
name: Deploy Hugo Site

on:
  push:
    branches:
      - dev
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          external_repository: aliveyang/aliveyang.github.io
          personal_token: ${{ secrets.MY_BLOG_ACTION_PAGE }}
          publish_dir: ./public
          publish_branch: main
```

**说明**
- `dev` 分支：源文件
- `main` 分支：构建后的静态文件
- 推送到 `dev` 自动触发部署

## 参考
- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Yelee 主题](https://github.com/NightFarmer/hugo-theme-yelee)

---

## Shortcode 测试

### 音乐播放器
{{< music "music.163.com/outchain/player?type=2&id=1387564796&auto=1&height=66" >}}

### 图片懒加载
{{< img src="/img/head-portrait.jpg" alt="头像" caption="示例图片" >}}

### Bilibili 视频
{{< bilibili BV1e44y1i7Kt >}}

### YouTube 视频
{{< youtube w7Ft2ymGmfc >}}

<!-- 测试同步工作流 - 2026-01-04 -->

