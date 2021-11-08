import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import { PostData } from '../../types/post-type/post';

type AllPostsProps = {
  posts: PostData[];
};

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
