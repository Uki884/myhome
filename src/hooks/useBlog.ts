import { useFetchBlog } from "./useFetchBlog";
import { useFetchCategoryList } from "./useFetchCategoryList";

export const useBlog = () => {
  const { blog, isLoading: isLoadingBlog } = useFetchBlog();
  const { categoryList, isLoading: isLoadingCategories } = useFetchCategoryList();

  return {
    blog,
    isLoadingBlog,
    isLoadingCategories,
    categoryList,
  };
};
