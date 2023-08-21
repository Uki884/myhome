import React from 'react';
import { PostDetail } from '@/components/domain/Post/components/PostDetail';
import { MicroCMS } from '@/utils/microcms';
import { SWRConfig } from 'swr';

interface Props {
  fallback: { [key: string]: any };
  contentId: string
}

export default function PostPage({ fallback, contentId }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <PostDetail contentId={contentId} />
    </SWRConfig>
  )
}

export async function getServerSideProps({ params: { contentId } }: { params: { contentId: string } }) {
  const { fetchPostDetail } = new MicroCMS();
  const result = await fetchPostDetail(contentId);

  return {
    props: {
      contentId,
      fallback: {
        [`api/posts/${contentId}`]: result
      }
    }
  }
}
