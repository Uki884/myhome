import React from 'react';
import Link from 'next/link';
import * as Styled from './styled'
import { BaseCard } from '@/components/common/BaseCard';
import Router from 'next/router';
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
        const handleMove = () => {
          Router.push(`/posts/${id}`)
        }
        return (
          <BaseCard key={title} onClick={handleMove}>
            <Styled.$Content>
              <Styled.$Image src={eyecatch ? `${eyecatch.url}` : '/noimage.png'} alt="" />
              <Styled.$Title>
                <Link href={`/posts/${id}`}>{title}</Link>
              </Styled.$Title>
              <Styled.$Date>{dayjs(publishedAt).format('YYYY年M月DD日')}</Styled.$Date>
            </Styled.$Content>
          </BaseCard>
        )
    })}
    </Styled.$Posts>
  )
}
