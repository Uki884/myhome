import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { Posts } from '@/components/domain/Posts';

export const Index = ({ posts }: any) => {
  return <Posts posts={posts} />
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

export default Index