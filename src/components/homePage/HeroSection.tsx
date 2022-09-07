import {motion} from 'framer-motion';
import {FaGithub, FaLinkedinIn} from 'react-icons/fa';
import tw from 'twin.macro';
import {ContactInput} from '../ContactInput';
import {AnimText, CapsPreTitle, PullUpText} from './misc';

const HeroImage = () => {
  return (
    <div tw="sticky bottom-0 height[100vh] margin-top[-100vh] z-index[0]">
      <div tw="absolute left-0 top-0 right-0 height[100vh] overflow-hidden z-index[0]">
        <div tw="background[linear-gradient(0deg, rgba(7, 12, 16, 1) 0%, rgba(7, 12, 16, 0) 19%)] absolute left-0 top-0 bottom-0 right-0 z-index[1]" />
        <div tw="relative max-width[1150px] mx-auto padding-top[280px] px-4 box-sizing[content-box]">
          <motion.img
            src="/outline.png"
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
          />
        </div>
      </div>
    </div>
  );
};

const MeetYour = () => {
  return (
    <div tw="relative max-width[1150px] mx-auto px-4 box-sizing[content-box] padding-top[min(280px, 30vh)] z-index[1]">
      <motion.h1
        tw="
            select-none
            text-white font-semibold
            margin-left[90px]
            line-height[1]
            font-size[min(3.75rem, 6vh)]
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
        tw="select-none text-white font-size[min(6.8rem, 11vh)] line-height[1] font-semibold margin-left[90px]"
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
        tw="mt-[73px] margin-left[90px] text-white opacity[0]"
        animate={{opacity: 1}}
        transition={{delay: 1.5, duration: 1}}
      >
        <div tw="margin-top[min(17vh)]" />
        {/* <ScrollDownPlease /> */}
      </motion.div>
    </div>
  );
};

const JudeHunterAnim = () => {
  const getAnimProps = (wght) => ({
    initial: {fontWeight: 100},
    animate: {fontWeight: wght},
    transition: {delay: 0.7, duration: 0.6},
  });

  return (
    <div tw="padding-left[90px] flex space-x-6">
      <h1 tw="text-6xl">
        <motion.span {...getAnimProps(100)}>j</motion.span>
        <motion.span {...getAnimProps(200)}>u</motion.span>
        <motion.span {...getAnimProps(300)}>d</motion.span>
        <motion.span {...getAnimProps(400)}>e</motion.span>
      </h1>
      <h1 tw="text-6xl">
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
        <div tw="padding-left[90px] margin-bottom[10px] flex items-center">
          <CapsPreTitle>HI, I’M</CapsPreTitle>
          <div tw="margin-left[20px] height[1px] width[220px] background-color[#FFFFFF] opacity-50" />
        </div>
        <JudeHunterAnim />

        <div
          //730px
          tw="
              max-width[700px]
              margin-left[34px] margin-top[40px]
              padding[34px 56px]
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
            I’m currently a frontend engineer at <b>Playbook Technologies inc.</b> and a software architecture
            consultant at <b>Millie Group</b>.
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

          <div tw="flex items-center space-x-[min(3vh, 20px)] margin-top[40px]">
            <ContactInput />
            <div tw="flex-grow" />
            <a href="https://github.com/judehunter" target="_blank">
              <FaGithub tw="width[min(4vh, 35px)] height[min(4vh, 35px)]" />
            </a>
            <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank">
              <FaLinkedinIn tw="width[min(4vh, 35px)] height[min(4vh, 35px)]" />
            </a>
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
