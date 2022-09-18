---
title: "Prismaでlimit,offsetのページネーションを実装する"
author: "Uki884"
category: "プログラミング"
date: "2022-09-18"
bannerImage: "image.svg"
tags:
    - プログラミング
    - Prisma
    - ページネーション
---

最近はNest.js + Prismaの構成でAPIを作ることが多いのですが、汎用的なページネーションメソッドを作ってみたので、簡単にご紹介します！

- Prisma: 3.6.0

# 完成コード
早速ですが、こちらが完成コードです。
引数にprismaのインスタンスとクエリを渡せるようにして、共通使用できるようにしています。ロジックの説明は割愛します;;

src/prisma/helpers/paginate.ts
```ts
interface Base {
  count: ({ where, take, skip }: any) => Promise<number>;
  findMany: (query) => Promise<any>;
}

export interface PaginateData<T> {
  data: T[];
  total: number;
  hasNext: boolean;
}

// ページングでのデータ取得
export const withPaginate = async <T extends Base, P>(
  prisma: T,
  query: any,
): Promise<PaginateData<P>> => {
  const take = query.take ? Number(query.take) : DEFAULT_PAGINATE_LIMIT;
  const skip = query.skip ? Number(query.skip) : undefined;

  const total = await prisma.count({
    where: query.where,
    take: undefined,
    skip: undefined,
  });

  // 次があるか判定するために1つ多く取得する
  const result = await prisma.findMany({
    ...query,
    take: take + 1,
    skip,
  });

  // 1ページの要素数+1が取得できたら次があると判定する
  const hasNext = result.length > take;

  // 余分に取得した要素を消して1ページ分のデータを返す
  const data = result.slice(0, take);

  return {
    data,
    total,
    hasNext,
  };
};

```

# 使用方法
こんな感じで使用できます。
ジェネリクスの第二引数はあらかじめ型を定義したものを渡す必要があって冗長なので改善したいです。。

```ts
type GetClasses = Class[];

const result = await withPaginate<typeof this.prismaService.class, GetClasses>(this.prismaService.class, query);
```