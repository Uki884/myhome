import React, { useMemo } from 'react';
import md from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import { BaseImage } from '@/components/common/BaseImage';
import * as styles from './style.css';

export const Post = ({frontmatter, content, path, slug}: any) => {
  const { title, author, category, date, bannerImage, tags } = frontmatter

  const imageUrl = useMemo(() => {
    return bannerImage ? `${slug}/${bannerImage}` : ''
  }, [bannerImage])

  const markdownToHtml = md('default', {
      langPrefix: 'lang-',
      linkify: true,
      breaks: true,
      html: true,
    })

  return (
    <main className={styles.main}>
      <div>
        <h2 className={styles.date}>
          {date} | {category}
        </h2>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.tags}>
          {tags.map((tag: string, index: number) => <div className={styles.tag} key={index}>{tag}</div>)}
        </h2>
      </div>
      <section className={styles.section}>
        <BaseImage className={styles.image} src={imageUrl} />
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownToHtml.use(highlight).render(content) }} />
      </section>
    </main>
  )
}