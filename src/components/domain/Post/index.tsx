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

  return (
    <main className={styles.main}>
      <h2 className={styles.date}>{date}</h2>
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.section}>
        <BaseImage className={styles.image} src={imageUrl} />
        <h3>{category} || {tags.join()}</h3>
        <div dangerouslySetInnerHTML={{ __html: md().use(highlight).render(content) }} />
      </section>
    </main>
  )
}