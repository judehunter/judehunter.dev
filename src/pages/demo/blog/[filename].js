import {useTina} from 'tinacms/dist/edit-state';
import tw from 'twin.macro';
import client from '../../../../.tina/__generated__/client';
import {BlogPage} from '../../../components/BlogPage/BlogPage';

const Page = (props) => {
  const {data} = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <BlogPage {...{data}} />
    </>
  );
};

export const getStaticProps = async ({params}) => {
  let data = {};
  let query = {};
  let variables = {relativePath: `${params.filename}.mdx`};
  try {
    const res = await client.queries.post(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
      //myOtherProp: 'some-other-data',
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();

  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: {filename: post.node._sys.filename},
    })),
    fallback: false,
  };
};

export default Page;

const components = {
  // PageSection: PageSection,
};
