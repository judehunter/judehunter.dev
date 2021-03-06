import {Layouts} from '../components/Layouts';
import tw, {css} from 'twin.macro';
import {Spacer} from '../components/meek/Spacer';
import React, {ReactNode, useEffect, useState} from 'react';
import {Icon} from '../components/meek/Icon';
import {Logo} from '../components/Logo';
import {Hero} from '../components/Hero';
import {ParallaxManager} from '../components/Parallax';
import {MasonryGrid, MasonryPhotos} from '../components/Masonry';
import {IconLabel} from '../components/meek/IconLabel';
import {NavBar} from '../components/NavBar';
import {TimeLine} from '../components/TimeLine';
import Head from 'next/head';
import {GoBackArrow} from '../components/GoBackArrow';

type SectionProps = {title: ReactNode, subtitle?: ReactNode, children: ReactNode}
type ProjectProps = SectionProps & {
  award?: ReactNode,
  img?: string,
  tech?: string,
  links?: [string, string?][]
}

const ProjectTechBadge = ({val}: {val: string}) => {
  return (
    <div tw="px-3.5 py-1 rounded text-white m-1 text-sm font-medium font-content background-color[#900067]">
      {val}
    </div>
  )
}

const ProjectTechBar = ({tech}: {tech?: string}) => {
  return (
    <div
      tw="flex flex-wrap -m-1"
    >
      {
        tech && (tech || '').split(',').map((el, i) => (
          <ProjectTechBadge key={i} val={el.trim()} />
        ))
      }
    </div>
  )
}

const Project = ({title, subtitle, children, award, img, tech, links}: ProjectProps) => {
  return (
    <section>
      <div tw="">
        <h1 tw="font-ibm font-bold font-size[2rem]">
          {title}
        </h1>
      </div>
      {
        subtitle && 
          <h2 tw="flex items-start font-ibm font-medium font-size[1.2rem] -mt-1.5">
            <Icon tw="text-2xl mr-1.5 margin-top[-2px]" icon="ri-arrow-right-fill" />{subtitle}
          </h2>
      }
      {
        award &&
          <h2 tw="flex items-center font-ibm font-medium font-size[1.2rem] -mt-1.5">
            <Icon tw="text-2xl mr-1.5 color[#e8ae08]" icon="ri-award-fill" />{award}
          </h2>
      }
      {
        tech && (<>
          <Spacer h="8px" />
          <ProjectTechBar tech={tech}/>
        </>)
      }
      {
        img && (<>
          <Spacer h="15px" />
          <img tw="rounded shadow max-width[70%]" src={img} />
        </>)
      }
      <Spacer h="14px" />
      <div tw="font-display font-size[1.1rem]">
        {children}
      </div>
      {
        links && <>
          <Spacer h="20px" />
          <div tw="flex items-stretch rounded space-x-1.5">
            {
              links.map(([address, text], i) => {
                const iconMap = {
                  'github': 'ri-github-fill',
                  'npm': 'ri-npmjs-fill'
                } as const;
                const matching = Object.entries(iconMap).find(([k, v]) => ~address.indexOf(k))?.[1];
                if (matching) return (
                  <a tw="font-size[1.5rem] bg-black py-0.5 px-3 rounded text-white flex items-center" key={i} href={address} target="_blank">
                    <Icon icon={matching} />
                  </a>
                )
                else return (
                  <a tw="font-size[1.25rem] bg-black py-0.5 px-3 rounded text-white flex items-center underline" key={i} href={address} target="_blank">
                    {text}
                  </a>
                )
              })
            }
          </div>
        </>
      }
      <Spacer h="15px" />
      <div tw="height[5px] bg-gray-300 width[20%]"/>
    </section>
  )
}

const WorkCompany = ({name, img, desc, children}) => {
  return (
    <>
      <Spacer h="20px" />
      <div tw="
        flex items-stretch
        flex-col
        md:flex-row
      ">
        <div tw="flex-basis[30%] flex-grow-0 flex-shrink-0 margin-right[80px]">
          {/* <h1 tw="font-bold font-size[2rem]">
            {name}
          </h1> */}
          <div tw="sticky top[0px] margin-bottom[40px]">
            <img tw="max-width[160px] rounded" src={img} />
            <Spacer h="20px" />
            <aside tw="text-xl">
              {desc}
            </aside>
          </div>
        </div>
        <div>
          <TimeLine>
            {children}
          </TimeLine>
        </div>
      </div>
    </>
  )
}

const WorkItem = ({role, time, desc}: {role: ReactNode, time?: ReactNode, desc?: ReactNode}) => {
  return (
    <div tw="pb-7">
      <h1 tw="text-4xl font-bold sticky">
        {role}
      </h1>
      {
        time && <>
          <Spacer h="5px" />
          <aside tw="flex space-x-1.5 font-size[1.1rem]">
            <IconLabel icon="ri-calendar-2-fill">
              {time}
            </IconLabel>
          </aside>
          <Spacer h="12px" />
        </>
      }
      <div>
        {desc}
      </div>
    </div>
  )
}

const WorkResponsibilities = ({items}: {items: string}) => {
  return (
    <div>
      {
        items.split('\n').map(item => item.trim()).filter(item => item.length).map((item, i) => (
          <IconLabel key={i} icon="ri-arrow-right-fill" align="top">
            {item}
          </IconLabel>
        ))
      }
    </div>
  )
}

const WorkExp = () => (
  <Section title="MONEY-MAKERS ????" subtitle="WORK & PROFESSIONAL EXPERIENCE">
    <WorkCompany
      desc={
        <div>
          Marketplace where health, wellness and fitness creators share and
          monetize their freshest content with their clients, fans and
          followers. $12M in funding.{" "}
          <a tw="text-blue-500" href="https://playbookapp.io" target="_blank">
            playbookapp.io
          </a>
          <br />
          {/* <a href="https://ensembleeducation.org" target="_blank">Website</a> */}
        </div>
      }
      name="Playbook Technologies"
      img="/imgs/playbook.png"
    >
      <WorkItem
        role="Frontend/Full-Stack engineer"
        time="May 2021, 12 mos"
        desc={
          <>
            <ProjectTechBar tech="React, Next (SSR), Vite, Tailwind + twin.macro, Emotion, TypeScript, Nest.js, TypeORM, Serverless, AWS Lambda, Sentry, Netlify" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
                Developed critical applications for hundreds of thousands of users.
                Developed internal tools to help manage complex data structures.
              `}
            />
          </>
        }
      />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          An AI based test prep tutoring platform to level the playing field for
          disadvantaged students around the world.
          <br />
          {/* <a href="https://ensembleeducation.org" target="_blank">Website</a> */}
        </div>
      }
      name="Ensemble Education"
      img="/imgs/ensemble.png"
    >
      <WorkItem
        role="Chief Technology Officer"
        time="Oct 2020, 10 mos"
        desc={
          <>
            <ProjectTechBar tech="Vue, Nuxt (SSR), Tailwind, TypeScript, koa (REST), TypeORM, Python (AI), Serverless, Sentry, DataDog, AWS Lambda, AWS S3, AWS Cloudfront, AWS RDS (PostgreSQL), AWS ElastiCache (Redis), GitHub Actions" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
          Led and managed our development team at Ensemble.
          Designed the UX and developed the whole Web App.
          Made crucial technology decisions in an effort to develop future-proof applications.
          Maintained multiple git repositories and reviewed pull requests.
          Developed the infrastructure and the backbone of the API.
        `}
            />
            <Spacer h="10px" />
            <MasonryPhotos
              photos={["landing.png"].map((x) => "/imgs/ensemble/" + x)}
            />
          </>
        }
      />
      <WorkItem role="Lead Developer" time="Aug 2020, 10 mos" />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          A network of mentors for international school students globally. The
          big brothers & big sisters you wish you had.
          <br />
          {/* <a href="https://ensembleeducation.org" target="_blank">Website</a> */}
        </div>
      }
      name="Millie Group"
      img="/imgs/millie.png"
    >
      <WorkItem
        role="Head Product Development Engineer"
        time="Sep 2020, 20 mos"
        desc={
          <>
            <ProjectTechBar tech="Vue, Nuxt, Typescript, Prisma, GraphQL, MailGun, Nodemailer, Sentry, AWS Lambda, AWS S3, AWS Cloudfront, AWS RDS, GTag, Google Analytics, Facebook Pixel" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
          Developing products to simplify the interactions of the end users with the company
          Deploying microservices with AWS Lambda, RDS, S3 and other solutions.
          Developing internal administrative tools to help with bulk messaging and LinkedIn scraping
          Web development advisorship, counseling, mentorship
          Integrating Google Tag Manager, Google Analytics and Facebook Pixel with the company's website
        `}
            />
          </>
        }
      />
      <WorkItem role="Product Development Intern" time="Sep 2020, 3 mos" />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          A local distribution company who was in need of help during the
          COVID-19 crisis.
        </div>
      }
      name="Interso"
      img="/imgs/interso.png"
    >
      <WorkItem
        role="E-commerce Full Stack Developer"
        time="Feb 2020, 5 mos"
        desc={
          <>
            <ProjectTechBar tech="Vue, Nuxt, Vuex, TypeScript, koa, Strapi, PM2, Nodemailer, Digital Ocean (CentOS)" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
          Designed, built from the ground up, and deployed an e-commerce website for a local family business using modern technologies, including Nuxt.js, Vue.js, koa.js, postgres, SCSS and TypeScript.
          The website helped this business during the COVID-19 crisis and is viewed on average 10,000 times by 2,000 users every month.
        `}
            />
            <Spacer h="10px" />
            <MasonryPhotos
              photos={["1606375652998.jpg", "1606375551747.jpg"].map(
                (x) => "/imgs/interso/" + x
              )}
            />
          </>
        }
      />
      <WorkItem
        role="Social Media Graphic Designer"
        desc={
          <>
            Some of my work:
            <Spacer h="10px" />
            <MasonryPhotos
              photos={[
                "94083009_3326401470807867_2327922572794003456_o.png",
                "96081127_3367208433393837_8252974534815121408_o.png",
                "135369174_4033345743446766_6177507321493363086_o.png",
                "162463645_4236889969759008_8153523038761269157_o.png",
                "92909722_3311386782309336_3962024098388770816_o.png",
                "97998626_3393371017444245_6145400908340527104_o.png",
              ].map((x) => "/imgs/interso/" + x)}
            />
          </>
        }
      />
      <WorkItem role="Social Media Manager" />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          The largest nation-wide theatre festival for the youth. Established
          2004 in Lublin, Poland.
        </div>
      }
      name="Zwierciad??a"
      img="/imgs/zwier.png"
    >
      <WorkItem
        role="IT&Photo Team Leader"
        time="Sep 2018, 13 mos"
        desc={
          <>
            <ProjectTechBar tech="Wordpress, Adobe Lightroom CC, Adobe Photoshop" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
          I've led the IT&Photo team during the 16th edition of Zwierciad??a - the largest and most recognizable nation-wide theatre event. We've successfully revived the event's social media & website and dealt with multiple partners and sponsors. That edition was a great success and attracted 1000+ spectators.
        `}
            />
          </>
        }
      />
      <WorkItem
        role="Design Director"
        time="Sep 2018, 13 mos"
        desc={
          <>
            <ProjectTechBar tech="Adobe InDesign, Adobe Illustrator, Affinity Designer" />
            <Spacer h="10px" />
            <WorkResponsibilities
              items={`
          I prepared and oversaw the creation of social media and print material for the 16th edition of Zwierciad??a.
        `}
            />
            Material created by me:
            <Spacer h="10px" />
            <MasonryPhotos
              photos={[
                "cosiedziejewzamoyu.png",
                "cover.png",
                "harmlublinrgb.png",
                "jurydolaczHQ.png",
                "klubrgb.png",
                "plakatfinalrgb.png",
              ].map((x) => "/imgs/zwier/" + x)}
            />
          </>
        }
      />
      {/* <WorkItem role="Social Media Graphic Designer" desc={(<>
        I've led the IT&Photo team during the 16th edition of Zwierciad??a - the largest and most recognizable nation-wide theatre event. We've successfully revived the event's social media & website and dealt with multiple partners and sponsors. That edition was a great success and attracted 1000+ spectators.
      </>)}/> */}
    </WorkCompany>
  </Section>
);

const Section = ({title, subtitle, children}: SectionProps) => {
  return (
    <section
      tw="font-ibm padding-bottom[30px]"
    >
      <h1 tw="font-ibm font-bold text-3xl md:(text-5xl)">
        {title}
      </h1>
      <Spacer h="13px" />
      <h2 tw="font-ibm font-bold text-xl -mt-2.5 text-gray-600">
        {subtitle}
      </h2>
      <Spacer h="30px" />
      {children}
    </section>
  )
}

const MyDen = () =>
  <Section title="MY DEN ???????" subtitle="PERSONAL PROJECTS, ACHIEVEMENTS & MORE">
    <MasonryGrid breakpointCols={{default: 3, 950: 2, 750: 1}}>
      <Project
        title="This portfolio ????"
        tech="React, TypeScript, Next, Emotion, Tailwind"
        links={[
          ['https://github.com/judehunter/portfolio'],
        ]}
      >
      </Project>
      <Project
        title="Queso"
        subtitle="???? A delicious programming language"
        img="/imgs/queso.png"
        tech="Rust, Handwritten Parser, Pratt Parser, VM, Byte Code"
        links={[
          ['https://github.com/queso-lang/queso'],
        ]}
      >
        <b>Queso</b> is a functional dynamically-typed scripting language that builds on the foundation of existing languages with many unique convenience and quality of life features and tweaks. In fact, the driving force behind it was bad design choices in other languages.
                    <br /><br />
        <b>Queso</b> was built as an academic project and is a great resource for other learners.
      </Project>
      <Project
        title="Boar Inc."
        subtitle="HackYeah 2020 partner task entry"
        award={<div>HackYeah 2020&nbsp;<b>TOP 5</b> project and finalist</div>}
        tech="Vue, Nuxt, PWA, SASS, Express, PostgreSQL, Leaflet, Multer (Uploading Images)"
        img="/imgs/boarinc.jpg"
        links={[
          ['https://github.com/Boar-Inc'],
          ['https://hackyeah.pl/2020/12/10/the-finalist-boar-inc/', 'HackYeah']
        ]}
      >
        Boar Inc. was a data-visualization and aggregation project to fight the African swine virus plague. Users could submit sightings of boars on a map and authorities could generate reports, leverage the QGIS integration, and visualize the density of sightings on the Leaflet map.
      </Project>
      <Project
        title="BRAWLBOX"
        subtitle="Indie fresh neon arcade shooter"
        award={<div>Grarantanna Game Jam&nbsp;<b>1st</b>&nbsp;place winner</div>}
        img="/imgs/brawlbox.png"
        tech="Godot, C#"
        links={[
          ['https://github.com/judehunter/brawlbox'],
          ['https://pcktm.itch.io/brawlbox', 'itch.io'],
          ['https://gamejolt.com/games/brawlbox/589681', 'gamejolt']
        ]}
      >
        My friend and I took advantage of the social distancing free time and placed 1st for best gameplay in the Grarantanna Game Jam hosted by the Ministry of Digital Affairs in Poland.
      </Project>
      <Project
        title="ReactiveFile"
        subtitle="Parse and reactively auto-save JSON, TOML, YAML and any other data file with ease."
        tech="Library, TypeScript, Jest, Reactive Programming"
        img="/imgs/reactivefile.png"
        links={[
          ['https://github.com/judehunter/reactivefile'],
          ['https://www.npmjs.com/package/reactivefile']
        ]}
      >
        Reading, altering and then writing data to a file can be gruesome. ReactiveFile does it for you! The library natively supports parsing and serializing of json, toml, yaml and xml files, but you can easily set up other data types using the built-in tools!
      </Project>
      <Project
        title="Joint"
        subtitle="HackYeah 2018 'Education' task entry"
        award={<div>HackYeah 2018&nbsp;<b>runner-up</b></div>}
        tech="HTML, JS, CSS, Express"
        img="/imgs/joint.png"
        links={[
          ['https://2019.hackyeah.pl/winners/#education', 'HackYeah']
        ]}
      >
        My friend and I competed in HackYeah - the biggest stationary hackathon in Europe. We earned our spot as the finalists under the education category.
        We built a Physics engine for teachers to use in their classrooms.
      </Project>
      <Project
        title="Meek"
        subtitle="A React component library"
        tech="React, JSS, Emotion, Tailwind"
      >
        <i>Work In Progress</i>
      </Project>
      <Project title="dev.to" subtitle="My contributions to the dev.to community">
        <a tw="underline color[#900067]" href="https://dev.to/judehunter/the-caveats-and-solutions-to-generic-type-guards-in-typescript-2o7a" target="_blank">
          The caveats (and solutions) to generic type guards in TypeScript.
        </a><br /><br />
        <a tw="underline color[#900067]" href="https://dev.to/judehunter/the-only-api-stack-and-workflow-you-should-be-using-10o8" target="_blank">
          The only API stack (and workflow) you should be using.
        </a>
      </Project>
      <Project title="Stanford Certifications">
        <a tw="underline color[#900067]" href="https://www.coursera.org/account/accomplishments/verify/G99E575UQQ78" target="_blank">
          Divide and Conquer, Sorting and Searching, and Randomized Algorithms
        </a><br /><br />
        <a tw="underline color[#900067]" href="https://www.coursera.org/account/accomplishments/certificate/7Q9FLQM8XMTD" target="_blank">
          Graph Search, Shortest Paths, and Data Structures
        </a><br /><br />
        (The credentials are under my legal name)
      </Project>
    </MasonryGrid>
  </Section>

const Portfolio: React.FC = () => {
  const [cur, setCur] = useState(0);
  return (<>
    <Head>
      <title>Jude Hunter ??? Portfolio</title>
    </Head>
    <div tw="h-full">
      <div tw="absolute background-color[#F4F6F8] left-0 right-0 bottom-0 top-0 z-index[-1]" />
      <Layouts.CenterFlex>
        <NavBar isSmall={!!cur}/>
        <div
          tw="transition-all"
          css={[
            cur
              ? css`
                height: 30px;
                /* transition-delay: 800ms; */
                transition-duration: .2s;
                transition-delay: .2s;
              `
              : css`
                height: 60px;
                transition-duration: .2s;
                transition-delay: .2s;
              `
          ]}
          style={{height: cur ? '20px' : '60px'}}
        />
        <ParallaxManager 
          onChange={v => setCur(v)}
          items={[
            [<Hero />, null],
            [(
              <div>
                <MyDen />
                <WorkExp />
              </div>
            ), null]
          ]}
        />
      </Layouts.CenterFlex>
    </div>
  </>)
}

export default Portfolio;
