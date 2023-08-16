---
title: "Prisma4でRepositoryを実装する"
author: "Uki884"
category: "プログラミング"
date: "2023-08-14"
bannerImage: "image.svg"
tags:
    - プログラミング
    - Prisma
    - Node.js
---

# はじめに
お久しぶりです。
ちょっと前にprisma4がリリースされ[client-extensions](https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions)が正式にリリースされました。
今回はそれを使用してnest.js + prisma4でrepositoryを作成して共通で使えるメソッドを作成してみました。

# prisma client extensionについて
client-extensionsによってPrismaClient自体に手を加えられるようになったことで柔軟性が爆上がりしました。
一番の恩恵だと感じている部分はComputedFieldを定義できるようになったことだと思います。

例えば、user.fullNameというプロパティをuser.firstNameとuser.lastNameを繋げた値から生成したいとなった場合は以下のようなコードを書くことで、取得した値に手を加えることなく取得できるようになりました。

```ts
const xprisma = prisma.$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`
        },
      },
    },
  },
})
const user = await xprisma.user.findFirst()
```

prisma4以前はPrismaClientのメソッドを拡張することが困難で、複数のカラムから1つのカラムを作ることができず、
↓のようにfullNameを生やしたい場合は既存のuserに混ぜるしかなく、型も変わってしまうので合わせなければいけないなど、辛いコードを書かざる得ませんでした。
```ts
const user = await xprisma.user.findFirst()

const userWithFullName = (user: User) => {
  return { ...user, fullName: `${user.firstName} ${user.lastName}` }
}

```

一方、prisma.$extendsを使用してprismaのインスタンスを拡張する時に使用するオブジェクトの管理をしっかり行わないと拡張の処理が分散し、バグを生んでしまうなと考えました。
そこでドメインモデルごとにrepositoryを作成し、状態を永続化するための関数を作成できるようにします。

# 前提
以下のnestjs、prismaのバージョンを使用しています。
```
"@nestjs/cli": "8.2.4",
"@nestjs/common": "8.4.7",
"@nestjs/core": "8.4.7",
"@prisma/client": "4.16.1",
"prisma": "4.16.1",
```
# repositoryを作る
例としてuser情報を扱うリポジトリを作ります。

まず、baseとなるrepositoryを作成し、リポジトリ共通の処理を作成し、リポジトリごとに使用するメソッドを統一します。
共通の処理なので、appディレクトリに配置することにしました。

src/app/repositories/base.repository.ts
```ts
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;

@Injectable()
export abstract class BaseRepository<T> {
  constructor(
    protected readonly prismaService: PrismaService,
    readonly type: UncapitalizedModelName,
  ) {}
  private _prisma: PrismaClient;

  protected provideExtended(extendedPrisma) {
    this._prisma = extendedPrisma;
  }

  execute(prisma?: Prisma.TransactionClient) {
    if (prisma) {
      return prisma[this.type] as unknown as T;
    }
    return this._prisma[this.type] as unknown as T;
  }
}

```

- #provideExtended

各リポジトリで拡張したPrismaClientを渡すことで、executeで拡張したPrismaClientを使用することができるようになります。

- #execute

BaseRepositoryのconstructorで渡したtypeを使い、baseRepositoryを継承した各リポジトリでexecuteをよびだした場合に特定のモデルのみが呼び出されるようにしていました。
また、引数にprismaインスタンスを渡せるようにすることで、Transaction処理がある場合にも同一トランザクションで処理できるようにしています。

次は実際BaseRepositoryを継承したUserRepositoryを作成します。
UserRepositoryにはsearchというメソッドを追加するclient-extensionsの定義を作成しています。

src/user/repositories/user.repository.ts

```ts
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  BaseRepository,
  UncapitalizedModelName,
} from 'src/app/repositories/base.repository';
import { PrismaService } from 'src/prisma/prisma.service';

const clientExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    model: {
      user: {
        create({ userName, uid, address, email }: { userName: string, uid: string, address: string, email: string }) {
          const prisma = Prisma.getExtensionContext(this);
          return await prisma.create({
            data: {
              name: userName,
              uid: uid,
              email,
              profile: {
                create: {
                  address
                }
              }
            }
          })
        },
        async search(searchText: string) {
          const prisma = Prisma.getExtensionContext(this);
          return prisma.findMany({
            where: searchText
              ? {
                  OR: [
                    {
                      name: searchText
                        ? {
                            contains: searchText,
                            mode: 'insensitive',
                          }
                        : undefined,
                    },
                    {
                      email: searchText
                        ? {
                            contains: searchText,
                            mode: 'insensitive',
                          }
                        : undefined,
                    },
                    {
                      uid: searchText
                        ? {
                            contains: searchText,
                            mode: 'insensitive',
                          }
                        : undefined,
                    },
                  ],
                }
              : undefined,
          });
        },
      },
    },
  });
});

const typeName: UncapitalizedModelName = 'user';

const extendPrisma = (prisma: PrismaService) => {
  return prisma.$extends(clientExtension);
};

type ExtendedClientType = ReturnType<typeof extendPrisma>;
@Injectable()
export class UserRepository extends BaseRepository<
  ExtendedClientType[typeof typeName]
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, typeName);
    this.provideExtended(extendPrisma(prismaService));
  }

  extension(prsima) {
    return extendPrisma(prsima);
  }
}
```

まずconstructorで継承したBaseRepositoryのconstructorにprismaServiceとtypeNameを渡すことでexecuteを介してはuserモデルの関数のみ実行できる状態にすることができます。
※prismaServiceがない場合は通常のprismaからimportしたPrismaClientでも問題ないはずです。

これでUserRepositoryではPrismaのUserモデルの既存メソッド + 拡張したsearchメソッドが使用できるようになりました。

最後に複数の異なるリポジトリをまたいでTransactionを扱いたい場合があったので、transactionを扱えるようにするリポジトリも作成することにしました。(命名はもう少し検討の余地はあるかもしれない...)

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(readonly prismaService: PrismaService) {}

  public getTransaction(...repositories: any[]): PrismaService['$transaction'] {
    let newPrismaService = this.prismaService;
    if (repositories.length) {
      newPrismaService = repositories.reduce((acc, client) => {
        const newClient = client.extension(acc);
        const prevClient = acc.$extends(newClient);

        return newClient.$extends(prevClient);
      }, this.prismaService);
    }

    return newPrismaService.$transaction.bind(newPrismaService);
  }
}

```

getTransactionに複数リポジトリを引数で渡せるようにしています。
こうすることで、this.prismaServiceに対して、各リポジトリで定義したclientExtensionをマージし、1つになったPrismaClientを作成したTransactionalClientを取得することができるようになります。(型がanyなのは改善の余地ありですね)

※例えばUserRepositoryのsearchメソッド、CompanyRepositoryのfindCompanyByIdという関数があったらその両方が適用されたPrismaClientを作成します。

そして、TransactionRepositoryをどこでも使えるようにTransactionModuleを作成し、@Global()のデコレーターをつけます。
```ts
import { Global, Module } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';

@Global()
@Module({
  providers: [TransactionRepository],
  exports: [TransactionRepository],
})
export class TransactionModule {}
```

最後にapp.moduleで読み込んでおきます
src/app/app.module.ts

```ts
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { TransactionModule } from './modules/transaction.module';

@Module({
  imports: [
    TransactionModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

```

# 使い方
使い方は他と同様moduleで読み込んでserviceで使います。

```ts
import { Module } from '@nestjs/common';
import { UserService } from './services//user.service';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}

```

そしてserviceのconstructorでリポジトリを読み込んで使います。

```ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async search(searchQuery: string) {
    return await this.userRepository.execute().search(searchText);
  }
}

```

また、トランザクション処理を行いたい場合は以下のように書きます。

```ts
const transaction = this.transactionRepository.getTransaction(
  this.userRepository,
);
await transaction(async (prisma) => {
    await this.userRepository.execute(prisma).create({ userName: 'user1', email: 'hoge@test.com', address: 'example', uid: '123' })
    await this.userRepository.execute(prisma).create({ userName: 'user2', email: 'hoge2@test.com',  address: 'example', uid: '456' })
});
```

これでどちらか一方のユーザ作成が失敗した場合は処理全体がロールバックされます。

# 感想

これを作ったモチベーションはclient-extensionsを試したいだったのですが、
実際使ってみて、今まで型の問題でできなかったことができるようになり、prismaの進化に驚いています。

ただ、トランザクション周りはもう少しいい感じに書けないかなぁと思っています。

今回はこんな感じで終わろうと思います。

