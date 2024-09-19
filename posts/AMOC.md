---
title: AMOC
source: "[[笔记管理方法]]"
draft: true
aliases: 
tags: 
date_created: 星期3 2024-03-27, 10:07:32 上午
date_modified: 星期2 2024-09-17, 4:16:43 下午
---

# AMOC
简单来说 就是使用 YAML 创建一个特定字段，在这个字段上写入父节点名称`[[Filename]]格式`
然后在父节点上写如下 [[Dataview]] 
```YAML
dataview
list or table 
where source = [[父节点]]
```
即可自动生成MOC

参考:[Obsidian双链框架AMOC，更简单的PARA、卡片笔记方法 - 经验分享 - Obsidian 中文论坛](https://forum-zh.obsidian.md/t/topic/29384)