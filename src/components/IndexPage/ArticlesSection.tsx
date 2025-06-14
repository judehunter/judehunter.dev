import {usePageProps} from '../../misc/common';
import IndexPageExport from '../../pages';
import {IdOffset, SectionHeader, useIntersectNav} from './misc';
import Link from 'next/link';
import {ArticleItem} from '../ArticleItem';

export const ArticlesSection = () => {
  const ref = useIntersectNav('articles');

  const entries = usePageProps<typeof IndexPageExport>().posts.map((x) => ({
    title: x.source.frontmatter!.title,
    image: x.source.frontmatter!.thumbnail,
    tags: (x.source.frontmatter!.tags as any as string[]).map((x) => x!),
    url: x.url,
    imageBlur: x.thumbnailBlurDataUrl,
    slug: x.slug,
  }));

  return (
    <section tw="md:(max-w-[840px] mx-auto) mt-14" ref={ref}>
      <IdOffset id="articles" />
      <SectionHeader>
        <span>articles</span>
        <Link href="/blog" passHref>
          <a tw="text-gold-8 ml-4 border-b border-gold-8 hover:(text-gold-10)">
            see all
          </a>
        </Link>
      </SectionHeader>

      <div tw="[& > * + *]:(mt-8) mt-11">
        {entries.map((item, i) => (
          <ArticleItem {...item} key={i} />
        ))}
      </div>
    </section>
  );
};
