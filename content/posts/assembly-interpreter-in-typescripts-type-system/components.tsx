import {RefObject, useEffect, useRef, useState} from 'react';
import tw from 'twin.macro';

export {Fools} from './Fools';

export {
  Note,
  Info,
  Idea,
} from '../../../src/components/ArticlePage/components/Note';

export const ShowcaseImage = () => {
  return (
    <div>
      <img
        tw="md:hidden"
        src="/media/assemblyfib.png"
        alt="Image showing the fibonacci sequence implemented in ts-asm"
      />
      <img
        tw="hidden md:block"
        src="/media/assemblyfib2.png"
        alt="Image showing the fibonacci sequence implemented in ts-asm"
      />
    </div>
  );
};

export const AdderTable = () => {
  const rows = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
  ];

  const [inputs, setInputs] = useState([0, 0, 0]);

  const result = inputs.reduce((acc, cur) => acc + cur, 0) % 2;
  const carry = inputs.reduce((acc, cur) => acc + cur, 0) >= 2;

  return (
    <div tw="my-16">
      <div>
        <h3 tw="pb-2">
          <span tw="md:hidden">tap</span>
          <span tw="hidden md:inline">click</span> to try it yourself
        </h3>
        <div tw="grid grid-template-rows[grid-template-rows: repeat(1, minmax(0, 1fr))] grid-cols-5 gap-3 [& > *:not(.header)]:(rounded-[8px] bg-[#2E3440] font-family['Fira Code']) md:max-w-[300px] select-none">
          <div className="header">A</div>
          <div className="header">B</div>
          <div className="header">C</div>
          <div className="header">result</div>
          <div className="header">carry</div>
          {/*  */}
          <div
            tw="cursor-pointer"
            css={[inputs[0] && tw`bg-green-600!`]}
            onClick={() => setInputs((x) => [+!x[0], x[1], x[2]])}
          >
            {inputs[0]}
          </div>
          <div
            tw="cursor-pointer"
            css={[inputs[1] && tw`bg-green-600!`]}
            onClick={() => setInputs((x) => [x[0], +!x[1], x[2]])}
          >
            {inputs[1]}
          </div>
          <div
            tw="cursor-pointer"
            css={[inputs[2] && tw`bg-green-600!`]}
            onClick={() => setInputs((x) => [x[0], x[1], +!x[2]])}
          >
            {inputs[2]}
          </div>
          <div css={[result && tw`bg-green-600!`]}>{result}</div>
          <div css={[carry && tw`bg-green-600!`]}>{+carry}</div>
        </div>
      </div>
      <div tw="mt-12">
        <h3 tw="pb-2">or use this cheatsheet</h3>
        <div tw="grid grid-template-rows[grid-template-rows: repeat(9, minmax(0, 1fr))] grid-cols-5 gap-3 [& > *:not(.header)]:(rounded-[8px] bg-[#2E3440] font-family['Fira Code']) md:max-w-[300px]">
          <div className="header">A</div>
          <div className="header">B</div>
          <div className="header">C</div>
          <div className="header">result</div>
          <div className="header">carry</div>
          {/*  */}
          {rows.flat().map((x, i) => (
            <div key={i} css={[x && tw`bg-green-600!`]}>
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = {threshold, root, rootMargin};
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [
    elementRef?.current,
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
  ]);

  return entry;
}

export const Virtual = ({children, log}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const intersectionObserver = useIntersectionObserver(ref, {});

  const [measured, setMeasured] = useState<number | null>();

  const getContent = () => {
    return (
      <div
        ref={(el) => {
          if (el) {
            // ref.current = el;
            if (log) console.log(el.getBoundingClientRect().height);
            setMeasured(el.getBoundingClientRect().height);
          }
        }}
      >
        {children}
      </div>
    );
  };
  if (log) {
    console.log(intersectionObserver?.isIntersecting);
  }

  const getPlaceholder = () => {
    return (
      <div
        ref={(el) => {
          if (el) {
            ref.current = el;
          }
        }}
        style={{height: measured!}}
      />
    );
  };

  return (
    <div tw="relative">
      {/* {JSON.stringify([intersectionObserver?.isIntersecting])} */}
      <div
        ref={(el) => {
          if (el && !ref.current) {
            ref.current = el;
          }
        }}
        css={[
          intersectionObserver?.isIntersecting
            ? tw`absolute top-[-1000px] bottom-[-1000px] left-0 right-0`
            : tw`mt-[-1000px] mb-[-1000px]`,
        ]}
        style={{
          height: intersectionObserver?.isIntersecting
            ? undefined
            : measured! + 2000,
        }}
      />
      {!measured || intersectionObserver?.isIntersecting ? (
        <div
          ref={(el) => {
            if (el) {
              // ref.current = el;
              if (log) console.log(el.getBoundingClientRect().height);
              setMeasured(el.getBoundingClientRect().height);
            }
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );

  return measured
    ? intersectionObserver?.isIntersecting
      ? getContent()
      : getPlaceholder()
    : getContent();
};
