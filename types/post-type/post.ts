export interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  isFeatured: boolean;
}

export interface PostData extends Post {
  slug: string;
  content: string;
}
