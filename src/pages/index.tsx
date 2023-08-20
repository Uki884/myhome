import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostList } from '@/components/domain/Post/components/PostList';

export const Index = ({ posts }: any) => {
  return (
    <PostList posts={posts} />
  )
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
  }).sort((a, b) => {
    return (b.frontmatter.date >  a.frontmatter.date ? 1 : -1);
  })

  return {
    props: {
      posts
    },
  };
}

export default Index