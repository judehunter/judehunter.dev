import {MutableRefObject, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
import tw, {css} from 'twin.macro';
import {useIsomorphicLayoutEffect} from '../../utils/common';

type SwitchProps = {
  left?: ReactNode,
  right?: ReactNode,
  active: 'left' | 'right',
  colors?: [any, any?],
  onChange: (val: 'left' | 'right') => any
}

const useRect = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [bbox, setBbox] = useState<DOMRect>(null);

  const set = () =>
    setBbox(ref?.current?.getBoundingClientRect?.());

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('load', set);
    window.addEventListener('resize', set);
    return () => {
      window.removeEventListener('load', set);
      window.removeEventListener('resize', set)
    }
  }, []);

  return [bbox, ref] as const;
}

export const Switch: React.VFC<SwitchProps> = (props) => {
  const {left, right, active, onChange, colors} = props;
  const [leftBox, leftRef] = useRect();
  const [rightBox, rightRef] = useRect();
  const [parentBox, parentRef] = useRect();

  const bgRect = active === 'left' ? leftBox : rightBox;
  const bgPos = {left: bgRect?.left - parentBox?.left, width: bgRect?.width}

  return (
    <div tw="relative font-content">
      <div tw="border-2 border-pink-200 absolute left-0 right-0 bottom-0 top-0 z-index[-1] rounded" />
      <div
        tw="absolute top-0 bottom-0 bg-pink-50 z-index[-1] transition-all border-2 border-pink-400 rounded"
        css={[
          css`
            left: ${bgPos.left}px;
            width: ${bgPos.width}px;
          `,
          colors && css`
            background-color: ${active === 'left' ? colors[0] : colors[1]};
          `,
          active === 'left' ? tw`rounded-r-none` : tw`rounded-l-none`
        ]}
      />
      <div
        tw="flex justify-center items-center font-medium cursor-pointer"
        ref={parentRef}
      >
        <div
          tw="px-3.5 py-1"
          css={[
            // active === 'left' && tw`text-pink-800`
          ]}
          ref={leftRef}
          onClick={() => onChange('left')}
        >
          {left}
        </div>
        <div
          tw="px-3.5 py-1 transition-colors"
          css={[
            // active === 'right' && tw`text-pink-800`
          ]}
          ref={rightRef}
          onClick={() => onChange('right')}
        >
          {right}
        </div>
      </div>
    </div>
  )
}