import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../utils/posts-util';
import { PostData } from '../types/post-type/post';

type HomePageProps = {
  posts: PostData[];
};

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Giulio Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
};

export default HomePage;
