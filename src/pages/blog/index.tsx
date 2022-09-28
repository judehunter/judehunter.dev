import {lstat, readdir, readFile} from 'fs/promises';
import Head from 'next/head';
import path from 'path';
import {getPlaiceholder} from 'plaiceholder';
import {PagePropsContext} from '../../misc/common';
import {BlogIndexPage} from '../../components/BlogIndexPage/BlogIndexPage';
import {bundleMDX} from 'mdx-bundler';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const BlogIndexPageExport = (props: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
  const ogImageUrl = `${getUrl()}/ogimages/homepage.png`;

  return (
    <>
      <Head>
        <title>The Jude Hunter Blog</title>
        <meta property="og:title" content="The Jude Hunter Blog" />
        <meta
          name="description"
          content="Read Jude Hunter's articles on advanced JavaScript, TypeScript, React, Web Development, Compiler Theory, and just plain old life."
        />
        <meta
          property="og:description"
          content="Read Jude Hunter's articles on advanced JavaScript, TypeScript, React, Web Development, Compiler Theory, and just plain old life."
        />
        <meta
          name="keywords"
          content="Jude Hunter, blog, developer, frontend, javascript, typescript, web development, coding, programming, advanced"
        />
        <meta property="og:type" content="website" />
        <meta name="author" content="Jude Hunter" />
        <link rel="canonical" href={`https://judehunter.dev/blog`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta name="twitter:image:src" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <PagePropsContext.Provider value={props}>
        <BlogIndexPage />
      </PagePropsContext.Provider>
    </>
  );
};

export const getStaticProps = async () => {
  const filesOrDirs = await readdir(path.join('content', 'posts/'));
  const posts = await Promise.all(
    filesOrDirs.map(async (x) => {
      let rel = path.join('content', 'posts/', x);
      rel = (await lstat(rel)).isDirectory() ? path.join(rel, '/index.mdx') : rel;
      const mdxData = await bundleMDX({
        source: await readFile(rel, 'utf-8'),
      });
      const {base64: thumbnailBlurDataUrl} = await getPlaiceholder(mdxData.frontmatter!.thumbnail, {size: 4});
      return {
        ...mdxData,
        thumbnailBlurDataUrl,
        url: '/blog/' + x.replace('.mdx', ''),
      };
    }),
  );
  return {props: {posts}};
};

export default BlogIndexPageExport;
