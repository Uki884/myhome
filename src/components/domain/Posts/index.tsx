import React, { Component }  from 'react';
import Link from 'next/link';
import * as styles from './style.css'
import { BaseCard } from '@/components/common/BaseCard';
import Router from 'next/router';
import { BaseImage } from '@/components/common/BaseImage';

export const Posts = ({ posts }: any) => {
  return (
    <div className={styles.posts}>
    {posts.map((post: { slug: any; frontmatter: any; }) => {
      const {slug, frontmatter} = post
      const { title, author, category, date, bannerImage, tags } = frontmatter
      const handleMove = () => {
        Router.push(`/posts/${slug}`)
      }

      return (
        <BaseCard key={title} onClick={handleMove}>
          <div>
            <BaseImage className={styles.image} src={bannerImage ? `${slug}/${bannerImage}` : ''} alt="" />
            <Link href={`/posts/${slug}`}>
              <h1 className={styles.title}>{title}</h1>
            </Link>
          </div>
          <h3 className={styles.date}>{date}</h3>
        </BaseCard>
      )
    })}
    </div>
  )
}

export default Posts