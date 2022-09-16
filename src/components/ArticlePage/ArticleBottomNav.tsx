import tw from 'twin.macro';
import Link from 'next/link';
import {Icon} from '@iconify/react';

export const ArticleBottomNav = () => {
  return (
    <footer>
      <hr />
      <nav tw="flex items-center">
        <span tw="flex-grow">Thanks for reading.</span>
        <Link passHref href="/blog">
          <a
            tw="
              px-6 py-2
              border-2
              rounded-full
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
              flex items-center
            "
            className="group"
          >
            See other articles
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
              "
            />
          </a>
        </Link>
      </nav>
      {/* <p></p> */}
    </footer>
  );
};
