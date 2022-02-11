import tw from 'twin.macro';

export const Button = ({children, onClick, variant = 'white', ...rest}) => {
  return (
    <button
      tw="font-size[1em] line-height[1.75] px-[1.3em] py-[0.6em] border-radius[2.5px] font-bold transition-[background, color, outline-width] hocus:(bg-opacity-90 outline[4px solid rgba(255, 255, 255, 0.3)] outline-offset[2px] transition-[background, color, outline-width] transition-duration[2s outline-width])"
      css={[
        {
          white: tw`bg-white color[#0D0D0F]`,
          green: tw`background-color[#7FEC9D] color[black]`,
        }[variant],
      ]}
      {...{onClick}}
      {...rest}
    >
      {children}
    </button>
  );
};
