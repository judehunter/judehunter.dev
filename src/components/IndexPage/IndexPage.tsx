import tw from 'twin.macro';
import {NavBar} from '../NavBar';
import {BlogSection} from './BlogSection';
import {WorkSection} from './WorkSection';
import {HeroSection} from './HeroSection';
import {WhatDoYouSay} from './WhatDoYouSay';
import {Footer} from '../Footer';
import {LazyMotion} from 'framer-motion';
import {CookieBanner} from '../CookieBanner';

export const IndexPage = () => {
  return (
    <LazyMotion
      features={() =>
        import('../ArticlePage/motionFeatures').then((res) => res.default)
      }
      strict
    >
      {/* // original: #0D0D0F // other candidates: // #10101c // #070c10 */}
      <div tw="background-color[#000212] text-[white]">
        <NavBar />
        {/* lookup text clip fade in slide up animation */}
        <HeroSection />
        <BlogSection />
        <WorkSection />
        <WhatDoYouSay />
        <Footer />
        {/* convinced yet? shoot me an email! */}
      </div>
      {/* <CookieBanner /> */}
    </LazyMotion>
  );
};
