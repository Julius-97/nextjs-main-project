import type { NextPage } from 'next';
import { Fragment } from 'react';

import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { DUMMY_POSTS } from '../dummy-data';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
};

export default HomePage;
