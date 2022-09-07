import {motion} from 'framer-motion';
import {ReactNode} from 'react';
import {FaArrowRight} from 'react-icons/fa';
import tw from 'twin.macro';
import {ScrollInterpolationPullUp} from './misc';

const BlogEntryCard = ({title, tags}: {title: string; tags?: string[]}) => {
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

const BlogEntries = () => {
  const entries = [
    {
      title: 'The only API stack (and workflow) you should be using. 1',
    },
    {
      title: 'The only API stack (and workflow) you should be using. 2',
    },
    {
      title: 'The only API stack (and workflow) you should be using. 3',
    },
    {
      title: 'The only API stack (and workflow) you should be using. 4',
    },
  ];
  return (
    <div tw="flex space-x-[40px] height[400px] padding-right[20px] margin-top[-58px] overflow-hidden">
      {/* left column */}
      <div tw="space-y-[28px] margin-top[58px]">
        {[entries[0], entries[2]].map((x, i) => (
          <BlogEntryCard key={i} {...x} />
        ))}
      </div>
      {/* right column */}
      <div tw="space-y-[28px]">
        {[entries[1], entries[3]].slice(0, 2).map((x, i) => (
          <BlogEntryCard key={i} {...x} />
        ))}
        <div tw="flex justify-end text-white items-center space-x-4 text-lg">
          <span>See more</span>
          <FaArrowRight />
        </div>
      </div>
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
    <div tw="max-width[1250px] mx-auto px-4 box-sizing[content-box] padding-top[10px] z-index[10] relative">
      <div tw="flex">
        <SectionTitle tw="width[340px] flex-shrink-0" variant="line-dedent">
          latest
          <br />
          entries
        </SectionTitle>
        {/* <div tw="width[105px]" /> */}
        <BlogEntries />
      </div>
    </div>
  );
};
