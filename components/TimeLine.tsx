import React, {ReactNode} from 'react'
import tw, {css} from 'twin.macro';

export const TimeLine = ({children}: {children: ReactNode}) => {
  return (
    <>{
      React.Children.map(children, (child, i) => (
        <div tw="flex items-stretch">
          <div tw="flex-shrink-0 relative width[30px]">
            {/* bar */}
            {
              i < (React.Children.count(children) - 1) &&
              <div tw="absolute transform -translate-x-1/2 left-1/2 top-0 bottom-0 width[3px] " css={[css`background-color: #900067;`]} />
            }
            <div tw="absolute transform -translate-x-1/2 left-1/2 top-0 width[18px] height[18px] rounded-full border-white border-4" css={[css`background-color: #900067;`]}/>
          </div>
          <div tw="flex-grow margin-top[-19px] margin-left[15px]">
            {child}
          </div>
        </div>
      ))
    }</>
  )
}