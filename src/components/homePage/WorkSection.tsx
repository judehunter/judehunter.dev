import {DatePeriod, ScrollInterpolationWorkTech} from './misc';
import {IntersoLogo, MillieLogo, PlaybookLogo, ZwierciadlaLogo} from './work/logos';
import tw from 'twin.macro';
import {ReactNode} from 'react';
import {icons} from './work/icons';
import {Icon} from '@iconify/react';
import {Tooltip} from '../Tooltip';

type WorkItem = {
  company: string;
  logo: ReactNode;
  positions: {
    title: string;
    period: {
      start: Date;
      end: Date | null;
    };
    description: string;
  }[];
  tech: {icon: string; name: string; dark?: boolean; style?: any}[];
};

const workItems: WorkItem[] = [
  {
    company: 'Playbook',
    logo: <PlaybookLogo />,
    positions: [
      {
        title: 'frontend developer',
        period: {
          start: new Date('May 1 2021'),
          end: new Date('Aug 1 2022'),
        },
        description:
          'I developed multiple various web applications for internal use, as well as end-user facing applications for hundreds of thousands of Playbook’s customers.',
      },
    ],
    tech: [
      icons.typescript,
      icons.react,
      icons.nextjs,
      icons.javascript,
      icons.nodejs,
      icons.storybook,
      icons.tailwind,
      icons.swr,
      // icons.eslint,
      icons.parcel,
      icons.vite,
      icons.netlify,
      icons.graphql,
      icons.mailchimp,
    ],
  },
  {
    company: 'MillieGroup',
    logo: <MillieLogo width={120} />,
    positions: [
      {
        title: 'fullstack architecture consultant',
        period: {
          start: new Date('May 1 2021'),
          end: null,
        },
        description:
          'With my position at Playbook, Millie can still count on me with fullstack consultation thanks to the relationship we’ve built.',
      },
      {
        title: 'fullstack developer',
        period: {
          start: new Date('Sep 1 2020'),
          end: new Date('May 1 2021'),
        },
        description:
          'I developed Millie’s entire pivotal student portal with scalability in mind to allow for thousands of concurrent invocations.',
      },
    ],
    tech: [
      icons.typescript,
      icons.react,
      icons.prisma,
      icons.javascript,
      icons.nodejs,
      icons.aws,
      icons.lambda,
      icons.tailwind,
      icons.vite,
      icons.koa,
      icons.typeorm,
    ],
  },
  {
    company: 'Interso',
    logo: <IntersoLogo />,
    positions: [
      {
        title: 'e-commerce fullstack developer',
        period: {
          start: new Date('Feb 1 2020'),
          end: new Date('Jun 1 2020'),
        },
        description:
          'I designed, built from the ground up, and deployed an e-commerce website for a local family business who was in need of help during the COVID-19 crisis.',
      },
    ],
    tech: [
      icons.vue,
      icons.prisma,
      icons.strapi,
      icons.typescript,
      icons.javascript,
      icons.nodejs,
      icons.graphql,
      icons.digitalocean,
      icons.nuxtjs,
      icons.sass,
    ],
  },
  {
    company: 'Zwierciadła',
    logo: <ZwierciadlaLogo />,
    positions: [
      {
        title: 'IT&Photo team leader',
        period: {
          start: new Date('Sep 1 2018'),
          end: new Date('Sep 1 2019'),
        },
        description:
          'I’ve led the IT&Photo team during the 16th edition of Zwierciadła - the largest and most recognizable nation-wide theatre event for the youth. We’ve successfully revived the event’s social media & website and dealt with multiple partners and sponsors. That edition was a great success and attracted 1000+ spectators at just one venue.',
      },
    ],
    tech: [icons.wordpress, icons.python, icons.photoshop, icons.lightroom, icons.indesign, icons.affinitydesigner],
  },
];

const WorkSectionItemTech = ({tech}: {tech: WorkItem['tech']}) => {
  const BIG_SIZE = 60;
  const SMALL_SIZE = 40;
  return (
    <div tw="padding[30px] padding-left[37px] margin-top[0px] margin-left[-7px] bg-[#090F14] height[100%] rounded-r-[7px] flex flex-col justify-center">
      <div tw="flex space-x-4">
        {tech.slice(0, 3).map((x) => (
          <Tooltip
            key={x.icon}
            target={
              <Icon
                icon={x.icon}
                height={BIG_SIZE}
                width={BIG_SIZE}
                css={[x.dark && tw`bg-[#edf0f1] border-radius[100%] padding[5px]`, x.style]}
              />
            }
            side="top"
          >
            <span tw="whitespace-nowrap">{x.name}</span>
          </Tooltip>
        ))}
      </div>
      <div tw="flex flex-wrap margin[-8px] margin-top[16px] [& > *]:(margin[8px])">
        {tech.slice(3).map((x) => (
          <Tooltip
            key={x.icon}
            target={
              <Icon
                icon={x.icon}
                height={SMALL_SIZE}
                width={SMALL_SIZE}
                css={[x.dark && tw`bg-[#edf0f1] border-radius[100%] padding[3px]`, x.style]}
              />
            }
            side="top"
          >
            <span tw="whitespace-nowrap">{x.name}</span>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const WorkSectionItem = ({item}: {item: WorkItem}) => {
  return (
    <div tw="flex items-stretch md:(flex-row) flex-col">
      {/* <ScrollInterpolationPullUp length={0} tw="z-index[1] flex items-stretch [& > *]:(flex items-stretch)"> */}
      <div tw="w-full md:width[60%] background-color[#0E151C] border-radius[7px] padding[30px 35px 20px] z-index[1] flex-shrink-0">
        <div tw="margin-bottom[28px]">{item.logo}</div>
        {item.positions
          .map((x, i) => (
            <div key={i}>
              <h1 tw="text-2xl font-semibold margin-bottom[10px]">{x.title}</h1>
              <p tw="line-height[1.7]">
                <DatePeriod start={x.period.start} end={x.period.end} />
                {x.description}
              </p>
            </div>
          ))
          .reduce(
            (prev, curr, idx) =>
              [
                prev,
                <div
                  tw="width[80px] height[1px] bg-white margin[25px 0]"
                  key={`sep${idx}`}
                /> /*<div tw="width[100%] height[2px] bg-[#070C10] margin[25px 0]" key={`sep${idx}`} />*/,
                curr,
              ] as any,
          )}
        {/* <h1>
          {item}
        </h1> */}
      </div>
      {/* </ScrollInterpolationPullUp> */}
      <ScrollInterpolationWorkTech length={450} tw="flex-grow flex align-self[stretch] z-index[0] [& > *]:flex-grow">
        <div tw="md:block h-full hidden">
          <WorkSectionItemTech tech={item.tech} />
        </div>
      </ScrollInterpolationWorkTech>
    </div>
  );
};

export const WorkSection = () => {
  return (
    <div tw="text-white mt-[-80px] pt-[80px]" id="work">
      <div tw="relative max-width[1200px] mx-auto px-12 box-sizing[content-box] padding-top[100px]">
        <div tw="flex items-start">
          <div tw="sticky top-[150px] height[200px] width[60px] flex-shrink-0 hidden md:block">
            <h1 tw="transform[translateX(-85px) translateY(80px) rotate(-90deg)] text-4xl font-semibold absolute left-0 top-0">
              experience
            </h1>
          </div>
          <div tw="flex-grow space-y-[40px]">
            {workItems.map((x, i) => (
              <WorkSectionItem item={x} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
