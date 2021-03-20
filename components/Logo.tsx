import {css} from 'twin.macro';

export const Logo = ({isSmall}) =>
  <div tw="transition-all" css={[
    css`
      width: 50px;
      margin-right: 20px;
      transition-duration: .2s;
      transition-delay: .2s;
    `,
    isSmall && css`
      width: 40px;
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