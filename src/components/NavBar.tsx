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
        background-image[linear-gradient(0deg, rgba(13,13,15,.05) 0%, rgba(13,13,15,1) 80%)]
        backdrop-filter[blur(8px)]
        z-index[999999999]
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
          <NavLink href="#blog">Blog</NavLink>
          <NavLink href="#work">Work</NavLink>
          {/* <NavLink href="/blog">Resume</NavLink> */}
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </div>
    </motion.div>
  );
};
