import PostItem from './post-item';
import classes from './post-grid.module.css';

interface Post {
  title: string;
  description: string;
}

const PostsGrid: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem />
      ))}
    </ul>
  );
};

export default PostsGrid;
