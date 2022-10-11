import {keyframes} from '@emotion/react';
import tw, {css} from 'twin.macro';

const SMALL_R = 3;
const BIG_R = 8;

// oefq
const anim1 = keyframes`
  0% {
    cx: 4px;
    r: ${SMALL_R}px;
    // transform: translateX(3px);
  }
  50%{
    cx: 9px;
    r: ${BIG_R}px;
    // transform: translateX(0px);
  }
`;
// zept
const anim2 = keyframes`
  0% {
    cx: 15px;
    r: ${BIG_R}px;
    // transform: translateX(0px);
  }
  50% {
    cx: 20px;
    r: ${SMALL_R}px;
    // transform: translateX(-3px);
  }
`;

export const GooeyLoader = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <defs>
        <filter id="spinner-gF00">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="y" />
          <feColorMatrix
            in="y"
            mode="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
            result="z"
          />
          <feBlend in="SourceGraphic" in2="z" />
        </filter>
      </defs>
      <g filter="url(#spinner-gF00)">
        <circle
          css={css`
            animation: ${anim1} 0.75s cubic-bezier(0.56, 0.52, 0.17, 0.98)
              infinite;
            // transform: translateX(3px);
          `}
          cx="4"
          cy="12"
          r={SMALL_R}
        />
        <circle
          css={css`
            animation: ${anim2} 0.75s cubic-bezier(0.56, 0.52, 0.17, 0.98)
              infinite;
            // transform: translateX(0px);
          `}
          cx="15"
          cy="12"
          r={BIG_R}
        />
      </g>
    </svg>
  );
};
