import {Icon} from '@iconify/react';
import tw from 'twin.macro';
import {ContactInput} from '../ContactInput';

export const WhatDoYouSay = () => {
  return (
    <div id="contact" tw="mt-[100px] flex flex-col items-center text-white pb-[200px] text-center px-12">
      <h1 tw="text-xl md:text-3xl font-medium opacity-75">what do you say?</h1>
      <h2 tw="text-4xl md:text-5xl font-bold mt-[15px]">let’s work together</h2>

      <div tw="flex justify-center max-w-[500px] w-full mt-[50px]">
        <ContactInput tw="w-full flex-grow" />
      </div>

      <div tw="opacity-70 mt-[30px]">— or —</div>
      <div></div>

      <div tw="text-white font-size[40px] space-x-[40px] flex items-center mt-[30px]">
        <a href="mailto:matisowagm@gmail.com" target="_blank">
          <Icon icon="mdi:email-open" tw="mb-[-5px]" />
        </a>
        <a href="https://github.com/judehunter" target="_blank" tw="font-size[35px]">
          <Icon icon="akar-icons:github-fill" />
        </a>
        <a href="https://www.linkedin.com/in/jude-hunter/" target="_blank">
          <Icon icon="akar-icons:linkedin-fill" />
        </a>
      </div>
    </div>
  );
};
