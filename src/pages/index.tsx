import {readdir, readFile} from 'fs/promises';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import path from 'path';
import {getPlaiceholder} from 'plaiceholder';
import tw from 'twin.macro';
import {IndexPage} from '../components/IndexPage/IndexPage';
import {PagePropsContext} from '../misc/common';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const IndexPageExport = (props: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
  const ogImageUrl = `${getUrl()}/ogimages/homepage.png`;

  return (
    // original: #0D0D0F
    // other candidates:
    // #10101c
    // #070c10
    <>
      <Head>
        <title>Jude Hunter · Portfolio</title>
        <meta property="og:title" content="Jude Hunter · Portfolio" />
        <meta
          name="description"
          content="Hi, I'm Jude Hunter, a web developer, an advocate of free-as-in-freedom software and an active social progressivist in dire need of building empowering solutions. Let's work together!"
        />
        <meta
          property="og:description"
          content="Hi, I'm Jude Hunter, a web developer, an advocate of free-as-in-freedom software and an active social progressivist in dire need of building empowering solutions. Let's work together!"
        />
        <meta
          name="keywords"
          content="Jude Hunter, developer, frontend, web development, portfolio, coding, programming, professional"
        />
        <meta property="og:type" content="website" />
        <meta name="author" content="Jude Hunter" />
        <link rel="canonical" href={`https://judehunter.dev`} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta name="twitter:image:src" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <PagePropsContext.Provider value={props}>
        <IndexPage />
      </PagePropsContext.Provider>
    </>
  );
};
export const getStaticProps = async () => {
  // const posts = await client.queries.postConnection({sort: 'createDate'});
  const filesString = await readdir(path.join('content', 'posts/'));
  const posts = await Promise.all(
    filesString.map(async (x) => {
      const mdxData = await serialize(await readFile(path.join('content', 'posts/', x), 'utf-8'), {
        parseFrontmatter: true,
        mdxOptions: {},
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

// export const getStaticProps = async () => {
//   // const postsResponse = await client.queries;
//   // console.log(postsResponse);
//   // const posts = postsResponse.data.postConnection.edges.map((x) => {
//   // return {filename: x.node._sys.filename};
//   // });
//   // return {
//   // posts,
//   // };
// };

export default IndexPageExport;
