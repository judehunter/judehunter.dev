import React from 'react';
import {StyleRoot} from './StyleRoot';
import tw from 'twin.macro';

export const Icon: React.FC<{icon: string}> = (props) => {
  const {icon} = props;
  return (
    <StyleRoot {...props}>
      <div tw="flex justify-center items-center">
        <i className={icon} />
      </div>
    </StyleRoot>
  )
}