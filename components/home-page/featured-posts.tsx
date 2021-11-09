import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';
import { PostData } from '../../types/post-type/post';

type FeaturedPostsProps = {
  posts: PostData[];
};

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
