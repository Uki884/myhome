import React from 'react';
import fs from "fs";
import matter from "gray-matter";
import path from 'path';
import { PostDetail } from '@/components/domain/Post/components/PostDetail';

export default function PostPage(props: any) {
  return <PostDetail {...props} />
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const files = fs.readdirSync(postsDirectory);
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const fileName = fs.readFileSync(`${postsDirectory}/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter: frontmatter,
        content,
        path: postsDirectory,
        slug
      },
    };
  }