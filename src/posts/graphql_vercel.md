---
title: graphQL Server(Koa, typescript)をVercelを使って無料でデプロイする
author: "Uki884"
category: "プログラミング"
date: "2020-12-11"
bannerImage: "eyecatch.png"
tags:
  - GraphQL
  - Koa.js
  - Vercel
---

graphqlサーバをServerless Functionとして無料でデプロイできるPaaSのvercelを試してみました。

完成系のrepositoryは↓です。

[vercel-graphql](https://github.com/Uki884/vercel-graphql)

# vercelについて
Next.jsを作っているVercel社が提供しているPassです。静的サイトとserverless機能を手軽にデプロイできます。
github等とも連携できるので、githubにpushされたらデプロイを開始する、なんて事も自動でやってくれたりします。

# 構築する際の注意点
vercelはapi server をserverless functionとしてデプロイできますが、プロジェクトルートのapiディレクトリに配置する必要があります。(next.jsのため？)
そのため、apiディレクトリ以外にserverを配置するとデプロイがうまくいきません。

# 構築する
はじめにgraphql serverを構築するのに必要なモジュールを入れます。今回はkoaを使います。

```js
npm i koa apollo-server-koa koa-router graphql graphql-tools vercel ts-node typescript
```

導入が完了したら、typescriptをコンパイルするための設定を作成します。

```bash
vi tsconfig.json
```

targetにes5と指定し、トランスパイルした時にes5で出力されるようにします。
moduleにはcommonjsと指定し、出力されるjavascriptのモジュールがCommonJSで出力されるように設定します。※今回はnodeからしか出力後のjavascriptが参照されないのでcommonjsとします。
outDirはvercelのビルド後の出力先が`public`ディレクトリであるため、`public`とする必要があります。

```json
{
  "compilerOptions": {
    "target": "es5",
    "esModuleInterop": true,
    "module": "commonjs",
    "baseUrl": "./",
    "lib": [
      "es2020",
      "dom"
    ],
    "types": [
        "node"
    ],
    "moduleResolution": "Node",
    "sourceMap": true,
    "outDir": "./public",
    },
    "include": [
        "**/*"
    ],
    "allowJs": true,
    "checkJs": true,
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
}
```

上記の設定が完了したらpackage.jsonにtypescriptをコンパイルする設定や、その他のnpm scriptを登録します。

npm run buildでコンパイル
npm run devでコンパイルとサーバ起動するようにしています。

```json
{
  "name": "vercel-graphql",
  "version": "1.0.0",
  "description": "vercel-graphql",
  "scripts": {
    "dev": "tsc && npm run start",
    "build": "tsc",
    "start": "node ./public/index.js",
    "deploy": "vercel",
    "deploy:production": "vercel --prod"
  },
  "author": "Uki884",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^13.1.1",
    "apollo-server-koa": "^2.19.0",
    "dotenv": "^8.2.0",
    "graphql": "^14.5.8",
    "graphql-import": "^1.0.2",
    "graphql-tools": "^7.0.2",
    "koa-router": "^10.0.0",
    "nodemon": "^2.0.2",
    "ts-node": "^8.5.4",
    "vercel": "^21.0.1"
  },
  "devDependencies": {
    "concurrently": "^3.6.0",
    "nodemon": "^2.0.2",
    "ts-loader": "^8.0.11",
    "typescript": "^3.9.7"
  }
}

```


上記が完了したら実際にapiサーバを構築していきます。

```bash
mkdir api
vi api/index.ts
```

api/index.ts
```js
import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

const app = new Koa();
server.applyMiddleware({ app });

const port = process.env.PORT || 8081

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);

export default app.callback()

```

ポイントとしては、``app.callback()``としてexportすることです。

一回立ち上げてみます。以下のように表示されれば成功です。
```bash
npm run dev

> vercel-graphql@1.0.0 start /Users/hayashiyuki/Desktop/vercel-graphql
> node ./public/index.js

🚀 Server ready at http://localhost:8081/graphql
```

ローカルでの動作確認が完了したので、実際にvercelにデプロイしていきます。

```bash
npm run deploy
```

以下のように表示されたらメールアドレスを入力して、vercelにログインしてください
ログイン後、プロジェクトの設定をいくつか求められますが、全てenterで進めてしまって大丈夫です。

```bash
No existing credentials found. Please log in:
Enter your email: 
```
以下のように表示されればデプロイがうまくいっています
```bash
Vercel CLI 21.0.1
🔍  Inspect: https://vercel.com/uki884/vercel-graphql/87tb9l7df [3s]
✅  Preview: https://vercel-graphql.uki884.vercel.app [copied to clipboard] [31s]
📝  To deploy to production (vercel-graphql-three.vercel.app), run `vercel --prod`
```

上記で実行したのはpreview環境へのデプロイなので、productionにデプロイするには以下のコマンドを実行します。
preview環境はコードを変更した場合の確認するための環境で、本番にデプロイせずに実際の動作を確認することができます。staging環境を別途用意する必要がないのは便利ですね。

以下のコマンドで本番環境へコードが反映されます。
```bash
npm run deploy:production
> vercel --prod

Vercel CLI 21.0.1
🔍  Inspect: https://vercel.com/uki884/vercel-graphql/87tb9l7df [987ms]
✅  Production: https://vercel-graphql-three.vercel.app [copied to clipboard] [2s]
```

書かれているurlにアクセスして、正常に画面が表示されたらデプロイ完了です！

# おわりに
かなり簡単にapiサーバを立てることができました。

githubとかと連携したりnext.jsをフロントエンドで使えば、
ほぼサーバを意識することなく、高速にアプリを作ることができるようになりますね。
