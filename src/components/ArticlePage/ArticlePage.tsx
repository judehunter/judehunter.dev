import Link from 'next/link';
import tw from 'twin.macro';
import {Footer} from '../Footer';
import {Logo} from '../Logo';
import {PrismAsyncLight as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {format} from 'date-fns';
import {MDXRemote} from 'next-mdx-remote';
import Img from 'next/future/image';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import {YouveReached} from './YouveReached';
import {ArticleBottomNav} from './ArticleBottomNav';

SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('tsx', tsx);

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

const CodeBlock = ({lang, code}) => {
  return (
    <SyntaxHighlighter
      language={lang}
      style={nord}
      customStyle={{
        marginLeft: '-25px',
        marginRight: '-25px',
        paddingLeft: '25px',
        paddingRight: '25px',
        fontFamily: '"Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        fontSize: '16px',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

const MDStyle = tw`
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
    bg-[#2a3b4c]
    rounded
    px-1.5
    // [&:before]:(
    //   content["d"]
    // )
  )
  [& hr]:(
    border-top-color[#2a3b4c]
    my-8
  )
  [& em]:(
    font-variation-settings["slnt" -10]
    font-style[normal]
  )
  [& a]:(
    text-[#7fec9d]
    underline 
  )
  [&]:(
    font-variant-ligatures[none]
  )
`;

const ContentSection = ({content}) => {
  return (
    <main tw="relative py-16 overflow-hidden">
      <DotPattern />
      <div tw="relative px-5 sm:px-6 lg:px-8">
        <div tw="text-lg max-w-[50ch] mx-auto leading-8" css={MDStyle}>
          {/* <TinaMarkdown
            components={{
              code_block: (({children}: {children: string}) => {
                const lang = children.slice(0, children.search(/\r?\n/));
                const code = children.slice(children.search(/\n/) + 1);
                return <CodeBlock lang={lang} code={code} />;
              }) as any,
              a: (props) => (
                <a href={props!.url} target="_blank">
                  {props!.children}
                </a>
              ),
            }}
            content={content}
          /> */}
          <MDXRemote
            {...content}
            components={{
              pre: ({children}) => <>{children}</>,
              code: ({className, children}) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <CodeBlock code={children} lang={match[1]} />
                ) : (
                  <code className={className} {...{children}} />
                );
              },
              a: (props) => (
                <a {...props} target="_blank">
                  {props!.children}
                </a>
              ),
            }}
          />
          <ArticleBottomNav />
        </div>
      </div>
    </main>
  );
};

export const ArticlePage = ({source}) => {
  return (
    <>
      <div tw="background-color[#070c10] min-h-screen text-[#dadfe7]">
        <nav tw="pt-24 flex justify-center">
          <Link href="/" passHref>
            <a tw="flex items-center space-x-4 ml-[-10px]">
              <Logo />
              <span tw="font-semibold">jude hunter</span>
            </a>
          </Link>
        </nav>
        <header>
          <div tw="max-w-[600px] mx-auto mt-[80px] mb-[50px] px-6">
            <aside tw="text-center mb-5 opacity-50">
              {format(new Date(source.frontmatter.createDate), 'MMM d, y')} <span tw="mx-4">·</span>{' '}
              {source.frontmatter.tags
                .slice(0, 3)
                .map((x) => `#${x}`)
                .join(' ')}
            </aside>
            <h1 tw="text-3xl text-center font-extrabold tracking-tight leading-[3rem]! text-[#dadfe7] sm:text-4xl">
              {source.frontmatter.title}
            </h1>
          </div>
          <div tw="max-w-[700px] h-[400px] mx-auto relative">
            <Img
              src={source.frontmatter.thumbnail}
              alt={'thumbnail'}
              fill
              priority
              tw="rounded-[8px] object-fit[cover]"
            />
          </div>
        </header>
        <ContentSection content={source}></ContentSection>

        <YouveReached />
        <Footer />
      </div>
    </>
  );
};