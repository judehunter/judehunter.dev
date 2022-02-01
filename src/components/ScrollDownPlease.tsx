import {motion} from 'framer-motion';
import tw from 'twin.macro';

const Line = ({width, i}) => {
  return (
    <motion.div
      tw="background-color[white] height[1px]"
      css={{width}}
      animate={{opacity: [0, 0.5, 0.5, 0]}}
      transition={{
        duration: 1.5,
        delay: 0.15 * i,
        times: [0, 0.3, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 2,
      }}
    />
  );
};

export const ScrollDownPlease = () => {
  return (
    <div tw="space-y-[32px]">
      {[209, 138, 89, 58, 35, 18].map((x, i) => (
        <Line key={i} width={`${x}px`} i={i} />
      ))}
    </div>
  );
};
