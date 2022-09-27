import {Icon} from '@iconify/react';
import {motion} from 'framer-motion';
import tw from 'twin.macro';
import {ContactInput} from '../ContactInput';
import {AnimText, CapsPreTitle, PullUpText} from './misc';
import Img from 'next/future/image';

const HeroImage = () => {
  return (
    <div tw="hidden md:block sticky bottom-0 height[100vh] margin-top[-100vh] z-index[0] opacity-80">
      <div tw="absolute left-0 top-0 right-0 height[100vh] overflow-hidden z-index[0]">
        <div tw="background[linear-gradient(0deg, rgba(7, 12, 16, 1) 0%, rgba(7, 12, 16, 0) 19%)] absolute left-0 top-0 bottom-0 right-0 z-index[1]" />
        <div tw="relative max-width[1150px] mx-auto padding-top[280px] px-4 box-sizing[content-box]">
          <motion.div
            tw="
              absolute
              left[500px] top[100px] width[min(100vh - 100px, 980px)]
              after:(
                absolute
                left-0 top-0 bottom-0 right-0 z-index[1]
                background[linear-gradient(0deg, rgba(13,13,15,1) 0%, rgba(13,13,15,0) 19%)]
              )
            "
            // width={980}
            initial={{y: 50, opacity: 0.001}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.6, duration: 0.6, ease: 'easeOut'}}
          >
            <Img priority src="/outline.png" alt="Avatar photo of Jude Hunter" tw="w-full" width={980} height={980} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const MeetYour = () => {
  return (
    <div tw="relative max-width[1150px] mx-auto px-8 box-sizing[content-box] padding-top[min(280px, 30vh)] z-index[1]">
      <motion.h1
        tw="
          select-none
          text-white font-semibold
          ml-[0] pr-12
          md:margin-left[90px]
          line-height[1]
          font-size[1.5rem] md:font-size[min(3.75rem, 6vh)]
          // [@media (min-height: 700px)]:(
          //   text-6xl
          // )
        "
        // initial={{y: 20, opacity: 0}}
        // animate={{y: 0, opacity: 1}}
        // transition={{delay: 0.2, ease: 'easeInOut'}}
      >
        <PullUpText delay={0}>Meet</PullUpText> <PullUpText delay={0.06}>your</PullUpText>{' '}
        <PullUpText delay={0.12}>next</PullUpText>{' '}
      </motion.h1>
      <motion.h1
        tw="select-none text-white font-size[3rem] md:font-size[min(6.8rem, 11vh)] line-height[1] font-semibold ml-[0] pr-12
        md:margin-left[90px]"
        // initial={{y: 30, opacity: 0}}
        // animate={{y: 0, opacity: 1}}
        // transition={{delay: 0.4, ease: 'easeOut'}}
      >
        {/* <span tw="color[#7FEC9D] margin-left[-4px] font-bold">perfect</span> */}
        <PullUpText delay={0.3}>
          <AnimText
            tw="font-bold margin-left[-3px]"
            text="perfect"
            overlayStyle={tw`background-image[linear-gradient(30deg, #10c8ff 0%, #7FEC9D 70%)]`}
            delay={1}
          />
        </PullUpText>{' '}
        <PullUpText delay={0.4}>
          <AnimText
            tw="font-bold"
            text="fit"
            overlayStyle={tw`background-image[linear-gradient(30deg, #FF4D4D 0%, #F9CB28 70%)]`}
            delay={3.5}
          />
          .
        </PullUpText>
      </motion.h1>
      <motion.div
        tw="mt-[73px] md:margin-left[90px] text-white opacity[0]"
        animate={{opacity: 1}}
        transition={{delay: 1.5, duration: 1}}
      >
        <div tw="md:margin-top[min(17vh)]" />
        {/* <ScrollDownPlease /> */}
      </motion.div>
    </div>
  );
};

const JudeHunterAnim = () => {
  const getAnimProps = (wght) => ({
    initial: {fontWeight: 100},
    animate: {fontWeight: wght},
    transition: {delay: 0.9, duration: 0.4},
  });

  return (
    <div tw="padding-left[1rem] md:padding-left[90px] flex space-x-2 md:space-x-6">
      <h1 tw="text-4xl md:text-6xl">
        <motion.span {...getAnimProps(100)}>j</motion.span>
        <motion.span {...getAnimProps(200)}>u</motion.span>
        <motion.span {...getAnimProps(300)}>d</motion.span>
        <motion.span {...getAnimProps(400)}>e</motion.span>
      </h1>
      <h1 tw="text-4xl md:text-6xl">
        <motion.span {...getAnimProps(450)}>h</motion.span>
        <motion.span {...getAnimProps(500)}>u</motion.span>
        <motion.span {...getAnimProps(600)}>n</motion.span>
        <motion.span {...getAnimProps(700)}>t</motion.span>
        <motion.span {...getAnimProps(800)}>e</motion.span>
        <motion.span {...getAnimProps(900)}>r</motion.span>
      </h1>
    </div>
  );
};

const AboutMe = () => {
  return (
    <motion.div
      tw="z-index[1] relative padding-bottom[50px]"
      initial={{y: 50, opacity: 0.001}}
      animate={{y: 0, opacity: 1}}
      transition={{ease: 'easeOut', duration: 0.7, delay: 0.9, opacity: {times: [null, 0.7]}}}
    >
      <div tw="relative max-width[1150px] mx-auto px-4 box-sizing[content-box] z-index[1] text-white">
        <div tw="padding-left[1rem] md:padding-left[90px] margin-bottom[10px] flex items-center">
          <CapsPreTitle>HI, I’M</CapsPreTitle>
          <div tw="margin-left[20px] height[1px] width[220px] background-color[#FFFFFF] opacity-50" />
        </div>
        <JudeHunterAnim />

        <div
          //730px
          tw="
              max-width[700px]
              margin-left[-16px] margin-right[-16px]
              md:margin-left[34px]
              md:margin-right[0]
              margin-top[40px]
              padding[20px 24px]
              md:padding[34px 56px]
              background-color[#0E151C]
              border-radius[7px]
              text-xl
              line-height[1.8]
              font-normal
              letter-spacing[0.015em]
              [& b, & i]:(
                font-extralight
              )
              [& p + p]:(
                margin-top[1.5em]
              )
              [& em]:(
                color[#7FEC9D]
                not-italic
              )
              // [& i]:(
              //   color[#7FEC9D]
              //   not-italic
              // )
            "
        >
          <p>
            I'm looking for new professional relationships.
            <br /> Currently a Fullstack Engineer at <b>Millie Group</b> and Ex&nbsp;Frontend Engineer at{' '}
            <b>Playbook Technologies</b>.
          </p>
          <p>
            Pursuing a <b>Computer Science BSc</b> degree at <b>LNU, Sweden</b>.
          </p>
          <p>
            An advocate of free-as-in-freedom software and an active social progressivist in dire need of building
            empowering solutions.
          </p>
          <p>
            Working with <i>ones and zeros</i> since the age of 10, I’m looking for that <em>perfect fit</em> and a
            long-term relationship.
          </p>

          <div tw="flex md:flex-row flex-col items-center space-x-[min(3vh, 20px)] margin-top[40px] font-size[1rem]">
            <ContactInput />
            <div tw="md:flex-grow" />
            {/* <div tw="flex space-x-[min(3vh, 20px)] mt-[45px] md:mt-0">
              <a href="https://github.com/judehunter" target="_blank">
                <FaGithub tw="width[min(4vh, 35px)] height[min(4vh, 35px)]" />
              </a>
              <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank">
                <FaLinkedinIn tw="width[min(4vh, 35px)] height[min(4vh, 35px)]" />
              </a>
            </div> */}
            <div tw="text-white font-size[30px] space-x-[20px] flex items-center mt-[35px] mb-[15px] md:mb-0 md:mt-0">
              <a href="mailto:matisowagm@gmail.com" target="_blank">
                <Icon icon="mdi:email-open" tw="mb-[-5px]" />
              </a>
              <a href="https://github.com/judehunter" target="_blank" tw="font-size[27px]">
                <Icon icon="akar-icons:github-fill" />
              </a>
              <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank">
                <Icon icon="akar-icons:linkedin-fill" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  return (
    <div tw="relative">
      <MeetYour />
      <AboutMe />
      <HeroImage />
    </div>
  );
};
