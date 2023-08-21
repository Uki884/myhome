import { Blog } from "@/types";
import { MicroCMS } from "@/utils/microcms";
import useSWR from "swr";

export const useFetchBlog = () => {
  const { fetchBlog } = new MicroCMS();
  const {
    data: blog,
    error,
    isLoading,
    mutate,
  } = useSWR("blogs", fetchBlog, {
    // またそれ以外の自動再検証の設定をすべてやめる
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const update = async (data: Blog) => {
    return await mutate({ ...blog, ...data });
  };

  return {
    blog,
    error,
    isLoading,
    update,
  };
};
