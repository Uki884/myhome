---
title: "Prisma ORMでページネーションを実装する"
author: "Uki884"
category: "プログラミング"
date: "2022-09-11"
bannerImage: "image.svg"
tags:
    - プログラミング
    - Prisma
    - ページネーション
---

最近はNest.js + Prismaの構成でAPIを作ることが多いのですが、汎用的なページネーションメソッドを作ってみたので、簡単にご紹介します！

- Prisma: 3.6.0

まずは、ページネーションを行うメソッドを作っていきます。

src/prisma/helpers/paginate.ts

```ts
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

