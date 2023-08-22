import { PostData } from "@/types";
import { MicroCMS } from "@/utils/microcms";
import useSWR from "swr";

interface Props {
  contentId: string;
}

export const useFetchPostDetail = ({ contentId }: Props) => {
  const { fetchPostDetail } = new MicroCMS();
  const {
    data: post,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/blogs/${contentId}`, () => fetchPostDetail(contentId));

  const update = async (data: PostData) => {
    return await mutate({ ...post, ...data });
  };

  return {
    post,
    error,
    isLoading,
    update,
  };
};
