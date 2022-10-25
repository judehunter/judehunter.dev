import Link from 'next/link';
import Img from 'next/image';
import tw from 'twin.macro';
import {Icon} from '@iconify/react';
import {useEffect, useState} from 'react';

export const ArticleCard = ({
  title,
  image,
  tags,
  url,
  imageBlur,
  slug,
  ...rest
}: {
  title: string;
  tags: string[];
  image: string;
  imageBlur: string;
  url: string;
  slug: string;
}) => {
  const [likes, setLikes] = useState<number | null>(null);

  const getLikes = async () =>
    fetch('/api/getPostLikes', {
      method: 'POST',
      body: JSON.stringify({slug}),
    }).then((x) => x.json());

  useEffect(() => {
    getLikes().then(setLikes);
  }, []);

  return (
    <Link passHref href={url}>
      <a
        tw="flex flex-col cursor-pointer"
        {...rest}
        className={`${(rest as any).className ?? ''} group`}
      >
        <div tw="flex items-end flex-grow">
          <div tw="">
            <h1
              tw="
                font-semibold text-xl
                font-variation-settings['slnt' 0]
                group-hover:(
                  font-variation-settings['slnt' -10]
                  text-[#7FEC9D]
                )
                transition-all
                transition-duration[200ms]
              "
            >
              {title}
            </h1>
            <h2 tw="mt-[10px] opacity-50 text-sm">
              {tags
                .slice(0, 3)
                .map((x) => `#${x}`)
                .join(' ')}
            </h2>
          </div>
        </div>
        <div tw="mt-[15px] relative">
          {/* <div
            tw="bg-center bg-cover w-full aspect-ratio[3 / 4] rounded-[8px]"
            style={{backgroundImage: `url('${image}')`}}
          /> */}
          {likes !== null ? (
            <div tw="absolute left-3 top-3 z-index[1] backdrop-filter[blur(3px)] bg-green-900 bg-opacity-50 px-4 py-3 rounded-lg flex space-x-2 items-center">
              <Icon
                icon="ph:hands-clapping-bold"
                tw="font-size[1.5rem] ml-[-2px]"
              />
              <span>{likes}</span>
            </div>
          ) : null}
          <div
            tw="relative w-full aspect-ratio[3 / 4] rounded-[8px]"
            className="thumbnail"
          >
            <Img
              src={image}
              alt={title}
              layout="fill"
              tw="transition-all rounded-[8px] object-fit[cover]"
              placeholder="blur"
              blurDataURL={imageBlur}
              priority
            />
          </div>
          <div
            tw="
              absolute left-0 top-0 right-0 bottom-0
              border-[3px] border-color[#7FEC9D] rounded-[14px]
              opacity-0
              transition-all
              group-hover:(
                opacity-100
                left-[-6px]
                top-[-6px]
                right-[-6px]
                bottom-[-6px]
              )
            "
          ></div>
        </div>
      </a>
    </Link>
  );
};
