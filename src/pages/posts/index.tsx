import React, { Component }  from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';

export const Posts = ({ posts }: any) => {
    return <main>
        {posts.map((post: { slug: any; frontmatter: any; }) => {
            const {slug, frontmatter} = post
            const {title, author, category, date, bannerImage, tags} = frontmatter
            return (<article key={title}>
                <Link href={`/posts/${slug}`}>
                    <h1>{title}</h1>
                </Link>
                <h3>{author}</h3>
                <h3>{date}</h3>
            </article>)
        })}
    </main>
}

export async function getStaticProps(){
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`${postsDirectory}/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts
    },
  };
}

export default Posts