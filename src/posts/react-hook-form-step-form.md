---
title: "再レンダリングを抑えながらRecoilで状態管理するステップフォームを作成してみる"
author: "Uki884"
category: "プログラミング"
date: "2023/08/20"
bannerImage: "image.png"
tags:
  - react
  - recoil
  - react-hook-form
  - フォーム
---

最近、業務でReact Hook FormとRecoilを使ってステップフォームを作る場面があったので、そのことについて書こうと思います。
※一部ChatGPTを用いて記事の校正を行っているため不自然な表現があるかもしれないので、ご留意ください。
# 前提

この記事のコードで使用しているライブラリのバージョンは以下です。
- react
18.2.0
- react-hook-form
7.45.1
- recoil
0.7.7
- zod
3.21.4

また、この記事を書くにあたって作成したサンプルコードは以下です。
[step-form-with-react-hook-form](https://github.com/Uki884/step-form-with-react-hook-form)

# 実装方針

ステップフォームはページをまたいで情報を共有する必要があるので、state管理にはrecoilを使用します。recoilを組み合わせて使っていく上で、入力ごとにrecoilのstateを更新していくControlled Componentsの方式を取ることも可能ですが、都度stateを更新しないようにしたいので、Uncontrolled Componentsで実装し、React Hook Formの特徴を活かせるようにします。また、簡単にバリデーションが実行できるzodも合わせて使用します。

- 新規会員登録のみを対象にする
  - ユーザー情報を少しずつ更新していくのではなく、最後のページで一括で登録させる方式を想定。つまり途中離脱は考慮しない。
- バリデーションはinput入力時にリアルタイムに行う。ただし、何も入力されていない場合でも次のページへ進むボタンは押せるようにし、押したタイミングでバリデーションを行う。入力誤りがある場合はページ遷移ができないようにします。

# Controlled ComponentsとUncontrolled Componentsについて

まず先程触れたControlled ComponentsとUncontrolled Componentsの違いについて説明したいと思います。後述しますが、React Hook FormはUncontrolled Componentsを採用しており、入力時に再レンダリングを発生させずフォームを作成することができ、パフォーマンスが良いフォームを作成することができます。

## Controlled Components(Reactで値を管理する)

Controlled Componentsはreactのstateを介して入力状態を管理するコンポーネントのことです。値の更新はonChange関数を介して行い、stateにバインドしているvalueが更新されることでinput自体が再レンダリングされ表示を更新します。

### 特徴

- 入力した値をreactで管理するため、stateの変化を用いた処理を書きやすい
  - 例: フォームの値が空だったら、ボタンをdisabledにする等。stateが常に最新になるため、ただ値を参照すればいいだけです。
- 公式が推奨している
> [非制御コンポーネント](https://ja.legacy.reactjs.org/docs/uncontrolled-components.html)

### 注意点

- 入力するたびに再レンダリングが発生するのでアプリのパフォーマンスが悪くなる場合がある

## Uncontrolled Components(DOMで値を管理する)

一方、Uncontrolled ComponentsはReactのstateを使用せず、ネイティブの機能(DOM)で値を管理するコンポーネントのことです。値の管理をDOM自身が行うので、再レンダリングを発生させません。

### 特徴

- 値の制御をDOM側で行うため、再レンダリングが発生しないためパフォーマンスが良い

### 注意点

- reactのstateに初期値を入れたい場合はdefaultValueに値を渡す必要がある。valueに初期値を渡しても、inputに入力してもonChangeによってreactのstateが更新されないため、機能しません。
- MUI等のControlled Componentsで作られているUIライブラリで使う場合は一工夫必要。ControllerかuseControllerを使用する必要がある
- フォームの入力値を子コンポーネントに渡したい場合はforwardRefを使用しrefを子コンポーネントに渡す必要がある

```tsx
import { forwardRef } from "react";

interface InputTextProps {
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  defaultValue?: string;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(({ error, defaultValue, ...props }, ref) => {
  return (
    <>
      <input {...props} defaultValue={defaultValue} ref={ref} />
      <div style={{ color: 'red'}}>{ error }</div>
    </>
  )
})
```

# 作ってみる
まず、フォームやstateを一元管理するhooksを作成します。バリデーションのスキーマなどは分けるべきですが、今回は1ファイル内にすべて記述しています。

```ts
import { FieldError, FieldErrors, useForm } from 'react-hook-form'
import { atom, useRecoilState } from 'recoil'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const userSignUpSchema = z.object({
  name: z
    .string({ required_error: "名前を入力してください" })
    .min(5, { message: "5文字以上入力してください" }),
  email: z
    .string({ required_error: "メールアドレスを入力してください" })
    .email({ message: "メールアドレスの形式に誤りがあります" }),
  corporation: z.object({
    name: z.string({ required_error: "会社名を入力してください" }).min(1, { message: "1文字以上入力してください" }),
  })
});

export type UserSignUpSchemaType = z.infer<typeof userSignUpSchema>;

const userSignUpFormState = atom({
  key: "userSignUpFormState",
  default: {
    email: '',
    name: '',
    corporation: {
      name: '',
    }
  },
});

type ErrorType = FieldErrors<{
  name: FieldError;
  email: FieldError;
}>;

const errorsState = atom<ErrorType>({
  key: "errorsState",
  default: {},
});

export const useUserForm = () => {
  const [userFormValue, setUserFormValue] = useRecoilState(userSignUpFormState);
  const [errorsValue, setErrorsValue] = useRecoilState(errorsState);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    control,
    trigger,
    setError,
  } = useForm<UserSignUpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(userSignUpSchema),
    defaultValues: userFormValue,
  });

  const handleNavigate = (path: string) => {
    setErrorsValue(errors);
    setUserFormValue(getValues());
    navigate(path);
  };

  const handleRegister = handleSubmit((data: UserSignUpSchemaType) => {
    // APIを叩く
    console.log(data);
  });

  useEffect(() => {
    Object.keys(errorsValue).forEach((key) => {
      setError(key as keyof UserSignUpSchemaType, {
        message: (errorsValue as any)[key].message,
        type: (errorsValue as any)[key].type,
      });
    });
  }, [errorsValue]);

  return {
    handleSubmit,
    getValues,
    errors,
    control,
    register,
    handleNavigate,
    isValid,
    trigger,
    isDirty,
    handleRegister
  };
};

```

state管理にはrecoilを使用しているので、registerのonChangeを上書きし、recoilのstateを直接更新することも考えられますが、
Controlled Componentsの特性として再レンダリングが発生してしまうため避けます。よって、ページ遷移時にrecoilのstateへの反映を行います。

例:
registerの第2引数を渡すことで、onChangeをオーバーライドすることができます。しかし、react-hook-formのstateとrecoilのstateの両方を更新する必要があり、やや冗長です。

```ts
const emailRegister = register("email", {
  onChange: (e) => {
    setValue("email", String(e.target.value));
    setUserFormValue({...getValues(), email: e.target.value});
}})
```

```tsx
<InputText
  type='text'
  {...emailRegister}
  value={userFormValue.email}
  error={errors['email']?.message}
/>
```

useWatchやuseControllerを使用することで、再レンダリングする範囲を狭めることも可能です。
しかし、UIライブラリを使用していない場合はUncontrolled Componentsとして実装したいですね。

ページの利用例は以下の通りです。

```tsx
import { useUserForm } from '../../hooks/useUserForm'
import { InputText } from '../../components/inputText'

export const Step1 = () => {
  const { errors, handleNavigate, register, getValues, trigger } = useUserForm()

  const handleMove = async (path: string) => {
    const result = await trigger('email')
    if (!result) return;
    handleNavigate(path)
  }

  return (
    <>
      メールアドレス
      <InputText
        type='text'
        {...register('email')}
        defaultValue={getValues('email')}
        error={errors['email']?.message}
      />
      <button disabled={!!errors.email} onClick={()=> void handleMove('/step2')}>次へ</button>
    </>
  )
}
```

「次へ」ボタンをクリックした際に発動するhandleMove関数について解説します。

- trigger
triggerを使用して任意のタイミングでバリデーションを実行します。これにより、ユーザーが何も入力していない場合でもバリデーションが行われるようになります。formState.dirtyFieldsを使って同様のことが可能かと思いますが、今回の実装ではtriggerを選択しました。

- handleNavigate
この関数は次のステップへ遷移する前に、recoilのstateを更新する役割があります。getValues()メソッドを用いて、最新のreact-hook-formの値を取得し、その情報をrecoilのstateに保存しています。

最後のステップとして、最終ページでhandleRegisterを実行し、ユーザー登録を完了させる機能を追加すれば、実装は完成となります。

```tsx
import { useUserForm } from '../../hooks/useUserForm'

export const FinalStep = () => {
  const {
    handleSubmit,
    handleNavigate,
    isValid,
    handleRegister
  } = useUserForm()

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleRegister}>
        <button type="submit" disabled={!isValid}>登録</button>
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button disabled={!isValid} onClick={() => handleNavigate('/step1')}>戻る</button>
      </div>
    </form>
  )
}
```

「登録」ボタンをクリックすると、<form>タグのonSubmitイベントがトリガーされ、handleRegister関数が実行されます。
バリデーションを通過した場合、handleRegisterには登録に必要なデータのオブジェクトが渡され、このオブジェクトを使用してユーザー登録のAPIを実行することができます。
この実装により、Recoilを用いてグローバルステートを管理しつつ、Controlled Componentsを用いて再レンダリングの回数を削減することができました！

# 最後に
初めはControlled ComponentsとUncontrolled Componentsの違いを完全に理解していなかったため、実装が雰囲気主体になってしまいました。
その結果、再レンダリングが多く発生する実装をやっていたので、今後はドキュメントをしっかりと読んだ上でコードを書いていきたいと思います。

また、UIライブラリを部分的に使用するなどして、Controlled ComponentsとUncontrolled Componentsを併用する実装パターンについても、今後時間があれば記事に追記したいです。

今回は以上です！
