import { NextPage } from 'next';
import { GetStaticProps } from 'next';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../utils/posts-util';
import { PostData } from '../../types/post-type/post';

type AllPostsPageProps = {
  posts: PostData[];
};

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => {
  return <AllPosts posts={posts} />;
};

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
};

export default AllPostsPage;
