import tw from 'twin.macro';

export const Button = ({children, onClick, variant = 'white', ...rest}) => {
  return (
    <button
      tw="
      font-size[1em] line-height[1.75] px-[1.3em] py-[0.6em] border-radius[2.5px] font-bold transition-[background, color, outline-width]
      relative
      z-index[0]
      hocus:before:(
        opacity-100
        left[0px] top[0px] right[0px] bottom[0px]
      )
      before:(
        z-index[-1]
        absolute
        opacity-0
        transition-all
        transition-property[left, top, right, bottom, opacity]
        left[2px] top[2px] right[2px] bottom[2px]
        outline[4px solid rgba(255, 255, 255, 0.3)]
        outline-offset[2px]
        border-radius[2.5px]
        // transform[scale(1.1)]
      )
    "
      css={[
        {
          white: tw`color[#0D0D0F]`,
          green: tw`color[black]`,
        }[variant],
      ]}
      {...{onClick}}
      {...rest}
    >
      <div
        tw="absolute left-0 top-0 right-0 bottom-0 z-index[-1] border-radius[2.5px]"
        css={[
          {
            white: tw`bg-white`,
            green: tw`background-color[#7FEC9D]`,
          }[variant],
        ]}
      />
      {children}
    </button>
  );
};
