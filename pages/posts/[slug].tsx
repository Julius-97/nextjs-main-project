import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../utils/posts-util';
import { PostData } from '../../types/post-type/post';

type PostDetailPageProps = {
  post: PostData;
};

const PostDetailPage: NextPage<PostDetailPageProps> = ({ post }) => {
  return <PostContent post={post} />;
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostsFiles();

  return {
    paths: postFileNames
      .map((pfn) => pfn.replace(/\.md$/, ''))
      .map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  const { slug } = params as { slug: string };

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export default PostDetailPage;
