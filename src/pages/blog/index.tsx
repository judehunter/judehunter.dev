import Head from 'next/head';
import {PagePropsContext} from '../../misc/common';
import {BlogIndexPage} from '../../components/BlogIndexPage/BlogIndexPage';
import {serverSerializeAllPosts} from '../../misc/mdx';

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
  const posts = await serverSerializeAllPosts();
  return {props: {posts}};
};

export default BlogIndexPageExport;
