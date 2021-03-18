import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useState} from 'react';

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