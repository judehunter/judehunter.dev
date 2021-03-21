import {css} from 'twin.macro';
import {Logo} from './Logo';

export const NavBar = ({isSmall}: {isSmall: boolean}) =>
  <nav
    tw="flex justify-center items-center transition-all"
    css={[
      isSmall
        ? css`
          padding: 20px 0 0;
        `
        : css`
          padding: 100px 0 0;
          /* @media () */
        `,
      css`
        transition-duration: 1s;
      `
    ]}
  >
    <Logo isSmall={isSmall} />
  </nav>