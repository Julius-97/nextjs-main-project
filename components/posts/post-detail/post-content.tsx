import ReactMarkdown, { Components } from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import { PostData } from '../../../types/post-type/post';

type PostContentProps = {
  post: PostData;
};

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

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
        <SyntaxHighlighter language={lang} style={a11yDark}>
          {children}
        </SyntaxHighlighter>
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
