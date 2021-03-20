import {Layouts} from '../components/Layouts';
import tw, {css} from 'twin.macro';
import {Spacer} from '../components/meek/Spacer';
import React, {ReactNode, useEffect, useState} from 'react';
import {Icon} from '../components/meek/Icon';
import {Logo} from '../components/Logo';
import {Hero} from '../components/Hero';
import {ParallaxManager} from '../components/Parallax';
import Masonry from 'react-masonry-css';

const NavBar = ({isSmall}: {isSmall: boolean}) =>
  <nav
    tw="flex justify-center items-center transition-all" 
    css={[
      isSmall
        ? css`
          padding: 20px 0 0;
        `
        : css`
          padding: 100px 0 0;
        `,
      css`
        transition-duration: 1s;
      `
    ]}
  >
    <Logo isSmall={isSmall}/>
  </nav>

type SectionProps = {title: ReactNode, subtitle?: ReactNode, children: ReactNode}
type ProjectProps = SectionProps & {
  award?: ReactNode,
  img?: string,
  tech?: string
}

const ProjectTechBadge = ({val}: {val: string}) => {
  return (
    <div tw="px-3.5 py-1 rounded text-white m-1.5 text-sm font-medium font-content background-color[#900067]">
      {val}
    </div>
  )
}

const ProjectTechBar = ({tech}: {tech?: string}) => {
  return (
    <div
      tw="flex flex-wrap -m-1.5"
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

const Section = ({title, subtitle, children}: SectionProps) => {
  return (
    <section tw="font-ibm padding-bottom[100px]">
      <h1 tw="font-ibm font-bold font-size[3rem]">
        {title}
      </h1>
      <h2 tw="font-ibm font-bold font-size[1.2rem] -mt-2.5">
        {subtitle}
      </h2>
      <Spacer h="30px" />
      <div
        css={[
          css`
            & .masonry {
              display: flex;
              margin-left: -40px; /* gutter size offset */
              width: auto;
              &__column {
                padding-left: 40px; /* gutter size */
                background-clip: padding-box;
                & > * {
                  margin-bottom: 30px;
                }
              }
            }
          `
        ]}
      >
        <Masonry breakpointCols={3} className="masonry" columnClassName="masonry__column">
          {children}
        </Masonry>
      </div>
    </section>
  )
}

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
              <Section title="MY DEN" subtitle="PERSONAL PROJECTS, ACHIEVEMENTS & MORE">
                {/* <Project title="Ensemble Education" subtitle="Education on an equal field">
                  test
                </Project> */}
                <Project
                  title="This portfolio 😛"
                  tech="React, TypeScript, Next, Emotion, Tailwind"
                >
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
                  title="Queso"
                  subtitle="🧀 A delicious programming language"
                  img="/imgs/queso.png"
                  tech="Rust, Handwritten Parser, Pratt Parser, VM, Byte Code"
                >
                  <b>Queso</b> is a functional dynamically-typed scripting language that builds on the foundation of existing languages with many unique convenience and quality of life features and tweaks. In fact, the driving force behind it was bad design choices in other languages.
                  <br/><br/>
                  <b>Queso</b> was built as an academic project and is a great resource for other learners.
                </Project>
                <Project
                  title="Meek"
                  subtitle="A React component library"
                  tech="React, JSS, Emotion, Tailwind"
                >
                </Project>
                <Project
                  title="Boar Inc."
                  subtitle="HackYeah 2020 partner task entry"
                  award={<div>HackYeah 2020&nbsp;<b>TOP 5</b> project and finalist</div>}
                  tech="Vue, Nuxt, SASS, Express, PostgreSQL, Leaflet, Multer (Uploading Images)"
                >
                  test
                </Project>
                <Project
                  title="Joint"
                  subtitle="HackYeah 2018 'Education' task entry"
                  award={<div>HackYeah 2018&nbsp;<b>runner-up</b></div>}
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
                <Project title="Stanford Certifications" subtitle="My contributions to the dev.to community">
                  test
                </Project>
              </Section>
            ), "projects"],
            [(
              <Section title="MY DEN" subtitle="PERSONAL PROJECTS, ACHIEVEMENTS & MORE">
                {/* <Project title="Ensemble Education" subtitle="Education on an equal field">
                  test
                </Project> */}
                <Project
                  title="This portfolio 😛"
                  tech="React, TypeScript, Next, Emotion, Tailwind"
                >
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
                  title="Meek"
                  subtitle="A React component library"
                  tech="React, JSS, Emotion, Tailwind"
                >
                </Project>
                <Project
                  title="Boar Inc."
                  subtitle="HackYeah 2020 partner task entry"
                  award={<div>HackYeah 2020&nbsp;<b>TOP 5</b> project and finalist</div>}
                  tech="Vue, Nuxt, SASS, Express, PostgreSQL, Leaflet, Multer (Uploading Images)"
                >
                  test
                </Project>
                <Project
                  title="Joint"
                  subtitle="HackYeah 2018 'Education' task entry"
                  award={<div>HackYeah 2018&nbsp;<b>runner-up</b></div>}
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
                <Project title="Stanford Certifications" subtitle="My contributions to the dev.to community">
                  test
                </Project>
              </Section>
            ), "experience"]
          ]}
        />
      </Layouts.Default>
    </div>
  )
}

export default Portfolio;