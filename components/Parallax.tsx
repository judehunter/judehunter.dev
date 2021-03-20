import {useRouter} from 'next/router';
import {DependencyList, ReactNode, useCallback, useEffect, useState} from 'react';
import {useIsScrolledToBottom, useIsScrolledToTop, useMergeState, useScrolledEdge} from '../utils/common';
import composeRefs from '@seznam/compose-react-refs';
import {css} from 'twin.macro';

type ParallaxItem = [el: ReactNode, hash: string]

const useParallaxRouting = (cur?: number, items?: ParallaxItem[], onload?: (cur: number) => any) => {
  const router = useRouter();
  const hash = process.browser ? window.location.hash.slice(1) : '';
  let curBasedOnHash = items.findIndex(([el, h]) => h === hash);
  if (curBasedOnHash < 0) curBasedOnHash = 0;
  useEffect(() => {
    window.addEventListener('load', () => {
      onload(curBasedOnHash);
    })
    return () => window.removeEventListener('load', null);
  }, []);
  // useEffect(() => {
  //   if (curBasedOnHash !== cur) {
  //     // console.log('changed', curBasedOnHash, cur);
  //     const hashOfCur = items[cur][1];
  //     router.replace({hash: hashOfCur})
  //   }
  // }, [cur])
}

export const ParallaxManager = (props: {onChange: (val: number) => any, items: ParallaxItem[]}) => {
  const {items, onChange} = props;
  const [cur, setCur] = useState(0);
  useParallaxRouting(cur, items, c => setCur(c));
  const isActive = (i) => i === cur;
  // const [isScrolledToBottom, isScrolledToBottomRef] = useIsScrolledToBottom(0);
  // const [isScrolledToTop, isScrolledToTopRef] = useIsScrolledToTop(0);
  // const [{up, down}, scrolledRef] = useScrolledEdge(); 
  // console.log('is scrolled', up, down);
  // const scrolledHandler = (deltaY) => {
  //   console.log('top?', isScrolledToTop, 'bottom?', isScrolledToBottom)
  //   if (isScrolledToBottom && deltaY > 0) {
  //     console.log('go right');
  //     // setCur(cur => cur < items.length - 1 ? cur + 1 : 0);
  //   }
  //   else if (isScrolledToTop && deltaY < 0) {
  //     console.log('go left');
  //     // setCur(cur => cur > 0 ? cur - 1 : 0)
  //   }
  // };
  
  const [lastScroll] = useDetectScrollState();
  if (lastScroll === 'down' && cur === 0) {
    setCur(1);
  }
  // console.log('is scrolled?', isScrolledToTop, isScrolledToBottom)
  // console.log('last scroll', lastScroll, 'bottom?', down, 'top?', up);
  // const [curScroll, setCurScroll] = useState(null);

  useEffect(() => {
    // console.log('change');
    // setLastScroll(null);
    onChange(cur);
  }, [cur]);

  // if (lastScroll === 'down' && down) {
  //   // console.log('DOWN');
  //   setCur(cur => cur < (items.length - 1) ? (cur + 1) : (items.length - 1))
  //   setLastScroll(null);
  // }
  // else if (lastScroll === 'up' && up) {
  //   // console.log('UP');
  //   setCur(cur => cur > 0 ? (cur - 1) : 0)
  //   setLastScroll(null);
  // }
  // else if (['up', 'down'].includes(lastScroll) && !up && !down) {
  //   setLastScroll(null);
  // }

  // console.log('lastScroll', lastScroll);
  // scrolledHandler(100);
  // scrolledHandler(-100);
  // useEffect(() => {
  //   console.log('effect');
  //   window.addEventListener('wheel', evt => scrolledHandler(evt.deltaY, isScrolledToBottom, isScrolledToTop));
  //   return () => {
  //     console.log('remove');
  //     window.removeEventListener('wheel', (null))
  //   }
  // }, [isScrolledToBottom, isScrolledToTop])

  // const [{canGoLeft, canGoRight}, setCanGo] = useMergeState({canGoLeft: false, canGoRight: false});
  // useDetectScroll((deltaY) => {
  //   // console.log('detect scroll', isScrolledToTop, isScrolledToBottom);
  //   if (isScrolledToBottom && deltaY > 0) {
  //     console.log('go right');
  //     // console.log('is scrolled ref', isScrolledToBottomRef);
  //     // console.log('is scrolled to bottom?', isScrolledToBottom);
  //     // setCur(cur => cur < items.length - 1 ? cur + 1 : 0);
  //   }
  //   else if (isScrolledToTop && deltaY < 0) {
  //     console.log('go left');
  //     // setCur(cur => cur > 0 ? cur - 1 : 0)
  //   }
  // }, [isScrolledToTop, isScrolledToBottom, isScrolledToTopRef, isScrolledToBottomRef, isScrolledToTopRef.current, isScrolledToBottomRef.current])

  return (
    <div tw="relative w-full overflow-x-hidden flex-grow">
      {
        items.map((el, i) => (
          <div key={'ttt' + i}>
            <div
              tw="w-full absolute px-5 pb-10 top-0 bottom-0 overflow-x-hidden transition-all transition-duration[1s]! overflow-y-auto"
              style={{left: (i - cur) * 100 + '%'}}
              css={[
                css`
                  ::-webkit-scrollbar {
                    width: 0;  /* Remove scrollbar space */
                    background: transparent;  /* Optional: just make scrollbar invisible */
                  }
                `
              ]}
            >
              {el[0]}
            </div>
          </div>
        ))
      }
    </div>
  )
}
type ScrollDirV = 'up' | 'down';
type ScrollDir = ScrollDirV;

const useDetectScroll = (cb: (deltaY: number) => any, deps: DependencyList = []) => {
  useEffect(() => {
    console.log('effect');
    window.addEventListener('wheel', (evt) => cb(evt.deltaY));
    return () => window.removeEventListener('wheel', null);
  }, [...deps])
}

const useDetectScrollState = (deps: DependencyList = []) => {
  const [state, setState] = useState<ScrollDirV>(null);

  useDetectScroll((deltaY) => {
    if (deltaY > 0) setState('down')
    else if (deltaY < 0) setState('up')
    else setState(() => null);
  }, deps)
  return [state, setState] as const;
}