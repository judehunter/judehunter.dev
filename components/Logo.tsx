import {css} from 'twin.macro';

export const Logo = ({isSmall}) =>
  <div tw="transition-all md:margin-right[20px]" css={[
    css`
      width: 50px;
      transition-duration: .2s;
      transition-delay: .2s;
    `,
    isSmall && css`
      width: 40px;
    `
  ]}>
    <svg
      viewBox="0 0 1028 621"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
    >
      <path fill="none" d="M0 0h1028v620.206H0z" />
      <g fontSize={823.667}>
        <text
          x={4.111}
          y={593.033}
          fontFamily="'IBMPlexSans-Bold','IBM Plex Sans',sans-serif"
          fontWeight={700}
        >
          {"J"}
        </text>
        <text
          x={486.034}
          y={593.033}
          fontFamily="'IBMPlexSans-Medium','IBM Plex Sans',sans-serif"
          fontWeight={500}
        >
          {"H"}
        </text>
      </g>
    </svg>
  </div>