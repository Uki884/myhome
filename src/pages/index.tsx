import React from 'react';
import { PostList } from '@/components/domain/Post/components/PostList';
import { MicroCMS } from '@/utils/microcms';
import { SWRConfig } from 'swr';

export const Index = () => {
  return (
    <PostList />
  )
}

export default Index