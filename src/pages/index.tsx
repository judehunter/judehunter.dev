import Head from 'next/head';
import tw from 'twin.macro';
import {IndexPage} from '../components/IndexPage/IndexPage';
import {PagePropsContext} from '../misc/common';
import {serverSerializeAllPosts} from '../misc/mdx';

const getUrl = () =>
  process.env.NODE_ENV === 'development'
    ? typeof window === 'undefined'
      ? 'http://localhost:3000'
      : `http://${window.location.host}`
    : typeof window === 'undefined'
    ? `https://${process.env.VERCEL_URL}`
    : `http://${window.location.host}`;

const IndexPageExport = (
  props: Awaited<ReturnType<typeof getStaticProps>>['props'],
) => {
  const ogImageUrl = `${getUrl()}/ogimages/homepage.png`;

  return (
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
  const posts = await serverSerializeAllPosts();
  console.log(posts.map((x) => x.slug));
  const slimPosts = posts.map((x) => {
    const {source, ...rest} = x;
    return {...rest, source: {frontmatter: source.frontmatter}};
  });
  const pickedSlugs = [
    'chatgpt-helped-me-design-a-brand-new-programming-language',
    'assembly-interpreter-in-typescripts-type-system',
    'how-to-write-your-own-state-management-library',
    'the-journey-of-queso-my-programming-language',
    'creating-wazum-the-webassembly-compilation-library',
  ];
  const pickedPosts = pickedSlugs.map((x) =>
    slimPosts.find((y) => y.slug === x),
  );
  return {props: {posts: pickedPosts}};
};

export default IndexPageExport;
