import React from 'react';
import Link from 'next/link';
import * as Styled from './styled'
import { BaseCard } from '@/components/common/BaseCard';
import dayjs from 'dayjs';
import { useFetchPostList } from '@/hooks/useFetchPostList';
import { Loading } from '@/components/common/Loading';

export const PostList = () => {
  const { postList } = useFetchPostList();

  if (!postList) {
    return (
      <Loading />
    )
  }

  return (
    <Styled.$Posts>
      {postList.contents.map(post => {
        const { id, title, eyecatch, publishedAt } = post
        return (
          <Link href={`/posts/${id}`} key={title}>
            <BaseCard>
              <Styled.$Content>
                <Styled.$Image src={eyecatch ? `${eyecatch.url}` : '/noimage.png'} alt="" />
                <Styled.$Title>
                  {title}
                </Styled.$Title>
                <Styled.$Date>{dayjs(publishedAt).format('YYYY年M月DD日')}</Styled.$Date>
              </Styled.$Content>
            </BaseCard>
          </Link>
        )
    })}
    </Styled.$Posts>
  )
}
