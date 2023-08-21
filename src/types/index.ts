export type PostData = {
  contents: PostDetail[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type CategoryData = {
  contents: CategoryDetail[];
  limit: number;
  offset: number;
  totalCount: number;
};

export type CategoryDetail = {
  createdAt: string;
  id: string;
  name: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}

export type PostDetail = {
  id: string;
  title: string;
  category: CategoryDetail;
  content: string;
  createdAt: string;
  eyecatch: {
    height: number;
    url: string;
    width: number;
  };
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
};