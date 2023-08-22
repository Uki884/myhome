import React from 'react';
import { PostList } from '@/components/domain/Post/components/PostList';
import { MicroCMS } from '@/utils/microcms';
import { SWRConfig } from 'swr';

interface Props {
  fallback: { [key: string]: any }
}

export const Index = ({ fallback }: Props) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostList />
    </SWRConfig>
  )
}

export async function getStaticProps(){
  const { fetchPostList } = new MicroCMS();
  const data = await fetchPostList();
  return {
    props: {
      fallback: {
        'api/posts': data
      },
      revalidate: 1
    },
  }
}

export default Index