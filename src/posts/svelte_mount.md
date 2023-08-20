---
title: "Svelteで作ったアプリを動的に生成したDOMにマウントする"
author: "Uki884"
category: "プログラミング"
date: "2020/12/13"
bannerImage: "image.png"
tags:
    - svelte
    - shopify
---

最近、副業でshopifyの案件に携わっているのですが、ストアフロントの部分をliquidではなく、javascriptで書いています。 最初はvueで書いていたのですが、最近はsvelteを使ってストアフロント部分を作成するようになりました。

svelteは非常にvueに似ているのですが、vueのようにthisに縛られず、typescriptと相性が良く軽いため、最近好きなフレームワークの一つです。

shopifyでsvelteやvueを使ってストアフロントを作る場合は、script_tag apiを使ってshopify側にコンパイル済みのjavascriptを渡してsvelteアプリを表示するのですが、 マウントする際、マウントするターゲットのDOMを予めhtmlの中に入れて上げる必要があります。(vue等も同じですね)

```html
<div id="app"></div>
```

こんなhtmlをliquidのtemplateに書いてあげる必要があるのですが、作成したアプリをインストールするたびにユーザーに手動でテーマを編集してもらうのは申し訳ないし、ユーザー体験的に良くないので、自動でDOM生成してマウントする方法を考えてみました。

今回紹介するのは、shopifyからデフォルトで提供されているthemeのみ対応しています。

まず、はじめにshopifyのshopに適用されているthemeによって処理を分岐する部分を書きます。

shopifyThemeList.ts
テーマのリストです。796とかidで判定してる理由はユーザー側でテーマの名前を変更されてしまった場合に対応するためです。 この番号は一意なので、テーマ名が変わっても変更されることはないです。

```ts
export const ShopifyThemeList: { [key: number]: string } = {
  796: 'Debut',
  885: 'Express',
  380: 'Minimal',
  766: 'Boundless',
  578: 'Simple',
  775: 'Venture',
  829: 'Narrative',
  679: 'Supply',
  730: 'Brooklyn'
}
```
setupApp.ts
実際にタグをマウントする処理です。 insertAdjacentHTMLを使ってDOMをマウントしています。

```ts
import { ShopifyThemeList } from './ShopifyThemeList'

const mountDom = '<div id="app"></div>';

export const dynamicInsertDom = () => {
  // windowオブジェクトの中にshopifyの情報が色々入ってるのでそこからtheme_idを取り出す
  const themeNumber: number = (window as any).Shopify.theme.theme_store_id;
  if (!themeNumber) {
    console.error('this theme is unsupported')
    return
  }
  const themeName = ShopifyThemeList[themeNumber]
  setInsertDomByTheme(themeName)
}

const setInsertDomByTheme = (themeName: string) => {
  switch (themeName) {
    case 'Express': {
      const targetDom = document.getElementsByClassName('cart-drawer__header')[0];
      setAppTag(targetDom, mountDom, 'afterend');
      break;
    }
    default:
      console.error('this theme is unsupported')
      break;
  }
}

const setAppTag = (targetDom: Element, insertDom: string, type: InsertPosition) => {
  if (!targetDom) return;
  targetDom.insertAdjacentHTML(type, insertDom);
  console.log('setup success!')
}
```
main.tsでアプリをマウントする前にdynamicInsertDomメソッドを呼び出します。

これで動的に生成したタグに対してsvelteアプリをマウントします。

main.ts
```ts
import App from './App.svelte'
import { dynamicInsertDom } from './setupApp'

// アプリをマウントする
dynamicInsertDom()

let app;
app = new App({
  target: document.querySelector('#app')
})

export default app
```

これでユーザー側に操作してもらうことなくアプリを表示することができるようになります。

終わりに
ユーザーに手動でタグを入れるのは手間だとshopify側に言われ、アプリの申請が通らないため、この処理を作成しました。

なので、javascriptフレームワークを使ったストアフロント画面の作成では必須になってくるとおもいますので、助けになれば！

あぁ。。。そろそろreactでなにか作りたいなあ。。。
