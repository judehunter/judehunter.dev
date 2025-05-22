import {Icon} from '@iconify/react';
import {icons} from './icons';
import {IdOffset, SectionHeader, useIntersectNav} from './misc';
import {
  HunchLogo,
  MillieLogo,
  PlaybookLogo,
  SnapletLogo,
  ZwierciadlaLogo,
} from './svgs';
import {ReactNode} from 'react';

const WorkDescription = ({from, to, children, ...rest}) => {
  return (
    <p tw="md:max-w-[382px] " {...rest}>
      <span tw="font-medium text-gold-12 [font-size: 14px]">
        {from}
        {to ? ' · ' + to : ''}
      </span>
      &nbsp;&nbsp;&nbsp;
      <span tw="text-gold-11 font-medium">{children}</span>
    </p>
  );
};

type Work = {
  name: string;
  logo: ReactNode;
  link?: string;
  description: React.ReactNode;
  tech: {icon: string; style?: any; name: string}[];
};

const work: Work[] = [
  {
    name: 'Hunch',
    logo: (
      <HunchLogo tw="mt-1.5 transform scale-[1.3] origin-left text-white" />
    ),
    link: 'https://hunch.tools/',
    description: (
      <WorkDescription from="2024" to="2025">
        I am a part of the team responsible for implementing Hunch's primary
        product
        <br />— a dynamic, canvas-based, no-code platform that integrates
        multiple AI models, enhancing productivity and creativity. My focus is
        on delivering a seamless and high standard user experience.
      </WorkDescription>
    ),
    tech: [
      icons.vite,
      icons.react,
      icons.typescript,
      icons.nodejs,
      icons.tailwind,
      icons.socketio,
      icons.radix,
      icons.openapi,
      icons.figma,
      icons.posthog,
      icons.linear,
      icons.sentry,
    ],
  },
  {
    name: 'Snaplet',
    logo: <SnapletLogo />,
    link: 'https://snaplet.dev/',
    description: (
      <WorkDescription from="2023" to={undefined}>
        I invented and engineered Snaplet’s innovative product, the VS Code
        extension for instant preview databases in the local environment.
        <br />
        In general, my mission was to push the boundaries of user experience
        across the product offering.
      </WorkDescription>
    ),
    tech: [
      icons.nextjs,
      icons.react,
      icons.typescript,
      icons.nodejs,
      icons.tailwind,
      icons.vite,
      icons.prisma,
      icons.postgres,
      icons.neon,
      icons.trpc,
      icons.storybook,
      icons.figma,
      icons.posthog,
      icons.linear,
      icons.sentry,
    ],
  },
  {
    name: 'Playbook',
    logo: <PlaybookLogo tw="mt-1 transform scale-[0.8] origin-left" />,
    link: 'https://www.joinplaybook.com/',
    description: (
      <WorkDescription from="2021" to="22">
        I created multiple various web applications for internal use, as well as
        end-user facing applications at scale for hundreds of thousands of
        Playbook’s customers.
      </WorkDescription>
    ),
    tech: [
      icons.react,
      icons.typescript,
      icons.nodejs,
      icons.tailwind,
      icons.vite,
      icons.graphql,
      icons.postgres,
      icons.sentry,
      icons.mailchimp,
      icons.netlify,
      icons.storybook,
      icons.figma,
      icons.shortcut,
    ],
  },
  {
    name: 'Millie',
    logo: <MillieLogo tw="mt-1" />,
    link: 'https://www.milliegroup.com/',
    description: (
      <WorkDescription from="2020" to="23">
        I developed Millie’s entire pivotal student portal with scalability in
        mind to allow for tens of thousands of concurrent real-time users.
        <br />I designed, architected, and spearheaded the implementation of a
        variety of crucial tooling to propel Millie into the EdTech industry.
      </WorkDescription>
    ),
    tech: [
      icons.react,
      icons.typescript,
      icons.nodejs,
      icons.tailwind,
      icons.vite,
      icons.prisma,
      icons.postgres,
      icons.typeorm,
      icons.sentry,
      icons.vercel,
      icons.heroku,
      icons.aws,
      icons.lambda,
      icons.figma,
      icons.monday,
    ],
  },
  {
    name: 'Interso',
    logo: <img src="/interso.png" alt="Interso" width={80} />,
    description: (
      <WorkDescription from="2020" to={undefined}>
        I designed, built from the ground up, and deployed an e-commerce website
        for a local family business who was in need of help during the
        COVID&#8209;19 crisis.
      </WorkDescription>
    ),
    tech: [
      icons.vue,
      icons.typescript,
      icons.nodejs,
      icons.tailwind,
      icons.nuxtjs,
      icons.strapi,
      icons.graphql,
      icons.digitalocean,
      icons.sass,
      icons.affinitydesigner,
    ],
  },
  {
    name: 'Zwierciadła',
    logo: <ZwierciadlaLogo tw="w-[120px]" />,
    description: (
      <WorkDescription from="2018" to="2019">
        I led the Engineering & Design team during the 16th edition of
        Zwierciadła - the largest and most recognizable nation-wide theatre
        event for the youth. We successfully revamped the event's national
        brand, and cooperated with multiple partners and sponsors. That edition
        was a great success and attracted an unusual 1000+ spectators at just
        one venue.
      </WorkDescription>
    ),
    tech: [
      icons.wordpress,
      icons.python,
      icons.photoshop,
      icons.lightroom,
      icons.indesign,
      icons.affinitydesigner,
    ],
  },
];

const TechIcon = ({icon, style, name}: any) => {
  return (
    <div title={name}>
      <Icon icon={icon} width={24} height={24} css={style} />
    </div>
  );
};

const LinkOrDivLogo = ({
  children,
  link,
  name,
}: {
  children: ReactNode;
  link?: string;
  name: string;
}) => {
  if (link) {
    return (
      <a href={link} title={name} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <div>{children}</div>;
};

const WorkItem = ({logo, description, tech, link, name}: Work) => {
  return (
    <div tw="flex items-start flex-col md:(flex-row max-w-[840px])">
      <div tw="md:(w-[282px] pl-28) mb-4">
        <LinkOrDivLogo {...{name, link}}>{logo}</LinkOrDivLogo>
      </div>
      <div>
        <div>{description}</div>
        <div tw="mt-4 flex gap-4 items-center flex-wrap max-w-[400px]">
          {tech?.map((item, i) => (
            <TechIcon {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const WorkSection = () => {
  const ref = useIntersectNav('resume');
  return (
    <section tw="max-w-[840px] mt-10 mx-auto" ref={ref}>
      <IdOffset id="resume" />
      <SectionHeader>resumé</SectionHeader>

      <div tw="md:ml-[282px] mt-7">
        <div>
          <img
            src="/imgs/lnu.png"
            width={186.41}
            height={30.22}
            title="Linnaeus University, Sweden"
            alt="Linnaeus University, Sweden"
          />
        </div>
        <WorkDescription from="paused" to={undefined} tw="mt-3.5">
          Software Engineering BSc Degree
          <br />
          from LNU, Sweden
        </WorkDescription>
      </div>

      <div tw="[& > * + *]:(mt-11 md:(mt-8)) mt-11">
        {work.map((item, i) => (
          <WorkItem {...item} key={i} />
        ))}
      </div>
    </section>
  );
};
