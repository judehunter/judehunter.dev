import {Icon} from '@iconify/react';
import tw from 'twin.macro';
import {m} from 'framer-motion';
import {useEffect, useState} from 'react';
import {posthog} from 'posthog-js';

export const CookieBanner = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    setBannerOpen(
      !(posthog.has_opted_in_capturing() || posthog.has_opted_out_capturing()),
    );
  }, []);

  const accept = () => {
    setBannerOpen(false);
    posthog.capture('accepted cookies');
    posthog.opt_in_capturing();
  };

  const decline = () => {
    setBannerOpen(false);
    posthog.capture('declined cookies');
    posthog.opt_out_capturing();
  };

  return (
    <m.div
      tw="
        fixed
        left-1/2
        bottom-16
        z-[999999999]
      "
      variants={{
        hidden: {y: 'calc(100% + 64px)', x: '-50%'},
        shown: {y: 0, x: '-50%', transition: {delay: 1}},
      }}
      transition={{type: 'spring', bounce: 0.3, duration: 0.5}}
      initial={bannerOpen ? 'shown' : 'hidden'}
      animate={bannerOpen ? 'shown' : 'hidden'}
    >
      <m.div
        tw="
          backdrop-filter[blur(10px)]
          bg-[#12142d66]
          rounded-[42px]
          border border-[#ffffff33]
        "
        animate={{x: detailsOpen ? 0 : [0, 10, -10, 5, -5, 0]}}
        whileHover={{x: 0}}
        transition={{delay: 10}}
      >
        <div
          tw="
            py-4 px-4
            flex items-center
            justify-center
          "
        >
          <Icon icon="noto:cookie" tw="width[50px] height[50px]" />
          <Icon
            icon="fluent-emoji:white-question-mark"
            tw="width[40px] height[40px] ml-[-7px] transform[rotate(15deg)]"
          />
          <div
            role="button"
            title="Decline cookies"
            tw="
              transition-transform
              hover:(
                transform[scale(1.2)]
              )
            "
            onClick={decline}
          >
            <Icon
              icon="fluent-emoji:thumbs-down-medium-light"
              tw="width[40px] height[40px] ml-4"
            />
          </div>
          <div
            role="button"
            title="Accept cookies"
            tw="
              transition-transform
              hover:(
                transform[scale(1.2)]
              )
            "
            onClick={accept}
          >
            <Icon
              icon="fluent-emoji:ok-hand"
              tw="width[40px] height[40px] ml-2"
            />
          </div>
        </div>
        <m.div
          layout
          tw="text-center overflow-hidden mx-auto"
          variants={{
            hidden: {height: '0px', width: '210px', opacity: 0},
            shown: {height: 'auto', width: '258px', opacity: 1},
          }}
          animate={detailsOpen ? 'shown' : 'hidden'}
          initial="hidden"
        >
          <div tw="px-6 pb-4 pt-2 width[258px]">
            I use cookies to understand
            <br />
            how you use my website.
            <div tw="mt-2">
              <span
                tw="underline"
                role="button"
                title="Accept cookies"
                onClick={accept}
              >
                accept
              </span>{' '}
              or{' '}
              <span
                tw="underline"
                role="button"
                title="Decline cookies"
                onClick={decline}
              >
                decline
              </span>{' '}
              cookies
            </div>
          </div>
        </m.div>
      </m.div>
      <div
        tw="flex justify-center transition-opacity"
        css={[detailsOpen && tw`opacity-0 pointer-events-none`]}
        role="button"
        onClick={() => setDetailsOpen(true)}
      >
        <div tw="text-xs text-center text-[#ffffff88] underline bg-[#12142d55] py-1 px-3 rounded-b-lg backdrop-filter[blur(12px)]">
          What is this?
        </div>
      </div>
    </m.div>
  );
};
