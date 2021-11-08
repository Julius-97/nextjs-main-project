import ReactMarkdown from 'react-markdown';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PostData } from '../../../types/post-type/post';

type PostContentProps = {
  post: PostData;
};

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{'# This is a first post'}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
