import PostItem from './post-item';
import classes from './posts-grid.module.css';
import { PostData } from '../../types/post-type/post';

type PostsGridProps = {
  posts: PostData[];
};

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
