+++
tags = ["hugo"]
date = "2019-06-15"
title = "Welcome"
+++
**hugo基础使用** 
<!--more-->

{{< music "music.163.com/outchain/player?type=2&id=1387564796&auto=1&height=66" right >}}

Hugo是一个用Go编写的静态站点生成器,非常好用（fake）。
##  安装

### window手动安装

[参考]:https://github.com/gohugoio/hugo/releases
下载的hugo.exe配置全局环境变量
```
hugo version
```
### 快速安装

macOS使用Homebrew
```
brew install hugo
```
Windows使用Chocolatey
```
choco install hugo -confirm
```
linux使用apt
```
sudo apt-get install hugo
```
## 操作

### 1、创建静态站点

```
hugo new site myblog
```
### 2、添加模板

```
cd myblog
cd themes
git clone https://github.com/NightFarmer/hugo-theme-yelee.git
```
### 3、配置默认模板

myblog 目录下 config.toml 修改
```
baseurl = "http://aliveyang.github.io/"
languageCode = "en-us"
title = "Fang Yang"
theme = "hugo-theme-yelee"
```
### 4、添加文章

模板信息
```
+++
title = "{{ replace .Name "-" " " | title }}"
date = {{ now.Format "2006-01-02" }}
tags = ["other"]
## categories = ["other"]
## draft = true 
+++
**简介**
<!--more-->
# 正文
```
新建文章
```
hugo new post/my-first-post.md
```
### 5、本地运行

myblog目录下
```
正常运行
hugo server
调试模式（data,content,layouts,static,themes/xxx）
hugo server -w
```
访问 localhost:1313
### 6、生成静态html

myblog目录下
```
hugo -D
```
生成静态文件在/myblog/public中，上传至github page即可

## GitHub Actions
`.github/workflows/action.yml`
```yaml
name: github pages # 名字自取

on:
  push:
    branches:
      - dev  # 这里的意思是当 main分支发生push的时候，运行下面的jobs，这里先改为github-actions

jobs:
  deploy: # 任务名自取
    runs-on: ubuntu-latest	# 在什么环境运行任务
    steps:
      - uses: actions/checkout@v2	# 引用actions/checkout这个action，与所在的github仓库同名
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive) 获取submodule主题
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo	# 步骤名自取
        uses: peaceiris/actions-hugo@v2	# hugo官方提供的action，用于在任务环境中获取hugo
        with:
          hugo-version: 'latest'	# 获取最新版本的hugo
          # extended: true

      - name: Build
        run: hugo --minify	# 使用hugo构建静态网页

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3	# 一个自动发布github pages的action
        with:
          # github_token: ${{ secrets.GITHUB_TOKEN }} 该项适用于发布到源码相同repo的情况，不能用于发布到其他repo
          external_repository: aliveyang/aliveyang.github.io	# 发布到哪个repo
          personal_token: ${{ secrets.MY_BLOG_ACTION_PAGE }}	# 发布到其他repo需要提供上面生成的personal access token
          publish_dir: ./public	# 注意这里指的是要发布哪个文件夹的内容，而不是指发布到目的仓库的什么位置，因为hugo默认生成静态网页到public文件夹，所以这里发布public文件夹里的内容
          publish_branch: main	# 发布到哪个branch
```

**参考**
* [https://studygolang.com/articles/4923](https://studygolang.com/articles/4923)

---

音视测试
---

{{< music "music.163.com/outchain/player?type=2&id=1387564796&auto=1&height=66" left >}}

{{< youtube w7Ft2ymGmfc >}}

{{< video "www.youtube.com/embed/w7Ft2ymGmfc" >}}

{{< bilibili 648902166 >}}


