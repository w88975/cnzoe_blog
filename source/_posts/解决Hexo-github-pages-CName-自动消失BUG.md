---
title: 解决Hexo github pages CName 自动消失BUG UPDATE
date: 2023-09-28 01:28:22
tags: [hexo]
---
## 前言

```yml
with:
  github_token: ${{ secrets.GITHUB_TOKEN }}
  publish_dir: ./public
  cname: github.com # 添加这一行
```
