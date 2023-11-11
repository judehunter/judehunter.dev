import tw from 'twin.macro';
import {Icon} from '@iconify/react';

export {
  Note,
  Info,
  Idea,
} from '../../../src/components/ArticlePage/components/Note';
export {GlitchText} from './GlitchText';

// const Chat = ({children}) => {

// }

export const ChatMe = ({children}) => {
  return (
    <div tw="flex flex-col items-end [:not(p + &)]:md:mt-[-30px]">
      <Icon
        icon="fluent-emoji:person-blonde-hair-medium-light"
        tw="
          font-size[40px] mb-[-15px] mr-[-5px]
          md:(font-size[60px] mb-[-26px] mr-[-50px] mt-0)
          z-index[2]
        "
      />
      <div tw="flex justify-end -mx-8 mb-6 z-index[1] w-full">
        <div
          tw="
          font-size[0.9em]
          bg-gold-2
          border border-gold-7
          rounded-lg px-8
          min-w-[70%]
          max-w-[100%]
          md:max-w-[90%]
          md:min-w-[60%]
          // [& > *:nth-of-type(1)]:(mt-0) [& > *:nth-last-of-type(1)]:(mb-0)
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const ChatGpt = ({children}) => {
  return (
    <div tw="flex flex-col [:not(p + &)]:md:mt-[-30px]">
      <Icon
        icon="fluent-emoji:robot"
        tw="
          font-size[40px] mb-[-15px] ml-[-5px]
          md:(font-size[60px] mb-[-26px] ml-[-50px] mt-0) z-index[2]
        "
      />
      <div tw="flex justify-start -mx-8 mb-6">
        <div
          tw="
          font-size[0.9em]
          // bg-[#2a3b4c33]
          border border-gold-7
          rounded-lg px-8
          max-w-[90%]
          min-w-[70%]
          md:max-w-[90%]
          md:min-w-[60%]
          // [& > *:nth-of-type(1)]:(mt-0) [& > *:nth-last-of-type(1)]:(mb-0)
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
