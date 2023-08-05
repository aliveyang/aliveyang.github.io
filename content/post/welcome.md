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
baseurl = "http://bolg.aliveyang.top/"
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

**参考**
* [https://studygolang.com/articles/4923](https://studygolang.com/articles/4923)

---

音视测试
---

{{< music "music.163.com/outchain/player?type=2&id=1387564796&auto=1&height=66" left >}}

{{< youtube w7Ft2ymGmfc >}}

{{< video "www.youtube.com/embed/w7Ft2ymGmfc" >}}

{{< bilibili 648902166 >}}


