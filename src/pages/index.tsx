import tw from 'twin.macro';
import {NavBar} from '../components/NavBar';
import {motion, useViewportScroll} from 'framer-motion';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {FaArrowRight, FaGithub, FaLinkedinIn} from 'react-icons/fa';
import {ContactInput} from '../components/ContactInput';

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

const PullUpText = ({delay, children}) => {
  return (
    <motion.span
      tw="inline-block"
      initial={{y: '0.4em', opacity: 0.01}}
      animate={{y: '0em', opacity: 1}}
      transition={{
        y: {
          duration: 0.3,
          delay: delay + 0.2,
          ease: 'easeOut',
        },
        opacity: {duration: 0.25, delay: delay + 0.2},
      }}
    >
      {children}
    </motion.span>
  );
};

const ScrollPullUp = ({children, length, speed = 1}) => {
  const {scrollY} = useViewportScroll();
  const ref = useRef<HTMLDivElement>(null!);
  const [translate, setTranslate] = useState(0);

  const ease = (t) => t * (2 - t);

  useEffect(() => {
    const listener = () => {
      if (!ref.current) return;
      const elemPos = ref.current.getBoundingClientRect().top + document.documentElement.scrollTop;
      const topScrollBottomEdge = document.documentElement.scrollTop + globalThis.window.innerHeight;

      const eased =
        (ease(1 - Math.min(length, Math.max(0, (elemPos - topScrollBottomEdge) * speed + length)) / length) - 1) *
        -length;
      setTranslate(eased);
    };
    document.addEventListener('scroll', listener, {passive: true});
    return () => document.removeEventListener('scroll', listener);
  }, []);

  return (
    <div {...{ref}}>
      <div style={{transform: `translateY(${translate}px)`}}>{children}</div>
    </div>
  );
};

const CapsPreTitle = ({children}) => {
  return <div tw="color[#7FEC9D] font-bold tracking-wide">{children}</div>;
};

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
            initial={{y: 50, opacity: 0.01}}
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
        <div tw="padding-left[90px] flex space-x-6">
          <h1 tw="text-6xl font-normal">
            <span tw="font-thin">j</span>
            <span tw="font-extralight">u</span>
            <span tw="font-light">d</span>
            <span tw="font-normal">e</span>
          </h1>
          <h1 tw="text-6xl font-extrabold">
            <span tw="font-normal">h</span>
            <span tw="font-medium">u</span>
            <span tw="font-semibold">n</span>
            <span tw="font-bold">t</span>
            <span tw="font-extrabold">e</span>
            <span tw="font-black">r</span>
          </h1>
        </div>

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
            "
        >
          <p>
            I’m currently a frontend engineer at <b>Playbook Technologies inc.</b> and a software architecture
            consultant at <b>Millie Group</b>.
          </p>
          <p>
            Pursuing a <b>Computer Science BSc</b> degree at <b>LNU</b>.
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

const HeroSection = () => {
  return (
    <div tw="relative">
      <MeetYour />
      <AboutMe />
      <HeroImage />
    </div>
  );
};

const BlogEntryCard = ({title, tags}: {title: string; tags?: string[]}) => {
  return (
    <ScrollPullUp length={250}>
      <div
        tw="
        border-radius[7px] background-color[#0E151C] text-white width[414px] padding[27px 34px]
        cursor-pointer
        transition-shadow
        transition-duration[.3s]
        hover:(
          box-shadow[8px 8px 0 #7FEC9D]
        )
      "
      >
        <h1 tw="text-xl font-semibold margin-bottom[10px]">{title}</h1>
        <div tw="font-light">#javascript</div>
      </div>
    </ScrollPullUp>
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

const BlogSection = () => {
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

const WorkSection = () => {
  return (
    <div>
      <div tw="relative max-width[1150px] mx-auto px-4 box-sizing[content-box] padding-top[50px]">test</div>
    </div>
  );
};

const HomePage = () => {
  return (
    // original: #0D0D0F
    // other candidates:
    // #10101c
    // #070c10
    <div tw="background-color[#070c10]">
      <NavBar />
      <HeroSection />
      <BlogSection />
      <WorkSection />
    </div>
  );
};

export default HomePage;
