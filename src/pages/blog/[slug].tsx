import tw, {css} from 'twin.macro';
// import client from '../../../.tina/__generated__/client';
import {ArticlePage} from '../../components/ArticlePage/ArticlePage';
import {readdir} from 'fs/promises';
import path from 'path';
import {Global} from '@emotion/react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useRemoteRefresh} from 'next-remote-refresh/hook';
import {serverSerializeAllPosts, serverSerializePostBySlug} from '../../misc/mdx';
import {PagePropsContext} from '../../misc/common';
// import {Suspense} from 'react';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const ArticlePageExport = (props: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
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
        <title>{props.source.frontmatter!.title} · Jude Hunter</title>
        <meta property="og:title" content={`${props.source.frontmatter!.title} · Jude Hunter`} />
        <meta name="description" content={props.source.frontmatter!.description} />
        <meta property="og:description" content={props.source.frontmatter!.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta name="twitter:image:src" content={ogImageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="keywords"
          content={[...props.source.frontmatter!.tags, ['Jude Hunter', 'coding', 'web development']].join(', ')}
        />
        <meta name="author" content="Jude Hunter" />
        <link rel="canonical" href={`https://judehunter.dev/blog/${slug}`} />
      </Head>
      <PagePropsContext.Provider value={props}>
        <ArticlePage />
      </PagePropsContext.Provider>
    </>
  );
};

export const getStaticProps = async ({params}) => {
  const {source, components} = await serverSerializePostBySlug(params.slug);

  const allPosts = await serverSerializeAllPosts();

  const sortedAllPosts = allPosts.sort(
    (a, b) =>
      new Date(b.source.frontmatter!.createDate).getTime() - new Date(a.source.frontmatter!.createDate).getTime(),
  );

  const thisPostIdx = sortedAllPosts.findIndex((x) => x.slug === params.slug);

  const nextUp = thisPostIdx === sortedAllPosts.length - 1 ? sortedAllPosts[0] : sortedAllPosts[thisPostIdx + 1];

  return {
    props: {
      source,
      components,
      nextUp,
    },
  };
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
