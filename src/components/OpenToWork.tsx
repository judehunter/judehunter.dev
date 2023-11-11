import tw from 'twin.macro';
//#f95d87
export const OpenToWork = ({...rest}) => {
  return (
    <div
      tw="
        rounded-lg
        text-xs
        text-gold-1
        bg-yellow-11
        font-bold
        px-2
        py-1
        inline-flex
      "
      {...rest}
    >
      OPEN TO WORK
    </div>
  );
};
