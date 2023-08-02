+++
Tags = ["temp"]
date = "2020-02-04"
title = "GitHub使用"
+++
**GitHub**
<!--more-->

## GitHub使用密钥同步私有库

    1. win下查看是否存在ssh密钥 cd ~/.ssh
    2. 生成ssh密钥 ssh-keygen -t rsa -C "xxx@xxx.com"
    3. 用户/admin/.ssh 目录下 id_rsa、id_rsa.pub
    4. 打开 id_rsa.pub 复制出公钥， 然后在github所在setting中添加公钥


