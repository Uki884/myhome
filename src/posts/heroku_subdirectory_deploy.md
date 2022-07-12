---
title: "Herokuにmonorepoプロジェクトをデプロイした時に少しハマった"
author: "Uki884"
category: "プログラミング"
date: "2022-08-29"
bannerImage: "image.jpg"
tags:
    - プログラミング
    - Heroku
    - monorepo
---
業務委託で関わってる案件でmonorepoなプロジェクトをHerokuにデプロイしようとしたのですが、結構ハマったので備忘録として書いておきます。

# ディレクトリ構造
```
$ tree ./ -a -L 1
./
├── .git
├── .gitignore
├── admin
├── shared
├── frontend
└── backend
```
sharedディレクトリはプロジェクト共通のパッケージで、admin、frontend、backendからシンボリックリンクで参照させる構成をとっている。

各プロジェクト直下で、`npm install ../shared`とすることで各プロジェクトのnode_modulesにシンボリックリンクとなってインストールされる。
# できなかったやり方
## git subtree splitを使う
git subtree split で切り出すことによりルートディレクトリを変更してpushすることができる。
```
$ git push --force heroku `git subtree split --prefix backend HEAD`:master
```
だが、この例だと、backendディレクトリだけを切り出すので他のディレクトリが削除されてしまい、sharedディレクトリを見つけることができなくなってしまう。
よってダメだった。
## heroku-buildpack-monorepoを使う
デプロイ手段としてgitやgithub actionsで処理するのではなく、Heroku buildpackに任せるという選択肢もあり、Herokuの認証が不要なためデプロイをHerokuだけで完結することができるが、この方法もダメだった。

issueにこんなのも上がっていたが、どれもうまく動かなかった。
https://github.com/lstoll/heroku-buildpack-monorepo/issues/7
## なぜできないのか
- デプロイ対象のディレクトリ以外を削除してしまう動作に問題がありそう。

→ 全てのディレクトリ残したまま、特定のディレクトリに対してビルドできるようにしたい。
# できたやり方
色々試行錯誤した結果、このbuildpackで目的の条件を達成することができた。
## heroku-buildpack-select-subdirを使う
https://github.com/Pagedraw/heroku-buildpack-select-subdir

これを使うことによって、他のディレクトリを残したままデプロイを行うことができた。

Deprecatedとなっているが、躊躇せず使って大丈夫そう。
移行先に書かれているものは全てうまくいかなかった。おそらく上述した問題と同様。
```
https://github.com/timanovsky/subdir-heroku-buildpack
https://github.com/lstoll/heroku-buildpack-monorepo
```
### 使い方
使い方はBUILDPACKという環境変数に`backend=https://github.com/heroku/heroku-buildpack-nodejs.git` のような形で形で設定することで、
backendに配置されているProcfileをルートディレクトリにコピーしてアプリを起動させることができる。
なので、各ディレクトリにはProcfileを作成しておく必要がある
# ハマりポイント
- Procfileの起動コマンド
backendディレクトリがルートディレクトリではないので、一度backendディレクトリに移動してからコマンドを実行する必要がある。
よって、--prefixを使うことでbackendのディレクトリ上でコマンドを実行するようにしなければいけなかった。
```
web: npm run start:prod --prefix backend
```
# 感想
heroku-buildpack-select-subdirを使ったらすぐにできた。

Deprecatedとなっていたので、他のbuildpackで試行錯誤して時間を溶かしてしまった。。

次期にHerokuが有料となるので、そろそろ引っ越したい気もする。

それでは今回はこの辺で！
