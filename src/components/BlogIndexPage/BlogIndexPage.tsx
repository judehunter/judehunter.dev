import tw from 'twin.macro';
import Link from 'next/link';
import {Logo} from '../Logo';
import {ArticleCard} from '../ArticleCard';
import {usePageProps} from '../../misc/common';
import BlogIndexPageExport from '../../pages/blog';
import {Footer} from '../Footer';

export const BlogIndexPage = () => {
  const {posts} = usePageProps<typeof BlogIndexPageExport>();

  const entries = posts
    .sort((a, b) => new Date(b.frontmatter!.createDate).getTime() - new Date(a.frontmatter!.createDate).getTime())
    .slice(0, 4)
    .map((x) => ({
      title: x.frontmatter!.title,
      image: x.frontmatter!.thumbnail,
      tags: (x.frontmatter!.tags as any as string[]).map((x) => x!),
      url: x.url,
      imageBlur: x.thumbnailBlurDataUrl,
    }));

  const tileStyles = tw`
    [& a]:(text-[red])
  `;

  const bigTileStyles = [
    tileStyles,
    tw`
      [& .thumbnail]:(md:aspect-ratio[4 / 2])
      [& h1]:(md:text-3xl text-2xl)
      [& h2]:(text-lg)
    `,
  ];

  return (
    <>
      <div tw="background-color[#070c10] min-h-screen text-[#dadfe7]">
        <nav tw="pt-24 flex justify-center">
          <Link href="/" passHref>
            <a tw="flex items-center space-x-4 ml-[-10px]">
              <span tw="font-semibold">the </span>
              <Logo />
              <span tw="font-semibold">jude hunter blog</span>
            </a>
          </Link>
        </nav>
        <main tw="pb-[100px] mt-[100px] grid md:grid-template-columns[repeat(4, 1fr)] grid-template-columns[repeat(1, 1fr)] gap[50px 30px] max-w-[1300px] px-6 mx-auto">
          <ArticleCard tw="md:grid-column[1 / 3]" css={bigTileStyles} {...entries[0]} />
          <ArticleCard tw="md:grid-column[3 / 5]" css={bigTileStyles} {...entries[1]} />
          {entries.slice(2).map((x, i) => (
            <ArticleCard
              //   tw="
              //   width[100%]
              //   [@media (min-width: 600px)]:(
              //     width[50%]
              //   )
              //   [@media (min-width: 800px)]:(
              //     width[29%]
              //   )
              //   [@media (min-width: 1160px)]:(
              //     width[min(23%, 300px)]
              //   )
              // "
              //   css={[
              //     i === 2 &&
              //       css`
              //         display: none;
              //         @media (min-width: 800px) {
              //           display: flex;
              //         }
              //       `,
              //     i === 3 &&
              //       css`
              //         display: none;
              //         @media (min-width: 1160px) {
              //           display: flex;
              //         }
              //       `,
              //   ]}
              key={i}
              {...x}
            />
          ))}
        </main>

        <Footer />
      </div>
    </>
  );
};
