import React from 'react';
import * as Styled from './styled';
import { useFetchPostDetail } from '@/hooks/useFetchPostDetail';
import dayjs from 'dayjs';
import Highlight from 'react-highlight';
import { Loading } from '@/components/common/Loading';
interface Props {
  contentId: string
}

export const PostDetail = ({ contentId }: Props) => {
  const { post } = useFetchPostDetail({ contentId });

  if (!post) {
    return <Loading />
  }

  const { title, categories, eyecatch, publishedAt, createdAt, content, tags } = post

  return (
    <Styled.$Main>
      <Styled.$PostInfo>
        <Styled.$DateList>
          <Styled.$Date>作成日: {dayjs(createdAt).format('YYYY年M月DD日')}</Styled.$Date>
          <Styled.$Date>最終更新日: {dayjs(publishedAt).format('YYYY年M月DD日')}</Styled.$Date>
        </Styled.$DateList>
        <Styled.$TagWrapper>
          <Styled.$Category>{categories?.length ? categories[0].name : ''}</Styled.$Category>
          { tags?.map(tag => <Styled.$Tag key={tag.id}>{tag.name}</Styled.$Tag>)}
        </Styled.$TagWrapper>
      </Styled.$PostInfo>
      <Styled.$TitleWrapper>
        <Styled.$Title>{title}</Styled.$Title>
      </Styled.$TitleWrapper>
      <Styled.$Section>
        <Styled.$Image src={`${eyecatch ? eyecatch.url : '/noimage.png'}`} />
        <Highlight className='markdown-body' innerHTML={true} >
          { content }
        </Highlight>
      </Styled.$Section>
    </Styled.$Main>
  )
}