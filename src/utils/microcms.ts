import { Blog, CategoryData, Post } from "@/types";
import { createClient } from "microcms-js-sdk";

export class MicroCMS {
  client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      serviceDomain: process.env.NEXT_PUBLIC_MICRO_CMS_DOMAIN,
      apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY,
    });
  }

  fetchBlog = async () => {
    return await this.client.getList<Blog>({
      endpoint: "blogs",
    });
  };

  fetchPostDetail = async (contentId: string) => {
    return await this.client.getListDetail<Post>({
      endpoint: "blogs",
      contentId,
    });
  };

  fetchCategoryList = async () => {
    return await this.client.getList<CategoryData>({
      endpoint: "categories",
    });
  };
}