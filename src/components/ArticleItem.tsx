import {Icon} from '@iconify/react';
import Link from 'next/link';
import Img from 'next/image';
import {useState, useEffect} from 'react';
import tw from 'twin.macro';

export const ArticleItem = ({title, image, tags, url, imageBlur, slug}) => {
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
        tw="flex flex-col md:(flex-row h-[130px]) cursor-pointer "
        className="group"
      >
        <div tw="h-[100px] md:(h-auto w-[320px] pl-28) flex">
          <div tw="relative grow rounded-[16px]">
            <Img
              src={image}
              alt={title}
              layout="fill"
              tw="
                transition-all rounded-[8px] [object-fit: cover]
              "
              placeholder="blur"
              blurDataURL={imageBlur}
              priority
            />
          </div>
        </div>
        <div tw="pt-5 md:(pt-0 pl-5)">
          <h1 tw="font-medium text-gold-12 max-w-[350px]">{title}</h1>
          <h2 tw="[& > * + *]:(ml-2) font-medium text-gold-11 mt-3.5">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i}>#{tag}</span>
            ))}
          </h2>
          {likes ? (
            <div tw="flex items-center font-medium text-yellow-9 mt-4 gap-x-3">
              <Icon icon="ph:hands-clapping-fill" width={25} height={25} />
              <div>{likes}</div>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
