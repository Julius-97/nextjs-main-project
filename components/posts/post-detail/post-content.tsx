import ReactMarkdown, { Components } from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PostData } from '../../../types/post-type/post';

type PostContentProps = {
  post: PostData;
};

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const cumstomComponents: Components = {
    img: ({ alt, src }) => {
      return (
        <Image
          src={`/images/posts/${post.slug}/${src}`}
          alt={alt}
          width={600}
          height={300}
        />
      );
    },
    code: ({ className, children }) => {
      const lang = className!.split('-')[1];
      return (
        <SyntaxHighlighter
          language={lang}
          style={a11yDark}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={cumstomComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
