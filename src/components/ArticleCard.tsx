import Link from 'next/link';
import Img from 'next/image';

export const ArticleCard = ({
  title,
  image,
  tags,
  url,
  imageBlur,
  ...rest
}: {
  title: string;
  tags: string[];
  image: string;
  imageBlur: string;
  url: string;
}) => {
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
          {/* <img tw="rounded-[8px] w-full" src={image} /> */}
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
