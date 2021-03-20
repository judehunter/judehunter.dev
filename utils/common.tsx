import React, {DependencyList, Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

export const useMergeState = <T extends Record<string, any>>(init: T) => {
  const [state, setState] = useState(init);
  const update: Dispatch<SetStateAction<Partial<T>>> = (value) => {
    setState(cur => {
      let partial = null;
      if (value instanceof Function)
        partial = value(cur)
      else partial = value;

      return {...cur, ...partial}
    })
  }
  const updateRaw: Dispatch<SetStateAction<Record<string, any>>> = (value) => {
    setState(cur => {
      let partial = null;
      if (value instanceof Function)
        partial = value(cur)
      else partial = value;

      return partial;
    })
  }
  return [state, update, updateRaw] as const
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const log = (val) => {console.log(val); return val}

export const useEvent = (evt: string, cb: (...args) => any, deps: DependencyList = []) => {
  useEffect(() => {
    
    return
  })
}


export const useIsScrolledToBottom = (wiggleRoom: number = 0) => {
  const [state, setState] = useState(false);
  const set = (node) => {
    if (!node) return;
    console.log('use', (node.scrollHeight - node.scrollTop - node.clientHeight - wiggleRoom) < 1)
    // console.log(ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight - wiggleRoom);
    if ((node.scrollHeight - node.scrollTop - node.clientHeight - wiggleRoom) < 1) {
      console.log('SCROLLED TO BOTTOM');
    }
    // if (!(node.scrollHeight > node.clientHeight)) setState(true);
    setState((node.scrollHeight - node.scrollTop - node.clientHeight - wiggleRoom) < 1);
  }

  const ref = useCallback((node) => {
    if (node) {
      set(node);
      node.addEventListener('scroll', () => set(node));
      return () => node?.removeEventListener?.('scroll', () => set(node));
    }
  }, []);

  return [
    state,
    ref
  ] as const;
}
export const useIsScrolledToTop = (wiggleRoom: number = 0) => {
  const [state, setState] = useState(false);
  const set = (node) => {
    if (!node) return;
    // console.log('use', (node.scrollTop - wiggleRoom < 1));
    // console.log(ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight - wiggleRoom);
    if (node.scrollTop - wiggleRoom < 1) {
      console.log('SCROLLED TO TOP');
    }
    setState(node.scrollTop - wiggleRoom < 1);
  }

  const ref = useCallback((node) => {
    console.log(node);
    if (node) {
      set(node);
      node.addEventListener('scroll', () => set(node));
      return () => node?.removeEventListener?.('scroll', () => set(node));
    }
  }, []);

  return [
    state,
    ref
  ] as const;
}

export const useScrolledEdge = (wiggleRoom: number = 0) => {
  // const ref = useRef<HTMLDivElement>(null);
  // console.log('ref', ref);
  const [up, ref1] = useIsScrolledToTop(wiggleRoom);
  const [down, ref2] = useIsScrolledToBottom(wiggleRoom);
  const cbRef = useCallback(node => {
    // console.log('node', node);
    ref1(node);
    ref2(node);
  }, [])
  // console.log(up, down, ref1, ref2);
  // console.log(up, down);
  // console.log(ref);
  // useEffect(() => {
  //   console.log('set ref2');
  //   ref2.current = ref.current
  // }, [ref, ref.current])
  return [{up, down}, cbRef] as const
}