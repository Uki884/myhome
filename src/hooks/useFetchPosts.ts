import { PostData } from "@/types";
import { MicroCMS } from "@/utils/microcms";
import useSWR from "swr";

export const useFetchPosts = () => {
  const { fetchPosts } = new MicroCMS();
  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR("api/posts", fetchPosts, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const update = async (data: PostData) => {
    return await mutate({ ...posts, ...data });
  };

  return {
    posts,
    error,
    isLoading,
    update,
  };
};
