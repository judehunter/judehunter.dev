import {keyframes} from '@emotion/react';

export const bounce = (amt: string, dir: 'h' | 'v', invert: boolean = false) => {
  const is = (d: typeof dir) => dir === d;
  const A = `
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  `
  const B = `
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  `
  return keyframes`
    0%, 100% {
      transform: translate${dir === 'v' ? 'Y' : 'X'}(${amt});
      ${invert ? B : A}
    }
    50% {
      transform: translate${dir === 'v' ? 'Y' : 'X'}(0);
      ${invert ? A : B}
    }
  `
}

// export const kfToAnim = ()