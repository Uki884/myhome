import { Category } from "@/types";
import { MicroCMS } from "@/utils/microcms";
import useSWR from "swr";

export const useFetchCategoryList = () => {
  const { fetchCategoryList } = new MicroCMS();
  const {
    data: categoryList,
    error,
    isLoading,
    mutate,
  } = useSWR("categories", fetchCategoryList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const update = async (data: Category) => {
    return await mutate({ ...categoryList, ...data });
  };

  return {
    categoryList,
    error,
    isLoading,
    update,
  };
};
