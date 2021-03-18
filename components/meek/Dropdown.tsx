import {ReactNode, useEffect, useMemo, useRef, useState} from 'react'
import {Icon} from './Icon';
import 'twin.macro';
import tw, {css, theme} from 'twin.macro';
import composeRefs from '@seznam/compose-react-refs';
import {useIsomorphicLayoutEffect} from '../../utils/common';

type DropdownProps<T> = {
  items: [ReactNode, T?][],
  val: T,
  onChange: (val: T) => any
}

const useIsOverflown = () => {
  const ref = useRef<HTMLDivElement>();
  return [
    ref.current ? (ref.current.scrollHeight > ref.current.clientHeight || ref.current.scrollWidth > ref.current.clientWidth) : null,
    ref
  ] as const;
}

const useIsScrolledToBottom = (wiggleRoom: number = 0) => {
  const ref = useRef<HTMLDivElement>();
  const [state, setState] = useState(false);
  const set = () => {
    setState(ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight - wiggleRoom < 1);
  }

  useIsomorphicLayoutEffect(() => {
    ref.current.addEventListener('scroll', set);
    return () => ref.current.removeEventListener('scroll', set);
  }, [])

  return [
    state,
    ref
  ] as const;
}

export const Dropdown = <T,>(props: DropdownProps<T>) => {
  const {items, val, onChange} = props;
  const [open, setOpen] = useState(false);
  const [isOverflown, isOverflownRef] = useIsOverflown();
  const [isScrolledToBottom, isScrolledToBottomRef] = useIsScrolledToBottom(10);
  const showGradient = isOverflown && !isScrolledToBottom;
  const activeIdx = useMemo(() => items.findIndex(el => el[1] === val), [items, val]);
  const active = items[activeIdx][0];

  return (
    <div tw="relative">
      <div
        tw="
          flex justify-between items-center
          py-1 px-3.5
          border-2 border-pink-400
          rounded
          cursor-pointer
          select-none
        "
        onClick={() => setOpen(c => !c)}
      >
        {active}
        <Icon
          tw="ml-3.5 transition-transform"
          icon="ri-arrow-down-s-line"
          css={[
            open && tw`transform -rotate-180`
          ]}
        />
      </div>
      <div
        tw="
          absolute top[calc(100% - 4px)] left-0 right-0
          max-height[150px]
          overflow-auto
          border-2 border-pink-400
          border-t-0
          rounded
          rounded-t-none
          bg-white
          transition-all
          transition-duration[100ms]!
          cursor-pointer
        "
        css={[
          open ? tw`visible opacity-100` : tw`invisible opacity-0`,
          css`
            ::-webkit-scrollbar {
              width: 0px;
            }
            box-shadow: 0 5px 15px -3px rgba(244, 114, 182, 0.3);
          `
        ]}
        ref={composeRefs(isOverflownRef, isScrolledToBottomRef)}
      >
        {
          items.map(([el, v], i) => (
            <div
              tw="mt-2.5 px-3.5"
              // css={[
              //   i === items.length - 1 && tw"
              // ]}
              key={JSON.stringify(v)}
              onClick={() => {onChange(v); setOpen(false)}}
            >
              {el}
            </div>
          ))
        }

        <div
          tw="sticky bottom-0 transition-opacity"
          css={[
            showGradient ? tw`opacity-40` : tw`opacity-0`,
            css`
              background: linear-gradient(180deg, rgba(0,0,0,0) 0%, ${theme`colors.pink.400`} 100%);
              height: 10px;
              width: 100%;
            `
          ]}
        />
      </div>
    </div>
  )
}