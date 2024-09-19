---
title: PySide6笔记
source: 
aliases: 
tags:
  - python
  - GUI
  - Pyqt
draft: false
date_created: 星期3 2024-03-13, 6:27:15 晚上
date_modified: 星期2 2024-09-17, 4:16:43 下午
---

# PySide6笔记

常用的信号,cureent-

最常用的布局
- QHBOXLayout 垂直布局
- QVBOXLayout 水平布局
- QGirdLayout 格子布局
- QformLayout 表单布局

NoEcho Linux密码模式
PasswordOnedit

模态 Modal 
NoModal 没有模态
windowsModal 必须关掉当前窗口才可编辑其他窗口 
ApplicationModal 置顶

```python
  def btn_clicked(self):

        # QMessageBox.about(self,"你好","你好世界") 普通

        # QMessageBox.aboutQt(self,"你好") Qt自带介绍

        # QMessageBox.critical(self,"你好","你好") 警告

        # QMessageBox.information(self,"你好","你好") 信息

        # QMessageBox.warning(self,"你好","年后")

        replay = QMessageBox.question(self,"111","222",QMessageBox.StandardButton.Ok,QMessageBox.StandardButton.Ok)

        return replay
        # replay返回的是点击的按钮
```
111

