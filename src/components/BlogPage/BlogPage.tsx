import {TinaMarkdown} from 'tinacms/dist/rich-text';
import tw from 'twin.macro';
import {Footer} from '../Footer';

const DotPattern = () => {
  return (
    <div tw="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div tw="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
        <svg
          tw="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
          width={404}
          height={384}
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} tw="text-[#2a3b4c]" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <svg
          tw="absolute bottom-12 left-full transform translate-x-32"
          width={404}
          height={384}
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} tw="text-[#2a3b4c]" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
        </svg>
      </div>
    </div>
  );
};

const MDStyle = tw`
  [& h1]:(
    text-3xl
    mb-5
    mt-12
    font-semibold
  )
  [& h2]:(
    text-2xl
    mb-3
    mt-10
    font-semibold
  )
  [& h3]:(
    text-xl
    mb-3
    mt-8
    font-semibold
  )
  [& p]:(
    my-5
  )
`;

const ContentSection = ({content}) => {
  return (
    <div tw="relative py-16 overflow-hidden">
      <DotPattern />
      <div tw="relative px-4 sm:px-6 lg:px-8">
        <div tw="text-lg max-w-[50ch] mx-auto leading-8" css={MDStyle}>
          <TinaMarkdown components={{}} content={content} />
        </div>
      </div>
    </div>
  );
};

export const BlogPage = ({data}) => {
  return (
    <div tw="background-color[#070c10] py-1 min-h-screen text-[#dadfe7]">
      <div>
        <div tw="max-w-[600px] mx-auto">
          <h1 tw="text-3xl mt-[200px] mb-[50px] text-center font-extrabold tracking-tight leading-[3rem]! text-[#dadfe7] sm:text-4xl">
            {data.post.title}
          </h1>
        </div>
        <div>test</div>
        <ContentSection content={data.post.body}></ContentSection>
      </div>
      <Footer />
    </div>
  );
};
