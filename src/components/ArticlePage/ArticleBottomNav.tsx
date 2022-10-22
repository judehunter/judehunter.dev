import tw from 'twin.macro';
import Link from 'next/link';
import {Icon} from '@iconify/react';
import {usePageProps} from '../../misc/common';
import ArticlePageExport from '../../pages/blog/[slug]';

export const ArticleBottomNav = () => {
  const {nextUp} = usePageProps<typeof ArticlePageExport>();
  return (
    <>
      <nav tw="flex items-center md:flex-col flex-col text-lg md:px-0 pl-6 pr-6">
        <Link passHref href={nextUp.url}>
          <a
            tw="
              px-6 md:py-2 py-4
              border-2
              rounded-xl
              md:rounded-full
              border-[#dadfe7]
              text-[#dadfe7]!
              no-underline!
              font-medium
              transition-all
              // transition-duration[0.5s]
              hover:(
                text-[#7fec9d]!
                border-[#7fec9d]
              )
              line-height[32px]
              mt-8
              // md:mt-0
            "
            className="group"
          >
            <div tw="flex">
              <div tw="text-xs h-[20px] mt-[-23px] md:(mt-[-16px] mb-[-4px]) font-semibold text-[#7fec9d] bg-[#070c10] px-1 -mx-1">
                UP NEXT
              </div>
            </div>
            <div tw="flex items-center">
              <span tw="text-sm">{nextUp.title}</span>
              <Icon
                icon="la:long-arrow-alt-right"
                tw="
                  font-size[2em]
                  ml-[7px]
                  mr-[-45px]
                  transition-transform
                  group-hover:(
                    transform[translateX(12px)]
                  )
                  flex-shrink-0
                "
              />
            </div>
          </a>
        </Link>
        <div tw="text-sm opacity-70 mt-3">
          or{' '}
          <Link passHref href="/blog">
            <a tw="text-[rgba(218, 223, 231)]! underline">see all articles</a>
          </Link>
        </div>
      </nav>
    </>
  );
};
