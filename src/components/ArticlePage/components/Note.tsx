import {Icon} from '@iconify/react';
import tw from 'twin.macro';

export const AttentionBox = ({icon, children}) => {
  return (
    <div tw="rounded-[8px] bg-[#2E344033] px-[25px] py-4 mx-[-25px] flex items-center my-8 font-size[0.9em]">
      <Icon icon={icon} tw="font-size[2rem] mr-7 flex-shrink-0" />
      <div tw="[&>p:nth-of-type(1)]:(mt-0) [&>p:nth-last-of-type(1)]:(mb-0)">
        {children}
      </div>
    </div>
  );
};

export const Note = ({children}) => {
  return <AttentionBox icon="fluent-emoji:nerd-face">{children}</AttentionBox>;
};

export const Info = ({children}) => {
  return <AttentionBox icon="flat-color-icons:info">{children}</AttentionBox>;
};

export const Idea = ({children}) => {
  return <AttentionBox icon="fluent-emoji:light-bulb">{children}</AttentionBox>;
};
