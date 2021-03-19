import {Layouts} from '../components/Layouts';
import tw, {css} from 'twin.macro';
import {Spacer} from '../components/meek/Spacer';
import {ReactNode, useEffect, useState} from 'react';
import {Icon} from '../components/meek/Icon';

const Logo = () =>
  <div css={[
    css`
      width: 50px;
      margin-right: 20px;
    `
  ]}>
    <svg
      viewBox="0 0 312 516"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
    >
      <path fill="none" d="M0 0h311.208v516H0z" />
      <path
        d="M81.307 73c-.222 10.37 0 11 0 11M158.473 32c-11.361 30.211-23 323-23 323s5.314-131.328 68-136c62.686-4.672 55.577 108.982 57.735 135M83.208 148s13.751 362.963-52 337"
        fill="none"
        stroke="#000"
        strokeWidth={24.44}
      />
    </svg>
  </div>

const NavBar = () =>
  <nav
    tw="flex justify-center items-center" 
    css={[
      css`
        padding: 100px 0 0;
      `
    ]}
  >
    <Logo />
  </nav>

const useIntervalEffect = (int: number, cb: (...args) => void) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    setState(() => setInterval(cb, int))
    return () => clearInterval(state);
  }, []);
}

const SocialBar = () => (
  <div tw="flex space-x-2 font-size[1.8em]">
    <Icon icon="ri-linkedin-box-fill" />
    <Icon icon="ri-github-fill" />
    <Icon icon="ri-mail-fill" />
  </div>
)

const ScrollingList = (props: {items: ReactNode[]}) => {
  const {items} = props;
  const lineH = 28;
  const show = 3;
  const [curLine, setCurLine] = useState(0);
  const [disableTrans, setDisableTrans] = useState(false);
  useIntervalEffect(1000, () => setCurLine(cur => {console.log('set', cur + 1); return cur + 1}));
  useEffect(() => {
    if (curLine === items.length) {
      setCurLine(items.length);
      setTimeout(() => {
        setDisableTrans(true);
        setCurLine(0);
      }, 200)
      setTimeout(() => {
        setDisableTrans(false);
      }, 300);
    }
  }, [curLine])
  return (
    <>
      <div
        tw="text-white text-xl overflow-hidden"
        css={[
          css`
            font-family: "IBM Plex Sans";
            font-weight: 500;
            height: ${show * lineH}px;
          `
        ]}
      >
        <div
          tw="transform"
          css={[
            disableTrans ? tw`transition-none` : tw`transition-transform`
          ]}
          style={{
            transform: `translate(0, ${- lineH * curLine}px)`
          }}
        >
          {[...items, ...items].map((el, i) => (
            <div key={i}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const Hero = () => {
  return (
    <div tw="rounded-xl text-white flex justify-between items-start"
      css={[
        css`
          background-image: url('/hero.jpg');
          height: 600px;
          background-position: center;
          background-size: cover;
          box-shadow: 0px 9px 18px rgba(0, 0, 0, .2);
          padding-left: 80px;
          font-family: "IBM Plex Sans";
        `
      ]}
    >
      <div tw="flex-grow">
        <Spacer h="140px" />
        <h1
          css={[
            css`
              font-family: "IBM Plex Sans"; 
              font-weight: 500;
              color: white;
              /* -webkit-text-stroke: 2px black; */
              font-size: 6rem;
              text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
                0px 8px 13px rgba(0,0,0,0.1),
                0px 18px 23px rgba(0,0,0,0.1);
              & b {
                font-weight: 700;
              }
            `
          ]}
        >
          <b>JUDE</b> HUNTER
        </h1>
        <Spacer h="20px" />
        <ScrollingList items={[
          "WEB DEVELOPER",
          "UX/UI DESIGNER",
          "LANGUAGE HACKER",
          "SOFTWARE ENGINEER",
          "NODE DEVELOPER",
          "PRODUCT DEVELOPMENT ENGINEER",
          "QUEER ACTIVIST",
          "TEAM LEADER",
          "GRAPHIC DESIGNER",
          "REACT DEVELOPER",
          "VUE DEVELOPER",
        ]}/>
        <Spacer h="20px" />
        <SocialBar />
      </div>
      <div tw="flex items-center h-full">
        <h1 tw="font-size[2rem]">scroll</h1>
        <Icon tw="font-size[5rem]" icon="ri-arrow-right-s-line" />
      </div>
    </div>
  )
}

const Portfolio: React.FC = () => {
  return (
    <div
      css={[
        css`
          background-color: #F4F6F8;
          min-height: 100vh;
        `
      ]}
    >
      <Layouts.Default width={1500}>
        <NavBar />
        <Spacer h="60px" />
        <Hero />
      </Layouts.Default>
    </div>
  )
}

export default Portfolio;