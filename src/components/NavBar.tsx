import {motion} from 'framer-motion';
import Link from 'next/link';
import tw from 'twin.macro';
import {Logo} from './Logo';

const NavLink = ({href, children}) => {
  return (
    <Link passHref {...{href}}>
      <a tw="text-white">{children}</a>
    </Link>
  );
};

export const NavBar = () => {
  return (
    <motion.div
      tw="
        fixed top-0 left-0 right-0
        background-color[rgba(13,13,15,.05)]
        backdrop-filter[blur(8px)]
        z-index[999999999]

        opacity[0]
      "
      animate={{opacity: 1}}
      transition={{delay: 1}}
    >
      <div
        tw="
          flex items-center
          mx-auto max-width[1150px] padding-top[50px] px-4 pb-5 box-sizing[content-box]
        "
      >
        <Logo />

        <div tw="margin-left[50px] margin-right[60px] height[1px] flex-grow flex-shrink background-color[#FFFFFF] opacity-50" />

        <div tw="flex items-center justify-between flex-shrink-0 flex-basis[340px]">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/blog">Work</NavLink>
          <NavLink href="/blog">Resume</NavLink>
          <NavLink href="/blog">Contact</NavLink>
        </div>
      </div>
    </motion.div>
  );
};
