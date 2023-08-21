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
  const { fetchPostList } = new MicroCMS();
  const result = await fetchPostList();
  return {
    props: {
      fallback: {
        'api/postList': result
      }
    }
  }
}

export default Index