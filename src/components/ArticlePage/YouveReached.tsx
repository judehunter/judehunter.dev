import {Icon} from '@iconify/react';
import tw from 'twin.macro';
import {ContactInput} from '../ContactInput';
import Img from 'next/future/image';

export const YouveReached = () => {
  return (
    <div tw="overflow-hidden mt-[-200px] pt-[200px]">
      <div tw="max-w-[700px] mx-auto flex mb-24 box-sizing[content-box] px-4">
        <div>
          <div tw="text-[#7FEC9D] font-medium letter-spacing[0.025em] mb-3">HI, YOU’VE REACHED</div>
          <div tw="text-2xl mb-2">jude hunter</div>
          <div tw="opacity-70">
            An advocate of free-as-in-freedom software and an active social progressivist in dire need of building
            empowering solutions.
          </div>
          <div tw="text-[#7FEC9D] font-medium letter-spacing[0.025em] mt-7 mb-3">LEAVE A MESSAGE AT THE TONE</div>
          <div tw="flex md:space-x-6 md:flex-row flex-col">
            <ContactInput tw="font-size[0.9em]" />
            <div tw="text-white font-size[30px] space-x-[20px] flex items-center mt-[25px] md:mt-0">
              <a href="mailto:matisowagm@gmail.com" target="_blank" aria-label="email">
                <Icon icon="mdi:email-open" tw="mb-[-5px]" />
              </a>
              <a href="https://github.com/judehunter" target="_blank" tw="font-size[27px]" aria-label="GitHub">
                <Icon icon="akar-icons:github-fill" />
              </a>
              <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank" aria-label="LinkedIn">
                <Icon icon="akar-icons:linkedin-fill" />
              </a>
            </div>
          </div>
        </div>
        <div tw="w-[0%] md:w-[27%] flex-shrink-0 relative pointer-events-none">
          <div tw="absolute left-[-120px] md:left-[0px] top-[-135px] md:top-[-35px] bottom-0 right-[-80px]">
            <Img
              src="/outline.png"
              tw="w-auto h-auto rounded-full"
              width={270}
              height={270}
              alt="Avaatar photo of the blog post author Jude Hunter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
