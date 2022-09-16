import {format} from 'date-fns';
import {motion} from 'framer-motion';
import {useRef, useState, useEffect} from 'react';
import tw from 'twin.macro';

export const AnimText = ({text, overlayStyle, delay, ...rest}) => {
  return (
    <motion.span
      tw="inline-block relative before:(block absolute z-index[0] opacity[var(--opacity)])"
      css={{
        '&:before': {
          content: `"${text}"`,
        },
      }}
      animate={{'--opacity': [1, 0, 0, 1]} as any}
      transition={{
        duration: 3,
        times: [0, 0.4, 0.6, 1],
        delay,
        repeat: Infinity,
        repeatDelay: 4,
      }}
      {...rest}
    >
      <motion.span
        tw="bg-clip-text -webkit-text-fill-color[transparent] relative z-index[1]"
        css={overlayStyle}
        animate={{opacity: [0, 1, 1, 0]} as any}
        transition={{
          duration: 3,
          times: [0, 0.2, 0.8, 1],
          delay,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

export const PullUpText = ({delay, children}) => {
  return (
    // <span tw="inline-block height[1.2em] overflow-hidden">
    //   <motion.span
    //     tw="overflow-hidden inline-block"
    //     initial={{height: '0.2em'}}
    //     animate={{height: '1.1em'}}
    //     transition={{
    //       height: {
    //         duration: 0.3,
    //         delay: delay + 0.2,
    //         ease: 'easeOut',
    //       },
    //     }}
    //   >
    <motion.span
      tw="inline-block"
      initial={{y: '0.4em', opacity: 0.001}}
      animate={{y: '0em', opacity: 1}}
      transition={{
        y: {
          duration: 0.3,
          delay: delay + 0.2,
          ease: 'easeOut',
        },
        opacity: {duration: 0.25, delay: delay + 0.2},
      }}
    >
      {children}
    </motion.span>
    //   </motion.span>
    // </span>
  );
};

let first = 0;

const useScrollInterpolation = ({
  ease: _ease,
  speed = 1,
  length,
}: {
  ease?: (x: number) => number;
  speed: number;
  length: number;
}) => {
  const ref = useRef<HTMLDivElement>(null!);

  const [value, setValue] = useState(0);

  const ease = _ease ?? ((t) => t * (2 - t));

  useEffect(() => {
    let isThisFirst = false;
    if (!first) {
      first = 1;
      isThisFirst = true;
    }
    const listener = () => {
      if (!ref.current) return;
      const elemPos = ref.current.getBoundingClientRect().top + document.documentElement.scrollTop;
      const topScrollBottomEdge = document.documentElement.scrollTop + globalThis.window.innerHeight;

      // prettier-ignore
      const eased =
        - (
          ease(
            1 -
            Math.min(
              length,
              Math.max(
                0,
                (elemPos - topScrollBottomEdge) * speed + length
              )
            ) / length
          ) - 1
        );

      // if (isThisFirst) {
      //   console.log(eased);
      // }

      setValue(eased);
    };
    document.addEventListener('scroll', listener, {passive: true});
    return () => document.removeEventListener('scroll', listener);
  }, []);

  return {ref, value};
};

export const ScrollInterpolationPullUp = ({children, length, speed = 1, ...rest}) => {
  const {ref, value} = useScrollInterpolation({speed, length});

  return (
    <div {...rest} {...{ref}}>
      <div style={{transform: `translateY(${value * length}px)`}}>{children}</div>
    </div>
  );
};

export const ScrollInterpolationWorkTech = ({children, length, speed = 1, ...rest}) => {
  const {ref: ref1, value: value1} = useScrollInterpolation({speed, length});
  const {ref: ref2, value: value2} = useScrollInterpolation({speed, length: length / 2});

  return (
    <div
      {...rest}
      ref={(node) => {
        if (!node) return;
        ref1.current = node;
        ref2.current = node;
      }}
    >
      <div style={{transform: `translateX(${(-value1 * length) / 4}px)`, opacity: (1 - value2).toFixed(1)}}>
        {children}
      </div>
    </div>
  );
};

export const CapsPreTitle = ({children}) => {
  return <div tw="color[#7FEC9D] font-bold tracking-wide">{children}</div>;
};

export const DatePeriod = ({start, end}: {start: Date; end: Date | null}) => {
  const styles = tw`color[#697582] font-normal margin-right[10px]`;

  if (end && start.getFullYear() === end.getFullYear()) {
    return <span css={[styles]}>{format(start, 'y')}</span>;
  }

  return (
    <span css={[styles]}>
      {format(start, 'y')}
      {' · '}
      {end ? format(end, 'yy') : 'present'}
    </span>
  );
};
