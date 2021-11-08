import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { Post, PostData } from '../types/post-type/post';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (postIdentifier: string) => {
  const postSlug = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData: PostData = {
    slug: postSlug,
    ...(data as Post),
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles
    .map((postFile) => {
      return getPostData(postFile);
    })
    .sort((postA, postB) => (postA.date < postB.date ? -1 : 1));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};
