import {Icon} from '@iconify/react';
import {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import {m} from 'framer-motion';
import {useRouter} from 'next/router';
import {gaEvt, phEvt} from '../../misc/a7s';

const LikeButton = () => {
  const SHOW_THRESHOLD = 20;
  const slug = useRouter().query.slug as string;
  const [likes, setLikes] = useState<null | number>(null);

  const getLikes = async () =>
    fetch('/api/getPostLikes', {
      method: 'POST',
      body: JSON.stringify({slug}),
    }).then((x) => x.json());

  useEffect(() => {
    getLikes().then(setLikes);
  }, []);

  const personalLikes = useRef(
    JSON.parse(localStorage.getItem(`likes:${slug}`) ?? '0'),
  );
  const [hits, setHits] = useState<number[]>([personalLikes.current]);

  const giveLike = async () => {
    if (personalLikes.current >= 200) {
      gaEvt({
        action: 'like_post_overkill',
        category: 'engagement',
        label: slug,
      });
      phEvt('liked post to overkill', {category: 'engagement', postSlug: slug});
      return;
    }
    fetch('/api/addPostLike', {
      method: 'POST',
      body: JSON.stringify({slug}),
    });
    gaEvt({action: 'like_post', category: 'engagement', label: slug});
    phEvt('liked post', {category: 'engagement', postSlug: slug});
    setLikes((x) => x! + 1);
    personalLikes.current += 1;
    localStorage.setItem(
      `likes:${slug}`,
      JSON.stringify(personalLikes.current),
    );
    setHits((x) => [...x, personalLikes.current]);
    setTimeout(() => setHits(([discarded, ...x]) => x), 3000);
  };

  return (
    <div
      tw="flex flex-col items-center cursor-pointer opacity-100 transition-all select-none hover:text-[#7fec9d] relative"
      css={[
        likes == null && tw`opacity-0`,
        likes! < SHOW_THRESHOLD && tw`mt-3`,
      ]}
      className="group"
      onClick={giveLike}
    >
      <div tw="absolute left-1/2 top-1/2 transform[translateX(-50%) translateY(calc(-50% - 14px))] w-[90px] h-[90px] rounded-full z-index[0] bg-[#070c10] md:hidden block" />
      <Icon
        icon="ph:hands-clapping-bold"
        width={32}
        tw="group-hover:transform[scale(1.3)] transition-transform z-index[1]"
      />
      <div
        tw="opacity-100 font-semibold z-index[1] mt-[4px] h-[24px] transition-all text-sm"
        css={likes! < SHOW_THRESHOLD && tw`opacity-0 h-0 mb-1`}
      >
        {likes}
      </div>
      {hits.map((x, i) => (
        <m.div
          key={x}
          tw="font-semibold text-[#7fec9d] absolute top-[-24px] left-1/2 z-index[1] text-sm"
          initial="before"
          animate={i === hits.length - 1 ? 'visible' : 'after'}
          transition={{opacity: {delay: 0}}}
          variants={{
            before: {
              opacity: 0.3,
              y: 5,
              x: '-50%',
            },
            visible: {
              opacity: 1,
              y: 0,
            },
            after: {
              opacity: 0,
              y: -10,
            },
          }}
        >
          +{x}
        </m.div>
      ))}
    </div>
  );
  // <div tw="rounded-full w-[15px] h-[15px]">

  // </div>
};

export const ArticleSideBar = () => {
  return (
    <>
      <div tw="absolute left-0 top[-381px] md:top-[-401px] bottom-0 right-0 h-full pointer-events-none z-index[99999]">
        {/* <div tw="w-[563px] " */}
        <div tw="sticky top[90px] md:top-[150px] pointer-events-none max-w-[700px] mx-auto flex justify-end md:justify-start">
          <div
            tw="transform[translateX(-45px)] md:transform[translateX(-100%)] inline-block md:pr-6 pointer-events-auto"
            suppressHydrationWarning
          >
            {typeof window !== 'undefined' && (
              <LikeButton key={useRouter().query.slug as any} />
            )}
          </div>
        </div>
      </div>
      {/* <div tw="absolute left-0 top-0 bottom-0 right-0 pointer-events-none z-index[99999]">
        <div tw="sticky top-[300.9px] pointer-events-none max-w-[600px] mx-auto flex justify-end md:justify-start">
          <div
            tw="md:transform[translateX(-100%) translateY(-50%)] inline-block pointer-events-auto"
            suppressHydrationWarning
          >
            <SubscribeCTA />
          </div>
        </div>
      </div> */}
    </>
  );
};
