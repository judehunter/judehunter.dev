import tw, {css} from 'twin.macro';
import {Footer} from '../Footer';
import {format} from 'date-fns';
import Img from 'next/future/image';
import {YouveReached} from './YouveReached';
import {ArticleBottomNav} from './ArticleBottomNav';
import {ArticleSideBar} from './ArticleSideBar';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {MDXRemote} from 'next-mdx-remote';
import {usePageProps} from '../../misc/common';
import ArticlePageExport from '../../pages/blog/[slug]';
import {LazyMotion} from 'framer-motion';
import {CookieBanner} from '../CookieBanner';
import {JudeHunterHeader} from '../JudeHunterHeader';
import {ActualNewsletter} from '../IndexPage/NewsletterSection';
import {HeadSvg} from '../IndexPage/svgs';

const DotPattern = () => {
  return (
    <div tw="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full overflow-hidden">
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                tw="text-gold-3"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={384}
            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
          />
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
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                tw="text-gold-3"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={384}
            fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
          />
        </svg>
      </div>
    </div>
  );
};

const MDStyle = tw`
  [font-family: 'Inter var experimental']
  text-gold-12/80
  font-normal
  [font-size: 16px] max-w-[560px] mx-auto leading-[1.7]
  // leading-[1.5]!
  [& h1]:(
    text-3xl
    mb-5
    mt-12
    font-semibold
    // text-[#f1f6ff]
  )
  [& h2]:(
    text-2xl
    mb-3
    mt-10
    font-semibold
    // text-[#f1f6ff]
  )
  [& h3]:(
    text-xl
    mb-3
    mt-8
    font-semibold
    // text-[#f1f6ff]
  )
  [& p]:(
    my-5
  )
  [& ul]:(
    list-style-type[square]
    [li]:(
      my-3
    )
  )
  // [& pre > pre]:(
  //   bg-[#2a3b4c]
  //   px-5
  //   py-2
  //   -ml-5
  //   rounded-[8px]
  // )
  [& :not(pre)>code]:(
    bg-gold-3
    rounded
    px-1.5
    font-family["Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace]!
    font-size[15px] md:font-size[16px]
  )
  [& hr]:(
    border-t border-gold-3
    my-8
  )
  [& em]:(
    font-variation-settings["slnt" -10]
    font-style[normal]
  )
  [& a]:(
    text-yellow-9
    border-b border-yellow-9/50
  )
  [&]:(
    font-variant-ligatures[none]
  )
  [& pre]:(
    margin-left[-25px]!
    margin-right[-25px]!
    padding-left[25px]!
    padding-right[25px]!
    border-radius[0.3em]
  )
  [& pre>code]:(
    font-family["Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace]!
    font-size[15px] md:font-size[16px]
  )
  [& blockquote]:(
    bg-[rgba(127, 236, 157, 0.2)]
    border-l-4
    border-[rgba(127, 236, 157, 1)]
    font-style[oblique 5deg]
    font-weight[500]
    rounded-r-[8px]
    pl-5
    pr-5
    my-5
    py-3
    [& > p]:(
      my-0
    )
  )
  [img]:(
    rounded-[8px]
  )
`;

const ContentSection = ({content, components}) => {
  const slug = useRouter().query.slug as string;
  const dynamics =
    components &&
    Object.fromEntries(
      components.map((x) => {
        x = x.replace('.tsx', '');
        return [
          x,
          dynamic(
            () =>
              import(`../../../content/posts/${slug}/components.tsx`).then(
                (y) => y[x],
              ),
            {
              ssr: true,
              suspense: false,
            },
          ),
        ];
      }),
    );
  return (
    <main tw="relative pt-8">
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-coldark-dark.css"
        />
      </Head> */}
      <DotPattern />
      <ArticleSideBar />
      <div tw="relative px-5 sm:px-6 lg:px-8 overflow-hidden">
        <div css={MDStyle}>
          <MDXRemote
            {...content}
            components={{
              CodeBlock: ({filename, children}) => (
                <>
                  {filename ? (
                    <div tw="flex mb-[-0.5em] mt-[0.5em] font-family['Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace]!">
                      <div tw="bg-gold-3 px-2 -ml-2 rounded-t-[0.3em] font-size[15px] md:font-size[16px]">
                        {filename}
                      </div>
                    </div>
                  ) : null}
                  {children}
                </>
              ),
              // pre: ({meta, ...props}: any) => {
              //   // console.log(meta);
              //   return (
              //     <>
              //       {/* {meta.filename ? <div>{meta.filename}</div> : null} */}
              //       <pre {...props} />
              //     </>
              //   );
              // },
              // code: ({className, children}) => {
              //   const match = /language-(\w+)/.exec(className || '');
              //   return match ? (
              //     <CodeBlock code={children} lang={match[1]} />
              //   ) : (
              //     <code className={className} {...{children}} />
              //   );
              // },
              a: (props) => (
                <a {...props} target="_blank">
                  {props!.children}
                </a>
              ),
              ...dynamics,
            }}
          />
          <hr />
          <div tw="text-center">Thanks for reading.</div>
        </div>
      </div>
    </main>
  );
};

export const ArticlePage = () => {
  const {source, components} = usePageProps<typeof ArticlePageExport>();

  return (
    <>
      <LazyMotion
        features={() =>
          import('../../misc/motionFeatures').then((res) => res.default)
        }
        strict
      >
        <div tw="bg-gold-1 font-black pb-20">
          <JudeHunterHeader />
          <div tw="min-h-screen">
            <header>
              <div tw="max-w-[600px] mx-auto pt-[40px] mb-[30px] px-6 [box-sizing: content-box]">
                <div tw="mb-4 flex items-center space-x-2">
                  <HeadSvg tw="w-[80px] h-[80px] ml-[-20px]!" />
                  <div tw="font-semibold text-gold-11">
                    <h2>jude hunter</h2>
                    <aside tw="opacity-50 text-[14px] mt-2">
                      {format(
                        new Date(source.frontmatter!.createDate),
                        'MMM d, y',
                      )}
                      <span tw="hidden md:inline">
                        {' '}
                        <span tw="mx-4">·</span>{' '}
                      </span>
                      <br tw="inline md:hidden" />
                      {(source.frontmatter!.tags.slice(0, 3) as any as string[])
                        .map((x) => `#${x}`)
                        .join(' ')}
                    </aside>
                  </div>
                </div>
                <h1 tw="text-3xl font-extrabold tracking-tight leading-[1.2]! text-gold-12 sm:text-4xl">
                  {source.frontmatter!.title}
                </h1>
              </div>
              <div
                tw="max-w-[700px] h-[300px] mx-auto relative p-[1px] rounded-[8px]"
                css={[
                  css`
                    background-image: radial-gradient(
                        ellipse 100% 100% at 100% 100%,
                        #ffffff33,
                        transparent
                      ),
                      radial-gradient(
                        ellipse 100% 100% at 0% 30%,
                        #ffffff33,
                        transparent
                      );
                  `,
                ]}
              >
                <div tw="w-full h-full relative">
                  <Img
                    src={source.frontmatter!.thumbnail}
                    alt={'thumbnail'}
                    fill
                    priority
                    tw="rounded-[8px] [object-fit: cover]"
                  />
                </div>
              </div>
            </header>
            <ContentSection content={source} {...{components}} />

            <footer tw="mt-10">
              <ActualNewsletter />

              <ArticleBottomNav />
            </footer>

            <div tw="h-16" />
            <YouveReached />
            <Footer />
          </div>
          <CookieBanner />
        </div>
      </LazyMotion>
    </>
  );
};
