export const devCache = <T = string>() => {
  const cache: [k: string, v: T][] = [];
  return {
    get: (k: string) => {
      if (process.env.NODE_ENV !== 'development') return null;

      return cache.find((x) => x[0] === k)?.[1] ?? null;
    },
    set: (k: string, v: T) => {
      if (process.env.NODE_ENV !== 'development') return;

      const idx = cache.findIndex((x) => x[0] === k);
      if (idx === -1) {
        cache.push([k, v]);
      } else {
        cache[idx][1] = v;
      }
    },
  };
};
