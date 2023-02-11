import {m} from 'framer-motion';
import Link from 'next/link';
import {useRouter} from 'next/router';
import tw, {css} from 'twin.macro';
import {BareLogo, Logo} from './Logo';

const NavLink = ({href, children}) => {
  return (
    <Link passHref {...{href}}>
      <a>{children}</a>
    </Link>
  );
};

export const NavBar = () => {
  return (
    <div
      tw="fixed left-0 top-0 right-0 text-[#f7f8f8] z-[999999999]"
      css={[
        css`
          // mask: linear-gradient(
          //   to top,
          //   rgba(0, 0, 0, 0) 0%,
          //   rgba(0, 0, 0, 1) 40px
          // );
          // background-image: linear-gradient(
          //   to bottom,
          //   #000212 0px,
          //   #00021200 20px
          // );
        `,
      ]}
    >
      <div
        css={[
          css`
            z-index: 1;
            &::before {
              content: '';
              position: absolute;
              inset: -1px 0 -60%;
              backdrop-filter: blur(12px);
              z-index: 0;
              mask: linear-gradient(to bottom, black 50px, transparent);
              background-image: linear-gradient(
                to bottom,
                #000212 0px,
                #00021200 30px
              );
            }
          `,
        ]}
      />
      <div tw="max-w-[500px] mx-auto px-6 box-sizing[content-box] relative">
        <div
          tw="
            py-0 flex items-center justify-between font-medium text-[14px] border-b border-b-[#ffffff22] mb-0
            w-full
          "
        >
          <div tw="flex items-center flex-grow [& > *]:(px-[12px] my-2) mx-[-12px]">
            <Link href="/" passHref>
              <a>
                <BareLogo tw="w-[30px] h-[30px] box-sizing[content-box]" />
              </a>
            </Link>
            <Link href="/" passHref>
              <a tw="hidden md:block">Portfolio</a>
            </Link>
            <Link href="/blog" passHref>
              Blog
            </Link>
            <Link href="/#work" passHref>
              Work
            </Link>
            <Link href="/#contact" passHref>
              Contact
            </Link>
          </div>
          <div tw="ml-[24px]">
            <div>Newsletter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NavBar3 = () => {
  const {pathname} = useRouter();
  return (
    <m.nav
      tw="
        fixed top-0 left-0 right-0 flex justify-center z-index[999999999]
        text-[#dadfe7]
      "
      initial={{opacity: pathname === '/' ? 0 : 1}}
      animate={{opacity: 1}}
      transition={{delay: 1}}
    >
      <div
        tw="absolute left-0 top-0 bottom-0 right-0 backdrop-filter[blur(4px)] z-index[0]"
        css={[
          css`
            mask: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 100%
            );
          `,
        ]}
      />
      <div tw="absolute left-0 top-0 bottom-0 right-0 z-index[1] background-image[linear-gradient(to bottom, rgba(7,12,16,1) 20%, rgba(7,12,16,0) 90%)]" />
      <div tw="md:mt-4 flex-grow max-w-[800px] py-3 background-image[linear-gradient(to bottom, #070c10dd 25%, #0e151c00)] md:background-image[linear-gradient(to bottom, #070c10, #0e151c)] md:rounded-full grid grid-cols-5 gap-20 z-index[2] md:box-shadow[0 25px 25px rgba(0,0,0,0.15)]">
        <div tw="items-center justify-end space-x-20 col-span-2 hidden md:flex">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#work">Work</NavLink>
        </div>
        <Link href="/" passHref>
          <a tw="col-span-5 md:col-span-1 flex justify-center items-center">
            <BareLogo />
          </a>
        </Link>
        <div tw="items-center space-x-12 col-span-2 hidden md:flex">
          <NavLink href="/#work">Resumé</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </div>
      </div>
    </m.nav>
  );
};

export const NavBar2 = () => {
  return (
    <m.div
      tw="
        fixed top-0 left-1/2 transform[translateX(-50%)]
        background-image[linear-gradient(0deg, rgba(13,13,15,.05) 0%, rgba(13,13,15,1) 80%)]
        backdrop-filter[blur(8px)]
        z-index[999999999]
        box-shadow[0 25px 25px rgba(0,0,0,0.15)]
      "
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 1}}
    >
      <div
        tw="
          flex items-center justify-center
          mx-auto max-width[1150px] padding-top[20px] md:padding-top[50px] px-6 md:px-10 pb-5 box-sizing[content-box]
        "
      >
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>

        <div tw="margin-left[50px] margin-right[60px] height[1px] flex-grow flex-shrink background-color[#FFFFFF] opacity-30 hidden md:block" />

        <div tw="hidden md:flex items-center justify-between flex-shrink-0 flex-basis[340px]">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="#work">Work</NavLink>
          {/* <NavLink href="/blog">Resume</NavLink> */}
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </div>
    </m.div>
  );
};
