import React from 'react';
import { PostList } from '@/components/domain/Post/components/PostList';
import { MicroCMS } from '@/utils/microcms';
import { SWRConfig } from 'swr';

export const Index = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostList />
    </SWRConfig>
  )
}

export const getServerSideProps = async () => {
  const { fetchPosts } = new MicroCMS();
  const result = await fetchPosts();
  return {
    props: {
      fallback: {
        'api/posts': result
      }
    }
  }
}

export default Index