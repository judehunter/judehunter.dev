import tw from 'twin.macro';

import {WorkSection} from './WorkSection';
import {HeroSection} from './HeroSection';
import {ArticlesSection} from './ArticlesSection';
import {NewsletterSection} from './NewsletterSection';
import {Nav} from './Nav';
import {
  GetInContactSection,
  IdOffset,
  NavContext,
  useNavContextValue,
} from './misc';
import {JudeHunterHeader} from '../JudeHunterHeader';
import {LazyMotion} from 'framer-motion';
import {CookieBanner} from '../CookieBanner';
import {Footer} from '../Footer';

const FeaturedInSection = () => {
  return (
    <div tw="flex justify-center mt-16">
      <div
        tw="
          grow
          border border-gold-10
          px-3 py-2 pr-2
          font-medium
          rounded-full
          flex items-center gap-x-3
          [font-size: 12px]
          md:(grow-0 [font-size: 14px])
          justify-between
        "
      >
        <div>
          <span tw="text-gold-11">Featured in This Week In React</span>

          <span tw="text-gold-8 hidden md:inline">
            &nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;Sebastien Lorber, Meta
          </span>
          <span tw="text-gold-8 inline md:hidden">
            &nbsp;—&nbsp;S. Lorber, Meta
          </span>
        </div>
        <img
          src="/imgs/sebastien-lorber.webp"
          width={24}
          height={24}
          tw="rounded-full"
        />
      </div>
    </div>
  );
};

export const IndexPage = () => {
  const navContextValue = useNavContextValue();
  return (
    <LazyMotion
      features={() =>
        import('../../misc/motionFeatures').then((res) => res.default)
      }
      strict
    >
      <div tw="bg-gold-1 min-h-screen text-pink-500 font-black pb-20 px-4">
        <IdOffset id="about" />
        <NavContext.Provider value={navContextValue}>
          <JudeHunterHeader />
          <FeaturedInSection />
          <HeroSection />
          <Nav />
          <WorkSection />
          <ArticlesSection />
          <NewsletterSection />
          <div tw="flex justify-center mt-16">
            <GetInContactSection />
          </div>
          <Footer />
        </NavContext.Provider>
      </div>
      <CookieBanner />
    </LazyMotion>
  );
};
