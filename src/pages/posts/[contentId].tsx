import React from 'react';
import { PostDetail } from '@/components/domain/Post/components/PostDetail';
interface Props {
  contentId: string
}

export default function PostPage({ contentId }: Props) {
  return (
    <PostDetail contentId={contentId} />
  )
}

export async function getServerSideProps({ params: { contentId } }: { params: { contentId: string } }) {
  return {
    props: {
      contentId,
    }
  }
}
