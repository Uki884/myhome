import React from 'react';
import Link from 'next/link';
import * as Styled from './styled'
import { BaseCard } from '@/components/common/BaseCard';
import Router from 'next/router';
import dayjs from 'dayjs';

export const PostList = ({ posts }: any) => {
  return (
    <Styled.$Posts>
    {posts.map((post: { slug: any; frontmatter: any; }) => {
      const {slug, frontmatter} = post
      const { title, author, category, date, bannerImage, tags } = frontmatter
      const handleMove = () => {
        Router.push(`/posts/${slug}`)
      }

      return (
        <BaseCard key={title} onClick={handleMove}>
          <Styled.$Content>
            <Styled.$Image src={bannerImage ? `${slug}/${bannerImage}` : '/noimage.png'} alt="" />
            <Styled.$Title>
              <Link href={`/posts/${slug}`}>{title}</Link>
            </Styled.$Title>
            <Styled.$Date>{dayjs(date).format('YYYY年M月DD日')}</Styled.$Date>
          </Styled.$Content>
        </BaseCard>
      )
    })}
    </Styled.$Posts>
  )
}
