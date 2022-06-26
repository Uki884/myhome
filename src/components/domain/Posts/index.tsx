import React, { Component }  from 'react';
import Link from 'next/link';
import * as styles from './style.css'
import { BaseCard } from '@/components/common/card/BaseCard';
import Router from 'next/router';

export const Posts = ({ posts }: any) => {
  return (
    <main className={styles.main}>
    {posts.map((post: { slug: any; frontmatter: any; }) => {
        const {slug, frontmatter} = post
      const { title, author, category, date, bannerImage, tags } = frontmatter
      const handleMove = () => {
        Router.push(`/posts/${slug}`)
      }
        return (<BaseCard key={title} onClick={handleMove}>
            <Link href={`/posts/${slug}`}>
                <h1>{title}</h1>
            </Link>
            <h3>{author}</h3>
            <h3>{date}</h3>
        </BaseCard>)
    })}
    </main>
  )
}

export default Posts