import {ReactNode, useState, useEffect} from 'react';
import tw, {css} from 'twin.macro';

const useIntervalEffect = (int: number, cb: (...args) => void) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    setState(() => setInterval(cb, int))
    return () => clearInterval(state);
  }, []);
}

export const ScrollingList = (props: {items: ReactNode[]}) => {
  const {items} = props;
  const lineH = 28;
  const show = 3;
  const [curLine, setCurLine] = useState(0);
  const [disableTrans, setDisableTrans] = useState(false);
  useIntervalEffect(1000, () => setCurLine(cur => {return cur + 1}));
  useEffect(() => {
    if (curLine === items.length) {
      setCurLine(items.length);
      setTimeout(() => {
        setDisableTrans(true);
        setCurLine(0);
      }, 200)
      setTimeout(() => {
        setDisableTrans(false);
      }, 300);
    }
  }, [curLine])
  return (
    <>
      <div
        tw="text-white text-xl overflow-hidden"
        css={[
          css`
            font-family: "IBM Plex Sans";
            font-weight: 500;
            height: ${show * lineH}px;
          `
        ]}
      >
        <div
          tw="transform"
          css={[
            disableTrans ? tw`transition-none` : tw`transition-transform`
          ]}
          style={{
            transform: `translate(0, ${- lineH * curLine}px)`
          }}
        >
          {[...items, ...items].map((el, i) => (
            <div key={i}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}