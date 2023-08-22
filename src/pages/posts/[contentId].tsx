import React from 'react';
import { PostDetail } from '@/components/domain/Post/components/PostDetail';
import { MicroCMS } from '@/utils/microcms';
import { GetStaticProps } from 'next/types';
import { SWRConfig } from 'swr';
interface Props {
  contentId: string
  fallback: { [key: string]: any }
}

export default function PostPage({ contentId, fallback }: Props) {
  console.log('contentId', contentId)
  return (
    <SWRConfig value={{ fallback }}>
      <PostDetail contentId={contentId} />
    </SWRConfig>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const contentId = params.contentId as string;
  const { fetchPostDetail } = new MicroCMS();
  const data = await fetchPostDetail(contentId);
  return {
    props: {
      data: data,
      contentId,
      fallback: {
        [`api/posts/${contentId}`]: data
      },
      revalidate: 1
    },
  };
};

export async function getStaticPaths(){
  const { fetchPostList } = new MicroCMS();
  const data = await fetchPostList();
  const pathList = data.contents.map((blog) => {
    return {
      params: {
        contentId: blog.id,
      },
    };
  });

  return {
    paths: pathList,
    fallback: false,
  }
}