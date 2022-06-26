import React from 'react';
import md from 'markdown-it';
import highlight from 'markdown-it-highlightjs';
import * as styles from './style.css';

export const Post = ({frontmatter, content, path, slug}: any) => {
  const { title, author, category, date, bannerImage, tags } = frontmatter
  return (
    <main className={styles.main}>
      <h2 className={styles.date}>{author} || {date}</h2>
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.section}>
        <img className={styles.image} src={`${slug}/${bannerImage}`} alt="" />
        <h3>{category} || {tags.join()}</h3>
        <div dangerouslySetInnerHTML={{ __html: md().use(highlight).render(content) }} />
      </section>
    </main>
  )
}