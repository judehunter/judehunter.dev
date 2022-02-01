import tw from 'twin.macro';
import {Button} from '../components/Button';
import {NavBar} from '../components/NavBar';
import {FaGithub, FaLinkedinIn} from 'react-icons/fa';
import {ScrollDownPlease} from '../components/ScrollDownPlease';

const HeroSection = () => {
  return (
    <div tw="relative min-height[100vh]">
      <div tw="relative max-width[950px] mx-auto px-4 box-sizing[content-box] padding-top[280px] z-index[1]">
        <h1 tw="text-white text-6xl font-semibold margin-left[90px]">Meet your next</h1>
        <h1 tw="text-white font-size[6.8rem] line-height[1] font-semibold margin-left[90px]">
          <span tw="color[#7FEC9D] margin-left[-4px] font-bold">perfect</span> fit.
        </h1>
        <div tw="mt-[73px] margin-left[90px] text-white">
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
        </div>
      </div>

      <div tw="absolute left-0 top-0 bottom-0 right-0 overflow-hidden z-index[0]">
        <div tw="relative max-width[950px] mx-auto padding-top[280px] px-4 box-sizing[content-box]">
          <img src="/outline.png" tw="absolute left[500px] top[100px]" />
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div tw="background-color[#0D0D0F] h-full">
      <NavBar />
      <HeroSection />
      test
    </div>
  );
};

export default HomePage;
