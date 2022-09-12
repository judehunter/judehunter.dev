import tw from 'twin.macro';
// import client from '../../../.tina/__generated__/client';
import {BlogPage} from '../../components/BlogPage/BlogPage';
import {serialize} from 'next-mdx-remote/serialize';
import {readdir, readFile} from 'fs/promises';
import path from 'path';

const BlogPageExport = ({source}) => {
  return (
    <>
      <BlogPage {...{source}} />
    </>
  );
};

export const getStaticProps = async ({params}) => {
  const file = await readFile(path.join('content', 'posts/', `${params.filename}.mdx`), 'utf-8');

  const mdxSource = await serialize(file, {
    parseFrontmatter: true,
    mdxOptions: {},
  });
  return {props: {source: mdxSource}};
};

export const getStaticPaths = async () => {
  const filesString = await readdir(path.join('content', 'posts/'));
  const paths = filesString.map((x) => '/blog/' + x.replace('.mdx', ''));
  return {
    paths: paths,
    fallback: false,
  };
};

export default BlogPageExport;
