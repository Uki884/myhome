import React, { useMemo } from 'react';
import md from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import vue from 'vue-highlight.js/lib/languages/vue';
import * as Styled from './styled';

export const Post = ({frontmatter, content, path, slug}: any) => {
  const { title, author, category, date, bannerImage, tags } = frontmatter

  const imageUrl = useMemo(() => {
    return bannerImage ? `/${slug}/${bannerImage}` : '/noimage.png'
  }, [bannerImage])

  const markdownToHtml = md('default', {
      langPrefix: 'lang-',
      linkify: true,
      breaks: true,
        html: true,
  })

  highlight(markdownToHtml, { register: { typescript, javascript, vue } })

  return (
    <Styled.$Main>
      <div>
        <Styled.$Date>
          {date} | {category}
        </Styled.$Date>
      </div>
      <Styled.$TitleWrapper>
        <Styled.$Title>{title}</Styled.$Title>
        <Styled.$Tags>
          {tags.map((tag: string, index: number) => <Styled.$Tag key={index}>{tag}</Styled.$Tag>)}
        </Styled.$Tags>
      </Styled.$TitleWrapper>
      <Styled.$Section>
        <Styled.$Image src={imageUrl} />
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownToHtml.use(highlight).render(content) }} />
      </Styled.$Section>
    </Styled.$Main>
  )
}