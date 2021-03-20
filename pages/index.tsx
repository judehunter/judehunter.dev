import {Layouts} from '../components/Layouts';
import tw, {css} from 'twin.macro';
import {Spacer} from '../components/meek/Spacer';
import React, {ReactNode, useEffect, useState} from 'react';
import {Icon} from '../components/meek/Icon';
import {Logo} from '../components/Logo';
import {Hero} from '../components/Hero';
import {ParallaxManager} from '../components/Parallax';
import {MasonryGrid} from '../components/Masonry';
import {IconLabel} from '../components/meek/IconLabel';
import {NavBar} from '../components/NavBar';
import {TimeLine} from '../components/TimeLine';

type SectionProps = {title: ReactNode, subtitle?: ReactNode, children: ReactNode}
type ProjectProps = SectionProps & {
  award?: ReactNode,
  img?: string,
  tech?: string
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
      css={[
        css`

        `
      ]}
    >
      {
        tech && (tech || '').split(',').map((el, i) => (
          <ProjectTechBadge key={i} val={el.trim()} />
        ))
      }
    </div>
  )
}

const Project = ({title, subtitle, children, award, img, tech}: ProjectProps) => {
  return (
    <section>
      <h1 tw="font-ibm font-bold font-size[2rem]">
        {title}
      </h1>
      {
        subtitle && 
          <h2 tw="flex items-center font-ibm font-medium font-size[1.2rem] -mt-1.5">
            <Icon tw="text-2xl mr-1.5" icon="ri-arrow-right-fill" />{subtitle}
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
    </section>
  )
}

const WorkCompany = ({name, img, desc, children}) => {
  return (
    <>
      <Spacer h="20px" />
      <div tw="flex">
        <div tw="flex-basis[30%] flex-grow-0 flex-shrink-0 margin-right[80px]">
          {/* <h1 tw="font-bold font-size[2rem]">
            {name}
          </h1> */}
          <img tw="max-width[160px] rounded" src={img} />
          <Spacer h="20px" />
          <aside tw="text-xl">
            {desc}
          </aside>
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

const WorkItem = ({role, desc}: {role: ReactNode, desc?: ReactNode}) => {
  return (
    <div tw="pb-7">
      <h1 tw="font-size[2rem] font-bold">
        {role}
      </h1>
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

const WorkExp = () =>
  <Section title="MONEY-MAKERS 💰" subtitle="WORK & PROFFESIONAL EXPERIENCE">
    <WorkCompany
      desc={
        <div>
          An AI based test prep tutoring platform to level the playing field for disadvantaged students around the world.
          <br />
          {/* <a href="https://ensembleeducation.org" target="_blank">Website</a> */}
        </div>
      }
      name="Ensemble Education"
      img="/imgs/ensemble.png"
    >
      <WorkItem role="Chief Technology Officer" desc={(<>
        <ProjectTechBar tech="Vue, Nuxt (SSR), Tailwind, TypeScript, koa (REST), TypeORM, Python (AI), Serverless, Sentry, DataDog, AWS Lambda, AWS S3, AWS Cloudfront, AWS RDS (PostgreSQL), AWS ElastiCache (Redis), GitHub Actions" />
        <Spacer h="10px" />
        <WorkResponsibilities items={`
          Led and managed our development team at Ensemble.
          Designed the UX and developed the whole Web App.
          Made crucial technology decisions in an effort to develop future-proof applications.
          Maintained multiple git repositories and reviewed pull requests.
          Developed the infrastructure and the backbone of the API.
        `} />
      </>)} />
      <WorkItem role="Lead Developer" />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          A network of mentors for international school students globally. The big brothers & big sisters you wish you had.
          <br />
          {/* <a href="https://ensembleeducation.org" target="_blank">Website</a> */}
        </div>
      }
      name="Millie Group"
      img="/imgs/millie.png"
    >
      <WorkItem role="Product Development Engineer" desc={(<>
        <ProjectTechBar tech="React, Next, Typescript, Prisma, GraphQL, MailGun, Nodemailer, Sentry, AWS Lambda, AWS S3, AWS Cloudfront, AWS RDS, GTag, Google Analytics, Facebook Pixel" />
        <Spacer h="10px" />
        <WorkResponsibilities items={`
          Developing products to simplify the interactions of the end users with the company
          Deploying microservices with AWS Lambda, RDS, S3 and other solutions.
          Developing internal administrative tools to help with bulk messaging and LinkedIn scraping
          Web development advisorship, counseling, mentorship
          Integrating Google Tag Manager, Google Analytics and Facebook Pixel with the company's website
        `} />
      </>)} />
      <WorkItem role="Product Development Intern" />
    </WorkCompany>
    <WorkCompany
      desc={
        <div>
          A local distribution company who was in need of help during the COVID-19 crisis.
        </div>
      }
      name="Interso"
      img="/imgs/interso.png"
    >
      <WorkItem role="E-commerce Full Stack Developer" desc={(<>
        <ProjectTechBar tech="Vue, Nuxt, Vuex, TypeScript, koa, Strapi, PM2, Nodemailer, Digital Ocean (CentOS)" />
        <Spacer h="10px" />
        <WorkResponsibilities items={`
          Designed, built from the ground up, and deployed an e-commerce website for a local family business using modern technologies, including Nuxt.js, Vue.js, koa.js, postgres, SCSS and TypeScript.
          The website helped this business during the COVID-19 crisis and is viewed on average 10,000 times by 2,000 users every month.
        `} />
      </>)} />
      <WorkItem role="Social Media Manager" />
      <WorkItem role="Social Media Graphic Designer" />
    </WorkCompany>
  </Section>

const Section = ({title, subtitle, children}: SectionProps) => {
  return (
    <section
      tw="font-ibm padding-bottom[30px]"
    >
      <h1 tw="font-ibm font-bold font-size[3rem]">
        {title}
      </h1>
      <h2 tw="font-ibm font-bold font-size[1.2rem] -mt-2.5">
        {subtitle}
      </h2>
      <Spacer h="30px" />
      {children}
    </section>
  )
}

const MyDen = () =>
  <Section title="MY DEN 🕳️" subtitle="PERSONAL PROJECTS, ACHIEVEMENTS & MORE">
    <MasonryGrid>
      <Project
        title="This portfolio 😛"
        tech="React, TypeScript, Next, Emotion, Tailwind"
      >
      </Project>
      <Project
        title="Queso"
        subtitle="🧀 A delicious programming language"
        img="/imgs/queso.png"
        tech="Rust, Handwritten Parser, Pratt Parser, VM, Byte Code"
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
      >
        Boar Inc. was a data-visualization and aggregation project to fight the African swine virus plague. Users could submit sightings of boars on a map and authoritiess could generate raports, leverage the QGIS integration, and visualize the density of sightings on the Leaflet map.
      </Project>
      <Project
        title="BRAWLBOX"
        subtitle="Indie fresh neon arcade shooter"
        award={<div>Grarantanna Game Jam&nbsp;<b>1st</b>&nbsp;place winner</div>}
        img="/imgs/brawlbox.png"
        tech="Godot, C#"
      >
        My friend and I took advantage of the social distancing free time and placed 1st for best gameplay in the Grarantanna Game Jam hosted by the Ministry of Digital Affairs in Poland.
      </Project>
      <Project
        title="Meek"
        subtitle="A React component library"
        tech="React, JSS, Emotion, Tailwind"
      >
      </Project>
      <Project
        title="Joint"
        subtitle="HackYeah 2018 'Education' task entry"
        award={<div>HackYeah 2018&nbsp;<b>runner-up</b></div>}
        tech="HTML, JS, CSS, Express"
        img="/imgs/joint.png"
      >
        My friend and I competed in HackYeah - the biggest stationary hackathon in Europe. We earned our spot as the finalists under the education category.
        We built a Physics engine for teachers to use in their classrooms.
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
  return (
    <div>
      <div tw="absolute background-color[#F4F6F8] left-0 right-0 bottom-0 top-0 z-index[-1]" />
      <Layouts.Default width={1500}>
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
          style={{height: cur ? '30px' : '60px'}}
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
      </Layouts.Default>
    </div>
  )
}

export default Portfolio;