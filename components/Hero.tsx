import React from 'react'
import tw, {css} from 'twin.macro'
import {bounce} from '../utils/anims'
import {Face} from './Face'
import {Icon} from './meek/Icon'
import {Spacer} from './meek/Spacer'
import {ScrollingList} from './ScrollingList'

export const Hero = () => {
  return (
    <div tw="padding-top[0px]">
      <div tw="
        rounded-xl
        text-white font-ibm
        flex justify-between items-start flex-col
        height[unset]
        padding-left[20px]
        background-position[-10% 50%]
        padding-bottom[7px]
        md:(
          flex-row height[600px]
          padding-left[80px]
          background-position[center]
          padding-bottom[0]
        )
      "
        css={[
          css`
            background-image: url('/hero.jpg');
            /* height: 600px; */
            /* background-position: center; */
            background-size: cover;
            box-shadow: 0px 9px 18px rgba(0, 0, 0, .2);
          `
        ]}
      >
        <div tw="flex-grow">
          <div tw="height[20px] md:height[170px]" />
          <div tw="relative">
            <h1
              tw="text-6xl lg:(text-8xl) z-index[2] relative"
              css={[
                css`
                font-family: "IBM Plex Sans"; 
                font-weight: 500;
                color: white;
                /* -webkit-text-stroke: 2px black; */
                /* font-size: 6rem; */
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
            {/* <Face tw="absolute z-index[1] left[0px] top[-150px] width[150px] height[150px] 2xl:(left[-350px] top[-100px] width[300px] height[300px])" /> */}
          </div>
          <div tw="height[20px] md:height[40px]" />
          {/* <Spacer h="10px" /> */}
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
        <div
          tw="hidden md:flex items-center h-full"
          css={[
            css`
              animation: ${bounce('-10px', 'h')} 2s infinite;
            `
          ]}
        >
          <h1 tw="font-size[1.3rem] font-weight[700]">SCROLL</h1>
          <Icon tw="font-size[5rem]" icon="ri-arrow-right-s-line" />
        </div>
      </div>
    </div>
  )
}

const SocialBar = () => (
  <div tw="flex space-x-2 font-size[1.8em]">
    <Icon icon="ri-linkedin-box-fill" />
    <Icon icon="ri-github-fill" />
    <Icon icon="ri-mail-fill" />
    <div
      tw="md:hidden flex flex-grow justify-end items-center px-5 pr-10!"
      css={[
        css`
          animation: ${bounce('-20px', 'h', true)} 1.2s infinite;
        `
      ]}
    >
      <Icon tw="font-size[2rem]" icon="ri-arrow-left-s-line" />
      <h1 tw="font-size[1.3rem] font-weight[500]">SWIPE</h1>
    </div>
  </div>
)