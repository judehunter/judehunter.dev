import tw from 'twin.macro';
import {StyleRoot} from './meek/StyleRoot';

export const Face = (props) => (
  <StyleRoot {...props}>
    <div tw="rounded-full shadow border-4 border-white overflow-hidden">
      <img tw="w-full h-full" src="/morda.jpg" />
    </div>
  </StyleRoot>
)