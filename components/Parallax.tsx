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
  useDetectScrollDown(() => setCur(1));
  useDetectSwipeLeft(() => setCur(1));

  useEffect(() => {
    onChange(cur);
  }, [cur]);

  return (
    <div tw="relative w-full overflow-x-hidden flex-grow">
      {
        items.map((el, i) => (
          <div key={i}>
            <div
              tw="w-full absolute px-5 pb-10 top-0 bottom-0 overflow-x-hidden transition-all transition-duration[1s]! overflow-y-auto"
              style={{transform: `translateX(${(i - cur) * 100 + '%'})`}}
              css={[
                css`
                  ::-webkit-scrollbar {
                    width: 0;  /* Remove scrollbar space */
                    background: transparent;  /* Optional: just make scrollbar invisible */
                  }
                `
              ]}
            >
              <div tw="ml-auto mr-auto max-width[1460px]">
                {el[0]}
              </div>
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
    window.addEventListener('wheel', (evt) => cb(evt.deltaY), {passive: true});
    return () => window.removeEventListener('wheel', null);
  }, [...deps])
}

const useDetectScrollDown = (cb: () => any, deps: DependencyList = []) => {
  useDetectScroll((deltaY) => {
    if (deltaY > 0) cb();
  }, deps);
}

const useDetectSwipe = (cb: (deltaX: number, deltaY: number) => any, deps: DependencyList = []) => {
  useEffect(() => {
    let x = null;
    let y = null;
    window.addEventListener('touchstart', (evt) => {
      const {clientX, clientY} = evt.touches[0];
      // console.log('set state', clientX, clientY);
      x = clientX;
      y = clientY;
    }, {passive: true});
    window.addEventListener('touchmove', evt  => {
      // console.log('ontouchmove', x, y);
      if (!x || !y) return;
      const {clientX, clientY} = evt.touches[0];
      const xDiff = clientX - x;
      const yDiff = clientY - y;
      // console.log(xDiff, yDiff);
      if (Math.abs(xDiff) > 30 || Math.abs(yDiff) > 30) {
        // console.log('enough')
        x = null;
        y = null;
        cb(xDiff, yDiff)
      }
    }, {passive: true});
    return () => {
      window.removeEventListener('touchstart', null);
      window.removeEventListener('touchmove', null);
    }
  }, [...deps])
}

const useDetectSwipeSignificant = (cb: (dir: 'h' | 'v', delta: number) => any, deps: DependencyList = []) => {
  useDetectSwipe((deltaX, deltaY) => {
    const isH = Math.abs(deltaX) > Math.abs(deltaY);
    // console.log('horizontal?', isH);
    cb(isH ? 'h' : 'v', isH ? deltaX : deltaY);
  }, deps)
}

const useDetectSwipeLeft = (cb: () => any, deps: DependencyList = []) => {
  useDetectSwipeSignificant((dir, delta) => {
    if (dir === 'h' && delta < 0) {
      cb();
    }
  }, deps);
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