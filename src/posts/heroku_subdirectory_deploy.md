---
title: "Herokuにmonorepoなプロジェクトをデプロイしたかったけど少しハマった話"
author: "Uki884"
category: "技術"
date: "2022-08-25"
bannerImage: ""
tags:
    - プログラミング
    - Heroku
---
業務委託で関わってる案件で以下のようなディレクトリ構成のmonorepoなプロジェクトをHerokuにデプロイしようとしたのですが、結構ハマったので備忘録として書いておきます。

# ディレクトリ構造
$ tree ./ -a -L 1
./
├── .git
├── .gitignore
├── admin
├── shared
├── frontend
└── backend

sharedディレクトリはプロジェクト共通のパッケージで、admin、frontend、backendからシンボリックリンクで参照させる構成をとっています。
今回は

# デプロイする方法はいくつかある
## git subtree splitを使う
git subtree split で切り出すことによりルートディレクトリを変更してpushすることができる
```
$ git push --force heroku `git subtree split --prefix backend HEAD`:master
```
この例だと、backendディレクトリだけを切り出してherokuにpushしている。
ローカルから直接heroku CLIを通してデプロイしたい場合はこれを使うと手軽で良い。

## heroku-deployを使う
Github Actionsでheroku-deployが提供されているので、CIを組みたい場合はこれを使うと手軽。
このパッケージでもgit subtree splitを使用している。
https://github.com/AkhileshNS/heroku-deploy/blob/master/index.js#L103

## Heroku buildpackを使う
gitやgithub actionsで処理するのではなく、Heroku buildpackに任せるという選択肢もあり、Herokuの認証が不要なためデプロイをHerokuだけで完結することができる。
Herokuでmonorepoをデプロイできるbuildpackはいくつかあるが、それぞれ微妙に動きが異なっている。

### heroku-buildpack-monorepo
### 

# ハマったポイント

# 解決策

