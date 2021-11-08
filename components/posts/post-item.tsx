import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.css';
import { Post } from '../../types/post-type/post';

type PostItemProps = {
  post: Post;
  key: string;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { date, excerpt, image, slug, title } = post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  console.log(imagePath);

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
