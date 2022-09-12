import Head from 'next/head';
import tw from 'twin.macro';
import client from '../../.tina/__generated__/client';
import {Post} from '../../.tina/__generated__/types';
import {HomePage} from '../components/homePage/HomePage';
import {PagePropsContext} from '../misc/common';

const IndexPage = (props: {posts: Post[]}) => {
  return (
    // original: #0D0D0F
    // other candidates:
    // #10101c
    // #070c10
    <>
      <Head>
        <title>Jude Hunter · Portfolio</title>
        <meta
          name="description"
          content="Hi, I'm Jude Hunter, a web developer, an advocate of free-as-in-freedom software and an active social progressivist in dire need of building empowering solutions. Let's work together!"
        />
        <meta
          name="keywords"
          content="Jude Hunter, developer, frontend, web development, portfolio, coding, programming, professional"
        />
      </Head>
      <PagePropsContext.Provider value={props}>
        <HomePage />
      </PagePropsContext.Provider>
    </>
  );
};
export const getStaticProps = async () => {
  const posts = await client.queries.postConnection({sort: 'createDate'});
  return {props: {posts: posts.data.postConnection.edges!.map((x) => x!.node)}};
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

export default IndexPage;
