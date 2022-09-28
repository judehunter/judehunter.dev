import tw, {css} from 'twin.macro';
// import client from '../../../.tina/__generated__/client';
import {ArticlePage} from '../../components/ArticlePage/ArticlePage';
import {bundleMDX} from 'mdx-bundler';
import {readdir, readFile, stat} from 'fs/promises';
import path from 'path';
import {Global} from '@emotion/react';
import {visit} from 'unist-util-visit';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRemoteRefresh} from 'next-remote-refresh/hook';
import dynamic from 'next/dynamic';
// import {Suspense} from 'react';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const ArticlePageExport = ({source}: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
  const T = dynamic(
    () => import('../../../content/posts/how-to-write-your-own-state-management-library/Test').then((x) => x.Test),
    {ssr: true, suspense: false},
  );
  const router = useRouter();
  useRemoteRefresh({
    shouldRefresh: (path) => path.includes(router.query.slug as string),
  });
  const {slug} = router.query;

  const ogImageUrl = `${getUrl()}/ogimages/${slug}.png`;

  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'Fira Code';
            src: url('/FiraCode-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
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
        <link rel="canonical" href={`https://judehunter.dev/blog/${slug}`} />
      </Head>
      {/* <Suspense fallback={'test'}> */}
      <T />
      {/* </Suspense> */}
      <ArticlePage {...{source}} />
    </>
  );
};

export const getStaticProps = async ({params}) => {
  const fileExists = async (path) => !!(await stat(path).catch((e) => false));

  let rel = path.join('content', 'posts/', params.slug);
  const isDir = await fileExists(rel);
  rel = isDir ? path.join(rel, 'index.mdx') : rel + '.mdx';
  const file = await readFile(rel, 'utf-8');

  const {code, frontmatter} = await bundleMDX({
    source: file,
    cwd: isDir ? path.resolve(path.join('content', 'posts/', params.slug)) : undefined,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'text') {
              node.value = (node.value as string).replace(/---/g, '—').replace(/--/g, '–');
            }
          });
        },
      ];
      return options;
    },
  });

  return {props: {source: {code, frontmatter}}};
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
