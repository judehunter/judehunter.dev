import {motion} from 'framer-motion';
import Img from 'next/image';
import Link from 'next/link';
import {ReactNode} from 'react';
import tw, {css} from 'twin.macro';
import {usePageProps} from '../../misc/common';
import IndexPage from '../../pages';
import {ScrollInterpolationPullUp} from './misc';

const BlogEntryCard2 = ({title, tags}: {title: string; tags?: string[]}) => {
  return (
    <ScrollInterpolationPullUp length={250}>
      <motion.div
        tw="
          border-radius[7px] background-color[#0E151C] text-white width[414px] padding[27px 34px]
          cursor-pointer
          transition-shadow
          transition-duration[.3s]
          hover:(
            box-shadow[8px 8px 0 #7FEC9D]
          )
        "
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.h1
          tw="text-xl font-semibold margin-bottom[10px]"
          variants={{
            rest: {fontVariationSettings: '"slnt" 0', transition: {duration: 0.3}},
            hover: {fontVariationSettings: '"slnt" -10', transition: {duration: 0.3}},
          }}
        >
          {title}
        </motion.h1>
        <div tw="font-light">#javascript</div>
      </motion.div>
    </ScrollInterpolationPullUp>
  );
};

const BlogEntryCard = ({
  title,
  image,
  tags,
  url,
  imageBlur,
  ...rest
}: {
  title: string;
  tags: string[];
  image: string;
  imageBlur: string;
  url: string;
}) => {
  return (
    <Link passHref href={url}>
      <a tw="flex flex-col text-white cursor-pointer" {...rest} className={`${(rest as any).className ?? ''} group`}>
        <div tw="flex items-end flex-grow">
          <div tw="">
            <h1
              tw="
                font-semibold text-xl
                font-variation-settings['slnt' 0]
                group-hover:(
                  font-variation-settings['slnt' -10]
                  text-[#7FEC9D]
                )
                transition-all
                transition-duration[200ms]
              "
            >
              {title}
            </h1>
            <h2 tw="mt-[10px] opacity-50 text-sm">
              {tags
                .slice(0, 3)
                .map((x) => `#${x}`)
                .join(' ')}
            </h2>
          </div>
        </div>
        <div tw="mt-[15px] relative">
          {/* <div
            tw="bg-center bg-cover w-full aspect-ratio[3 / 4] rounded-[8px]"
            style={{backgroundImage: `url('${image}')`}}
          /> */}
          <div tw="relative w-full aspect-ratio[3 / 4] rounded-[8px]" style={{backgroundImage: `url('${image}')`}}>
            <Img
              src={image}
              alt={title}
              layout="fill"
              tw="transition-all rounded-[8px] object-fit[cover]"
              placeholder="blur"
              blurDataURL={imageBlur}
              priority
            />
          </div>
          {/* <img tw="rounded-[8px] w-full" src={image} /> */}
          <div
            tw="
              absolute left-0 top-0 right-0 bottom-0
              border-[3px] border-color[#7FEC9D] rounded-[14px]
              opacity-0
              transition-all
              group-hover:(
                opacity-100
                left-[-6px]
                top-[-6px]
                right-[-6px]
                bottom-[-6px]
              )
            "
          ></div>
        </div>
      </a>
    </Link>
  );
};

const BlogEntries = () => {
  // const entries2 = [
  //   {
  //     title: 'Wazum, a WebAssembly compiler architecture library',
  //     image: 'https://picsum.photos/seed/2/300/400',
  //     tags: ['wasm'],
  //   },
  //   {
  //     title: 'The inception of the Queso programming language',
  //     image: 'https://picsum.photos/seed/1/300/400',
  //     tags: ['javascript', 'typescript', 'wasm'],
  //   },
  //   {
  //     title: 'The only API stack you should be using',
  //     image: 'https://picsum.photos/seed/3/300/400',
  //     tags: ['javascript'],
  //   },
  //   {
  //     title: 'The only API stack you should be using',
  //     image: 'https://picsum.photos/seed/9/300/400',
  //     tags: ['typescript'],
  //   },
  // ];
  const entries = usePageProps<typeof IndexPage>()
    .posts.sort((a, b) => new Date(a.frontmatter!.createDate).getTime() - new Date(b.frontmatter!.createDate).getTime())
    .slice(0, 4)
    .reverse()
    .map((x) => ({
      title: x.frontmatter!.title,
      image: x.frontmatter!.thumbnail,
      tags: (x.frontmatter!.tags as any as string[]).map((x) => x!),
      url: x.url,
      imageBlur: x.thumbnailBlurDataUrl,
    }));
  return (
    // <div tw="flex space-x-[40px] height[400px] padding-right[20px] margin-top[-58px] overflow-hidden">
    <div>
      <div
        tw="
          flex justify-between
          flex-col
          space-y-[50px]
          [@media (min-width: 600px)]:(
            flex-row
            space-x-[30px]
            space-y-0
          )
        "
      >
        {entries.slice(0, 4).map((x, i) => (
          <BlogEntryCard
            tw="
              width[100%]
              [@media (min-width: 600px)]:(
                width[50%]
              )
              [@media (min-width: 800px)]:(
                width[29%]
              )
              [@media (min-width: 1160px)]:(
                width[min(23%, 300px)]
              )
            "
            css={[
              i === 2 &&
                css`
                  display: none;
                  @media (min-width: 800px) {
                    display: flex;
                  }
                `,
              i === 3 &&
                css`
                  display: none;
                  @media (min-width: 1160px) {
                    display: flex;
                  }
                `,
            ]}
            key={i}
            {...x}
          />
        ))}
        {/* <div tw="bg-[#0e151c] w-[50px] align-self[stretch] font-semibold text-white items-center justify-center rounded-[8px] cursor-pointer hover:(bg-[#7FEC9D] text-black) transition-all hidden [@media (min-width: 800px)]:flex">
          <div tw="transform[rotateZ(-90deg)] whitespace-nowrap">See more</div>
        </div> */}
      </div>
      {/* <div tw="bg-[#0e151c] h-[50px] font-semibold text-white flex items-center justify-center rounded-[8px] cursor-pointer hover:(bg-[#7FEC9D] text-black) transition-all [@media (min-width: 800px)]:hidden mt-[30px]">
        <div tw="whitespace-nowrap">See more</div>
      </div> */}
    </div>
  );
};

const SectionTitle = ({children, variant, ...rest}: {children: ReactNode; variant: 'line-dedent'}) => {
  return (
    <div tw="flex items-baseline text-white margin-left[30px] text-4xl" {...rest}>
      <div>
        <div tw="width[80px] margin-right[30px] height[1px] bg-white opacity-50 margin-top[-0.4em]" />
      </div>
      <h1 tw="font-medium tracking-wide line-height[1.2]">{children}</h1>
    </div>
  );
};

export const BlogSection = () => {
  return (
    <div tw="max-width[1300px] mx-auto px-6 box-sizing[content-box] padding-top[40px] z-index[10] relative">
      <div tw="absolute top-[-120px]" id="blog" />
      <div tw="flex justify-center">
        {/* <SectionTitle tw="width[340px] flex-shrink-0" variant="line-dedent">
          latest
          <br />
          entries */}
        {/* </SectionTitle> */}
        {/* <div tw="width[105px]" /> */}
        <BlogEntries />
      </div>
    </div>
  );
};
