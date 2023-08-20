---
title: "React Hook Formを使ってパフォーマンスが良いステップフォームを作る"
author: "Uki884"
category: "プログラミング"
date: "2023/08/20"
bannerImage: "image.png"
tags:
  - react
  - react-hook-form
  - フォーム
---

最近、業務でReact Hook Formを使ってステップフォームを作る場面があり、不要な再レンダリングが少なくパフォーマンスが良いフォームの実装について調査したので、そのことについて書こうと思います。

# パフォーマンスが良いフォームとは

# controlled、uncontrolledの違い

## Controlled Components(Reactで値を管理する)

Controlled Componentsはreactのstateを介して入力状態が管理されているコンポーネントで、input要素のvalueに設定されているstateがonChange関数を介して更新されるとinputのvalueを再設定します。

- 入力した値を直接制御できるが、再レンダリングが発生する
- 公式が推奨している
> 非制御コンポーネントでは DOM に信頼できる情報源 (source of truth) を保持するため、使用すれば React と非 React のコードの統合が簡単になることがあります。汚くても構わないので速く記述したいと思うなら少しだけコード量も減らせます。そうでなければ、通常の制御されたコンポーネントを使用するべきです。
https://ja.legacy.reactjs.org/docs/uncontrolled-components.html

## Uncontrolled Components(DOMで値を管理する)
Uncontrolled Componentsは

- 値の制御をDOM側で行うため、再レンダリングが発生しない
- MUI等のUIライブラリで使う場合は一工夫必要

# 作るフォーム

# 作ってみる

# 最後に