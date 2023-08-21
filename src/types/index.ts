export type Blog = {
  contents: Post[];
  limit: number;
  offset: number;
  totalCount: number;
}

export type CategoryData = {
  contents: Category[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type Category = {
  createdAt: string;
  id: string;
  name: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}

export type Post = {
  category: Category;
  content: string;
  createdAt: string;
  eyecatch: {
    height: number;
    url: string;
    width: number;
  };
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  updatedAt: string;
}