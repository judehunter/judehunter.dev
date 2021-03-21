import {Children} from 'react';
import tw, {css, styled} from 'twin.macro';

const Center: React.FC<{width: number}> = ({children, width}) => {
  return (
    <div tw="ml-auto mr-auto flex flex-col min-height[100vh]" css={[css`max-width: ${width}px;`]}>
      {children}
    </div>
  )
}

const CenterFlex = ({children}) => (
  <div tw="flex justify-center flex-col min-height[100vh]">
    {/* <div> */}
      {children}
    {/* </div> */}
  </div>
)

const Playground: React.FC = ({children}) => {
  return (
    <div tw="flex justify-center items-center h-screen flex-col">
      {children}
    </div>
  )
}

export const Layouts = {
  Default: Center,
  CenterFlex,
  Playground
}
