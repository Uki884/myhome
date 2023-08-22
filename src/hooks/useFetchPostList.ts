import { PostData } from "@/types";
import { MicroCMS } from "@/utils/microcms";
import useSWR from "swr";

export const useFetchPostList = () => {
  const { fetchPostList } = new MicroCMS();
  const {
    data: postList,
    error,
    isLoading,
    mutate,
  } = useSWR("api/posts", fetchPostList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const update = async (data: PostData) => {
    return await mutate({ ...postList, ...data });
  };

  return {
    postList,
    error,
    isLoading,
    update,
  };
};
