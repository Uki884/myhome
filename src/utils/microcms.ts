import { CategoryData, PostDetail } from "@/types";
import { createClient } from "microcms-js-sdk";

export class MicroCMS {
  client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      serviceDomain: process.env.NEXT_PUBLIC_MICRO_CMS_DOMAIN,
      apiKey: process.env.NEXT_PUBLIC_MICRO_CMS_API_KEY,
    });
  }

  fetchPostList = async () => {
    return await this.client.getList<PostDetail>({
      endpoint: "blogs",
      queries: {
        orders: "-publishedAt",
      }
    });
  };

  fetchPostDetail = async (contentId: string) => {
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