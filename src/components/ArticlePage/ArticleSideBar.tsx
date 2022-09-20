import {Icon} from '@iconify/react';
import {useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';

const LikeButton = () => {
  const SHOW_THRESHOLD = 20;
  const slug = useRouter().query.filename;
  const [likes, setLikes] = useState<null | number>(null);

  const getLikes = async () =>
    fetch('/api/getPostLikes', {
      method: 'POST',
      body: JSON.stringify({slug}),
    }).then((x) => x.json());

  useEffect(() => {
    getLikes().then(setLikes);
  }, []);

  const personalLikes = useRef(JSON.parse(localStorage.getItem(`likes:${slug}`) ?? '0'));
  const [hits, setHits] = useState<number[]>([personalLikes.current]);

  const giveLike = async () => {
    const p = fetch('/api/addPostLike', {
      method: 'POST',
      body: JSON.stringify({slug}),
    });
    setLikes((x) => x! + 1);
    personalLikes.current += 1;
    localStorage.setItem(`likes:${slug}`, JSON.stringify(personalLikes.current));
    setHits((x) => [...x, personalLikes.current]);
    setTimeout(() => setHits(([discarded, ...x]) => x), 3000);
  };

  return (
    <div
      tw="flex flex-col items-center cursor-pointer opacity-100 transition-all select-none hover:text-[#7fec9d] relative"
      css={[likes == null && tw`opacity-0`, likes! < SHOW_THRESHOLD && tw`mt-3`]}
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
      {hits.map((x, i) =>
        x !== 0 ? (
          <motion.div
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
          </motion.div>
        ) : null,
      )}
    </div>
  );
  // <div tw="rounded-full w-[15px] h-[15px]">

  // </div>
};

export const ArticleSideBar = () => {
  return (
    <div tw="absolute left-0 top[-381px] md:top-[-401px] bottom-0 right-0 h-full pointer-events-none z-index[99999]">
      {/* <div tw="w-[563px] " */}
      <div tw="sticky top[50px] md:top-[50px] pointer-events-auto max-w-[700px] mx-auto flex justify-end md:justify-start">
        <div
          tw="transform[translateX(-45px)] md:transform[translateX(-100%)] inline-block md:pr-6"
          suppressHydrationWarning
        >
          {typeof window !== 'undefined' && <LikeButton />}
        </div>
      </div>
    </div>
  );
};
