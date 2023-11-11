import tw from 'twin.macro';
import {OpenToWork} from '../OpenToWork';
import {GetInContactSection} from '../IndexPage/misc';
import {HeadSvg} from '../IndexPage/svgs';

export const YouveReached = () => {
  return (
    <div tw="overflow-hidden mt-[-300px] pt-[300px]">
      <div tw="max-w-[600px] mx-auto flex mb-0 box-sizing[content-box] px-4">
        <div>
          <div tw="text-gold-4 font-medium letter-spacing[0.025em] mb-3 [font-family: 'Inter var experimental']">
            HI, YOU’VE REACHED
          </div>
          <div tw="text-2xl mb-2 flex items-center text-gold-12 font-bold">
            <span tw="mr-4">jude hunter</span> <OpenToWork />
          </div>
          <div tw="opacity-70 text-gold-11 font-medium">
            Front-end engineer, advocate of free-as-in-freedom software and an
            active social progressivist
          </div>
          <div tw="text-gold-4 font-medium letter-spacing[0.025em] mt-7 mb-3 [font-family: 'Inter var experimental']">
            LEAVE A MESSAGE AT THE TONE
          </div>
          <div tw="">
            {/* <ContactInput tw="font-size[0.9em]" /> */}
            <GetInContactSection />
          </div>
        </div>
        <div tw="hidden md:block ml-8">
          <HeadSvg />
        </div>
      </div>
    </div>
  );
};
