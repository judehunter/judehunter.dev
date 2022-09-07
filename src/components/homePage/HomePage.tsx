import tw from 'twin.macro';
import {NavBar} from '../NavBar';
import {BlogSection} from './BlogSection';
import {WorkSection} from './WorkSection';
import {HeroSection} from './HeroSection';

export const HomePage = () => {
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
