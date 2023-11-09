import {useEffect, useState} from 'react';
import {usePageProps} from '../../misc/common';
import IndexPageExport from '../../pages';
import {IdOffset, SectionHeader, useIntersectNav} from './misc';
import Link from 'next/link';
import Img from 'next/image';
import tw from 'twin.macro';
import {Icon} from '@iconify/react';

const ArticleItem = ({title, image, tags, url, imageBlur, slug}) => {
  const [likes, setLikes] = useState<number | null>(12354);

  const getLikes = async () =>
    fetch('/api/getPostLikes', {
      method: 'POST',
      body: JSON.stringify({slug}),
    }).then((x) => x.json());

  useEffect(() => {
    getLikes().then(setLikes);
  }, []);

  return (
    <Link passHref href={url}>
      <a
        tw="flex flex-col md:(flex-row h-[130px]) cursor-pointer "
        className="group"
      >
        <div tw="h-[100px] md:(h-auto w-[320px] pl-28) flex">
          <div tw="relative grow rounded-[16px]">
            <Img
              src={image}
              alt={title}
              layout="fill"
              tw="
                transition-all rounded-[8px] [object-fit: cover]
              "
              placeholder="blur"
              blurDataURL={imageBlur}
              priority
            />
          </div>
        </div>
        <div tw="pt-5 md:(pt-0 pl-5)">
          <h1 tw="font-medium text-gold-12 max-w-[350px]">{title}</h1>
          <h2 tw="[& > * + *]:(ml-2) font-medium text-gold-11 mt-3.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
          </h2>
          {likes ? (
            <div tw="flex items-center font-medium text-yellow-9 mt-4 gap-x-3">
              <Icon icon="ph:hands-clapping-fill" width={25} height={25} />
              <div>{likes}</div>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};

export const ArticlesSection = () => {
  const ref = useIntersectNav('articles');

  const entries = usePageProps<typeof IndexPageExport>()
    .posts.sort(
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
