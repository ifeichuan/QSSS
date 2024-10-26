---
title: 隐私与分享的平衡：使用 Obsidian 发布文章到静态博客的通用方法
source: 
aliases: 
tags:
  - Github
  - Bolg
  - 笔记
date_created: 星期4 2024-09-19, 10:17:39 晚上
date_modified: 星期4 2024-09-19, 10:56:58 晚上
---

# 隐私与分享的平衡：使用 Obsidian 发布文章到静态博客的通用方法
## 声明
本文章仅适用于像我一样的强迫症,不要喷我(球球了)
大佬们如果有其他的意见欢迎在评论区讨论.
简单概括: 设置两个github仓库,一个为 **private** 作为 Obsidian仓库, 一个为 **public** 作为博客仓库,通过在obsidian仓库创建 `workflows` 来同步特定文件夹.
## 引言

啊~ 总所周知,Obsidian是一个非常好用的双链笔记应用. 但官方提供的发布功能好贵(/(ㄒoㄒ)/~\~)
所以就出现了各种通过,`Hugo,Hexo,Digital Garden,Quartz`等框架来实现发布功能,但一般的方法都是在将需要发布的文章放在特定的文件夹下,并在此文件夹下配置这些服务.并上传到Github上通过 `Acitons` 来发布.
但这种方法有一些缺点:
1. Git嵌套,文章并不会同步到主仓库中,而是通过子模块`submodule`来同步文件. 当我们从远程 `Clone` 时,我们需要额外的操作来同步子文件夹.
   并且将文章放入子文件夹后也不会自动同步,同样需要手动 `push` 
2. 对强迫症不友好(**文件结构长的丑**), 文章文件夹下一大堆东西是什么啦?!

以上为我个人体验下来的缺点.
最近在写Vitepress时,原来的同步思路也是原来的方法. 突发奇想问了问能不能在两个仓库之间同步特定文件夹. 于是有了这篇文章.
- 优点:
	- 自动发布,
	- 文件在Obsidian中,每次推送远程时自动同步到Blog仓库下 
	- 文件结构简洁好看.
- 缺点:
	- 暂时只想到不能在Blog仓库下修改文章,但是这算什么?😀

## 方法
简单概括: 设置两个github仓库,一个为 **private** 作为 Obsidian仓库, 一个为 **public** 作为博客仓库,通过在obsidian仓库创建 `workflows` 来同步特定文件夹.
首先需要去创建一个Github 个人访问令牌 [Github创建个人访问令牌教程\_npm访问令牌-CSDN博客](https://blog.csdn.net/qq_46941656/article/details/119737804) 并将其添加到 **Obsidian** 仓库的 `Secrets` 仓库密钥中.

![image.png|550](https://s2.loli.net/2024/09/19/28HmVtirjqMw3Nh.png)

然后在**Obsidian** 仓库根目录下添加 `.github/workflows/` 文件夹
创建 `Sync.Yaml` 文件 
```yaml
name: Sync Folders

  

on:

  push:

    branches: [ main ]

  workflow_dispatch:

  

jobs:

  sync:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout source repo

        uses: actions/checkout@v2

        with:
		# Obsidian仓库 
          repository: 用户名/Obsidian仓库名

          path: source

  

      - name: Checkout target repo

        uses: actions/checkout@v2

        with:

          repository: 用户名/Blog仓库名

          path: target

          token: ${{ secrets.PAT }}

  

      - name: Sync folders

        run: |

          rsync -avzc --delete source/Obsidian仓库下的特定文件夹/ target/Blog仓库下的特定文件夹/

  

      - name: Commit changes

        run: |

          cd target

          git config user.name github-actions

          git config user.email github-actions@github.com

          git add .

          git commit -m "Sync folders" || exit 0

          git push
```

然后推送到github上,就会自动同步了,配合原来Blog的actions即可实现自动发布.