import tw from 'twin.macro';
import {Button} from '../components/Button';
import {NavBar} from '../components/NavBar';
import {FaGithub, FaLinkedinIn} from 'react-icons/fa';
import {ScrollDownPlease} from '../components/ScrollDownPlease';
import {motion} from 'framer-motion';

const AnimText = ({text, overlayStyle, delay, ...rest}) => {
  return (
    <motion.span
      tw="relative before:(inline absolute z-index[0] opacity[var(--opacity)])"
      css={{
        '&:before': {
          content: `"${text}"`,
        },
      }}
      animate={{'--opacity': [1, 0, 0, 1]} as any}
      transition={{
        duration: 3,
        times: [0, 0.4, 0.6, 1],
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
      {...rest}
    >
      <motion.span
        tw="bg-clip-text -webkit-text-fill-color[transparent] relative z-index[1]"
        css={overlayStyle}
        animate={{opacity: [0, 1, 1, 0]} as any}
        transition={{
          duration: 3,
          times: [0, 0.2, 0.8, 1],
          delay,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

const HeroSection = () => {
  return (
    <div tw="relative min-height[100vh]">
      <div tw="relative max-width[1150px] mx-auto px-4 box-sizing[content-box] padding-top[280px] z-index[1]">
        <motion.h1
          tw="text-white text-6xl font-semibold margin-left[90px]"
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.2, ease: 'easeInOut'}}
        >
          Meet your next
        </motion.h1>
        <motion.h1
          tw="text-white font-size[6.8rem] line-height[1] font-semibold margin-left[90px]"
          initial={{y: 30, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.4, ease: 'easeOut'}}
        >
          {/* <span tw="color[#7FEC9D] margin-left[-4px] font-bold">perfect</span> */}
          <AnimText
            tw="font-bold margin-left[-3px]"
            text="perfect"
            overlayStyle={tw`background-image[linear-gradient(30deg, #10c8ff 0%, #7FEC9D 70%)]`}
            delay={1}
          />{' '}
          <AnimText
            tw="font-bold"
            text="fit"
            overlayStyle={tw`background-image[linear-gradient(30deg, #FF4D4D 0%, #F9CB28 70%)]`}
            delay={3.5}
          />
          .
        </motion.h1>
        <motion.div
          tw="mt-[73px] margin-left[90px] text-white opacity[0]"
          animate={{opacity: 1}}
          transition={{delay: 1.5, duration: 1}}
        >
          <div tw="flex space-x-6">
            <a href="https://github.com/judehunter" target="_blank">
              <FaGithub tw="width[35px] height[35px]" />
            </a>
            <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank">
              <FaLinkedinIn tw="width[35px] height[35px]" />
            </a>
          </div>
          <Button tw="margin-top[24px]" onClick={() => {}}>
            Get in contact
          </Button>

          <div tw="margin-top[69px]" />
          <ScrollDownPlease />
        </motion.div>
      </div>

      <div tw="absolute left-0 top-0 bottom-0 right-0 overflow-hidden z-index[0]">
        <div tw="background[linear-gradient(0deg, rgba(13,13,15,1) 0%, rgba(13,13,15,0) 19%)] absolute left-0 top-0 bottom-0 right-0 z-index[1]" />
        <div tw="relative max-width[1150px] mx-auto padding-top[280px] px-4 box-sizing[content-box]">
          <motion.img
            src="/outline.png"
            tw="absolute left[500px] top[100px]"
            width={980}
            initial={{y: 50, opacity: 0.01}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.6, duration: 0.6, ease: 'easeOut'}}
          />
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  return (
    <div>
      <div tw="relative max-width[1150px] mx-auto px-4 box-sizing[content-box] padding-top[50px]">
        <h1 tw="text-white text-3xl font-semibold margin-left[90px]">
          recent work and
          <br />
          achievements
        </h1>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div tw="background-color[#0D0D0F]">
      <NavBar />
      <HeroSection />
      <WorkSection />
    </div>
  );
};

export default HomePage;
