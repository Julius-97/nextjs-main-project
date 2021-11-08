import { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../utils/posts-util';
import { PostData } from '../../types/post-type/post';

type AllPostsPageProps = {
  posts: PostData[];
};

const AllPostsPage: NextPage<AllPostsPageProps> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
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
