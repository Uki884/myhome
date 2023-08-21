import { PostData, CategoryData, PostDetail } from "@/types";
import { createClient } from "microcms-js-sdk";

export class MicroCMS {
  client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      serviceDomain: process.env.NEXT_PUBLIC_MICRO_CMS_DOMAIN,
      apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY,
    });
  }

  fetchPosts = async () => {
    return await this.client.getList<PostDetail>({
      endpoint: "blogs",
    });
  };

  fetchPostDetail = async (contentId: string) => {
    console.log("contentId", contentId);
    return await this.client.getListDetail<PostDetail>({
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