import tw, {css} from 'twin.macro';
// import client from '../../../.tina/__generated__/client';
import {ArticlePage} from '../../components/ArticlePage/ArticlePage';
import {serialize} from 'next-mdx-remote/serialize';
import {readdir, readFile} from 'fs/promises';
import path from 'path';
import {Global} from '@emotion/react';
import {visit} from 'unist-util-visit';
import Head from 'next/head';
import {useRouter} from 'next/router';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const ArticlePageExport = ({source}: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
  const router = useRouter();
  const {filename} = router.query;

  const ogImageUrl = `${getUrl()}/ogimages/${filename}.png`;

  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'Fira Code';
            src: url('/FiraCode-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            display: swap;
          }
        `}
      />
      <Head>
        <title>{source.frontmatter!.title} · Jude Hunter</title>
        <meta property="og:title" content={`${source.frontmatter!.title} · Jude Hunter`} />
        <meta name="description" content={source.frontmatter!.description} />
        <meta property="og:description" content={source.frontmatter!.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta name="twitter:image:src" content={ogImageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content={[...source.frontmatter!.tags, ['Jude Hunter', 'coding', 'web development']].join(', ')}
        />
        <meta name="author" content="Jude Hunter" />
        <link rel="canonical" href={`https://judehunter.dev/blog/${filename}`} />
      </Head>
      <ArticlePage {...{source}} />
    </>
  );
};

export const getStaticProps = async ({params}) => {
  const file = await readFile(path.join('content', 'posts/', `${params.filename}.mdx`), 'utf-8');

  const mdxSource = await serialize(file, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'text') {
              node.value = (node.value as string).replace(/---/g, '—').replace(/--/g, '–');
            }
          });
        },
      ],
    },
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

export default ArticlePageExport;
