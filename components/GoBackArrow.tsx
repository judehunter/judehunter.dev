import {Icon} from './meek/Icon';
import tw from 'twin.macro';

export const GoBackArrow = ({onClick}) => (
  <div tw="cursor-pointer" onClick={onClick}>
    <Icon tw="font-size[3rem] leading-none" icon="ri-arrow-left-circle-fill" />
  </div>
);