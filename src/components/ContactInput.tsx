import tw from 'twin.macro';
import {Button} from './Button';

export const ContactInput = () => {
  return (
    <div
      tw="
        border-2 border-white flex items-stretch border-radius[5px]
        transition-[border]
        // margin-left[-15px]
        // focus-within:(
        //   border-color[#7FEC9D]
        // )
      "
    >
      <div tw="flex-grow flex-shrink">
        <input
          tw="width[100%] height[100%] min-width[1px] bg-transparent padding-left[15px] padding-right[15px] outline-none"
          placeholder="Enter your email"
        />
      </div>
      <Button tw="flex-shrink-0 margin[-2px]" onClick={() => {}}>
        Get in contact
      </Button>
    </div>
  );
};
