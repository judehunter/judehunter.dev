import tw from 'twin.macro';

export const Button = ({children, onClick, ...rest}) => {
  return (
    <button
      tw="text-xl px-[1.3em] py-[0.6em] border-radius[2.5px] font-bold bg-white color[#0D0D0F] hover:bg-opacity-80 transition-[background]"
      {...{onClick}}
      {...rest}
    >
      {children}
    </button>
  );
};
