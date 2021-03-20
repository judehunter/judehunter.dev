import React from 'react'
import {css} from 'twin.macro'
import {Icon} from './meek/Icon'
import {Spacer} from './meek/Spacer'
import {ScrollingList} from './ScrollingList'

export const Hero = () => {
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
          "INDIE GAME DEVELOPER",
          "SEO ENGINEER"
        ]} />
        <Spacer h="20px" />
        <SocialBar />
      </div>
      <div tw="flex items-center h-full">
        <h1 tw="font-size[1.3rem] font-weight[700]">SCROLL</h1>
        <Icon tw="font-size[5rem]" icon="ri-arrow-right-s-line" />
      </div>
    </div>
  )
}

const SocialBar = () => (
  <div tw="flex space-x-2 font-size[1.8em]">
    <Icon icon="ri-linkedin-box-fill" />
    <Icon icon="ri-github-fill" />
    <Icon icon="ri-mail-fill" />
  </div>
)