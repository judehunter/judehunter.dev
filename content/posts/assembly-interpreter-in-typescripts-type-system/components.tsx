import {useState} from 'react';
import tw from 'twin.macro';
import React from 'react';
import {gaEvt} from '../../../src/misc/a7s';
import {posthog} from 'posthog-js';

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

const active = tw`bg-yellow-9! text-gold-1`;

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

  const sendEvt = () => {
    gaEvt({action: 'click_adder_table', category: 'engagement'});
    posthog.capture('clicked adder table', {category: 'engagement'});
  };

  return (
    <div tw="my-16">
      <div>
        <h3 tw="pb-2">
          <span tw="md:hidden">tap</span>
          <span tw="hidden md:inline">click</span> to try it yourself
        </h3>
        <div tw="grid [grid-template-rows: repeat(1, minmax(0, 1fr))] grid-cols-5 gap-3 [& > *:not(.header)]:(rounded-[8px] bg-gold-3 [font-family: 'Fira Code']) md:max-w-[300px] select-none">
          <div className="header">A</div>
          <div className="header">B</div>
          <div className="header">C</div>
          <div className="header">result</div>
          <div className="header">carry</div>
          {/*  */}
          <div
            tw="cursor-pointer"
            css={[inputs[0] && active]}
            onClick={() => {
              setInputs((x) => [+!x[0], x[1], x[2]]);
              sendEvt();
            }}
          >
            {inputs[0]}
          </div>
          <div
            tw="cursor-pointer"
            css={[inputs[1] && active]}
            onClick={() => {
              setInputs((x) => [x[0], +!x[1], x[2]]);
              sendEvt();
            }}
          >
            {inputs[1]}
          </div>
          <div
            tw="cursor-pointer"
            css={[inputs[2] && active]}
            onClick={() => {
              setInputs((x) => [x[0], x[1], +!x[2]]);
              sendEvt();
            }}
          >
            {inputs[2]}
          </div>
          <div css={[result && active]}>{result}</div>
          <div css={[carry && active]}>{+carry}</div>
        </div>
      </div>
      <div tw="mt-12">
        <h3 tw="pb-2">or use this cheatsheet</h3>
        <div tw="grid [grid-template-rows: repeat(9, minmax(0, 1fr))] grid-cols-5 gap-3 [& > *:not(.header)]:(rounded-[8px] bg-gold-3 [font-family: 'Fira Code']) md:max-w-[300px]">
          <div className="header">A</div>
          <div className="header">B</div>
          <div className="header">C</div>
          <div className="header">result</div>
          <div className="header">carry</div>
          {/*  */}
          {rows.flat().map((x, i) => (
            <div key={i} css={[x && active]}>
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
