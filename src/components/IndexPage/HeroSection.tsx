import tw from 'twin.macro';
import {GetInContactSection, useIntersectNav} from './misc';
import {HeadSvg, MillieLogo, PlaybookLogo, SnapletLogo} from './svgs';

const BrOrSpace = () => {
  return (
    <br tw="[content: ''] after:([content: ' ']) md:([content: normal])" />
  );
};

export const HeroSection = () => {
  const ref = useIntersectNav('about');
  return (
    <div tw="max-w-[840px] mt-5 flex mx-auto flex-col md:(flex-row)" ref={ref}>
      <div tw="flex items-start pr-11 shrink-0 pb-4 md:(pb-0 justify-end [flex-basis: 282px])">
        <HeadSvg />
      </div>
      <div tw="max-w-[555px] [line-height: 1.23] md:shrink">
        <h1>
          <span tw="[font-size: 40px] text-gold-12 font-medium">
            meet your next
          </span>
          <br />
          <span tw="[font-size: 40px] text-yellow-11 font-bold">
            perfect fit
          </span>
        </h1>
        <h2 tw="mt-8 font-medium text-gold-11">trusted by</h2>
        <div tw="flex items-center mt-5">
          <SnapletLogo tw="-mb-1" />
          <MillieLogo tw="ml-7" />
          <PlaybookLogo tw="ml-7" />
        </div>
        <div tw="text-gold-11 font-medium [line-height: 1.37] [& > p + p]:(mt-4) mt-11">
          <p>
            jude is a front-end developer with a passion for
            <BrOrSpace />
            the arcana of software
          </p>
          <p>
            since the age of 10, they’ve been exploring
            <BrOrSpace /> advanced topics, such as compilers, programming
            languages, type systems
            <BrOrSpace />— sharing gained knowledge with the community
          </p>
          <p>
            all while honing their UI/UX, motion, and design skills to deliver
            <BrOrSpace />
            obvious and seamless visual experiences
          </p>
        </div>
        <div tw="h-7" />
        <GetInContactSection />
      </div>
    </div>
  );
};
