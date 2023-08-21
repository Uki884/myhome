import React from 'react';
import Link from 'next/link';
import * as Styled from './styled'
import { BaseCard } from '@/components/common/BaseCard';
import Router from 'next/router';
import dayjs from 'dayjs';
import { useFetchPosts } from '@/hooks/useFetchPosts';

export const PostList = () => {
  const { posts } = useFetchPosts();

  if (!posts) return <div>loading...</div>

  return (
    <Styled.$Posts>
      {posts.contents.map(post => {
        const { id, title, eyecatch, createdAt } = post
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
            <Styled.$Date>{dayjs(createdAt).format('YYYY年M月DD日')}</Styled.$Date>
          </Styled.$Content>
        </BaseCard>
      )
    })}
    </Styled.$Posts>
  )
}
