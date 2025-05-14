import tw from 'twin.macro';
import {usePageProps} from '../../misc/common';
import BlogIndexPageExport from '../../pages/blog';
import {LazyMotion} from 'framer-motion';
import {CookieBanner} from '../CookieBanner';
import {JudeHunterHeader} from '../JudeHunterHeader';
import {ArticleItem} from '../ArticleItem';
import {ActualNewsletter} from '../IndexPage/NewsletterSection';

export const BlogIndexPage = () => {
  const {posts} = usePageProps<typeof BlogIndexPageExport>();

  const entries = posts
    .sort(
      (a, b) =>
        new Date(b.source.frontmatter!.createDate).getTime() -
        new Date(a.source.frontmatter!.createDate).getTime(),
    )
    .map((x) => ({
      title: x.source.frontmatter!.title,
      image: x.source.frontmatter!.thumbnail,
      tags: (x.source.frontmatter!.tags as any as string[]).map((x) => x!),
      url: x.url,
      imageBlur: x.thumbnailBlurDataUrl,
      slug: x.slug,
    }));

  return (
    <>
      <LazyMotion
        features={() =>
          import('../../misc/motionFeatures').then((res) => res.default)
        }
        strict
      >
        <div tw="bg-gold-1 min-h-screen font-black pb-20 px-4">
          <JudeHunterHeader />
          <div tw="mt-8">
            <ActualNewsletter />
          </div>
          <div tw="[& > * + *]:(mt-8) md:(max-w-[840px] mx-auto) mt-14">
            {entries.map((item, i) => (
              <ArticleItem {...item} key={i} />
            ))}
          </div>
        </div>

        <CookieBanner />
      </LazyMotion>
    </>
  );
};
