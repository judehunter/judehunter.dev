import {keyframes} from '@emotion/react';
import tw from 'twin.macro';

const shake1 = keyframes`
  from, to {
    dx: 0;
  }
  50% {
    dx: 2;
  }
`;

export const GlitchText = ({children}) => {
  return (
    <>
      <svg width="0" height="0" tw="hidden">
        <filter id="kill">
          <feColorMatrix
            type="matrix"
            result="red_"
            values="4 0 0 0 0
              0 0 0 0 0 
              0 0 0 0 0 
              0 0 0 1 0"
          />
          <feOffset in="red_" dx="0" dy="0" result="red">
            <animate
              attributeName="dx"
              values="1;2;1"
              dur="0.3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="dy"
              values="-1;1;-1;2;-2"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feColorMatrix
            type="matrix"
            in="SourceGraphic"
            result="blue_"
            values="0 0 0 0 0
              0 3 0 0 0 
              0 0 10 0 0 
              0 0 0 1 0"
          />
          <feOffset in="blue_" dx="-3" dy="0" result="blue">
            <animate
              attributeName="dx"
              values="-3;-2;-3"
              dur="0.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="dy"
              values="-1;0;-1"
              dur="0.2s"
              repeatCount="indefinite"
            />
          </feOffset>
          <feBlend mode="screen" in="red" in2="blue" />
        </filter>
      </svg>
      <span tw="mx-[5px] font-bold text-2xl -webkit-filter[url(#kill)]">
        {children}
      </span>
    </>
  );
};
