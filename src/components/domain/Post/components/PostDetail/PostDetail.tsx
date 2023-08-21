import React from 'react';
import md from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import * as Styled from './styled';
import { useFetchPostDetail } from '@/hooks/useFetchPostDetail';
import dayjs from 'dayjs';
interface Props {
  contentId: string
}

export const PostDetail = ({ contentId }: Props) => {
  const { post } = useFetchPostDetail({ contentId });

  if (!post) {
    return <div>loading...</div>
  }

  const { title, category, eyecatch, createdAt } = post

  const markdownToHtml = md('default', {
    langPrefix: 'lang-',
    linkify: true,
    breaks: true,
    html: true,
  })

  highlight(markdownToHtml, { register: { typescript, javascript } })

  return (
    <Styled.$Main>
      <div>
        <Styled.$Date>
          {dayjs(createdAt).format('YYYY年M月DD日')} | {category.name}
        </Styled.$Date>
      </div>
      <Styled.$TitleWrapper>
        <Styled.$Title>{title}</Styled.$Title>
      </Styled.$TitleWrapper>
      <Styled.$Section>
        <Styled.$Image src={`${eyecatch ? eyecatch.url : '/noimage.png'}`} />
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownToHtml.use(highlight).render(post.content) }} />
      </Styled.$Section>
    </Styled.$Main>
  )
}