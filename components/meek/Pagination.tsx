import {ReactNode} from 'react';
import tw, {css} from 'twin.macro';
import {Icon} from './Icon';
import {Spacer} from './Spacer';

type PaginationProps = {
  count: number,
  current: number,
  onChange?: (val: number) => any
}

export const Pagination: React.VFC<PaginationProps> = (props) => {
  const {onChange, current, count} = props;
  const PageSpacerArr = PlaceInBetween([...Array(count).keys()], 's');
  return (
    <div
      tw="flex justify-center items-center"
      css={
        css`
          padding-bottom: 10px;
        `
      }
    >
      <div
        tw="cursor-pointer transition-all text-xl"
        css={[
          current === 1 && tw`pointer-events-none opacity-30`
        ]}
        onClick={() => onChange(current - 1)}
      >
        <Icon
          icon="ri-arrow-drop-left-line"
        />
      </div>
      <Spacer w="7px" />
      {
        PageSpacerArr.map((v, i) => v === 's'
          ? <Spacer w="9px" key={i} />
          : <PaginationBullet key={i} isActive={v + 1 === current} idx={v + 1} onClick={() => onChange(v + 1)} />
        )
      }
      <Spacer w="7px" />
      <div
        tw="cursor-pointer transition-all text-xl"
        css={[
          current === count && tw`pointer-events-none opacity-30`
        ]}
        onClick={() => onChange(current + 1)}
      >
        <Icon
          icon="ri-arrow-drop-right-line"
        />
      </div>
    </div>
  )
}

const PlaceInBetween = (arr: any[], val: any): any[] =>
  [...arr].map((e, i) => i < arr.length - 1 ? [e, val] : [e]).reduce((a, b) => a.concat(b))

const PaginationBullet: React.VFC<{isActive?: boolean, idx: number, onClick?}> = ({isActive, idx, onClick}) => (
  <div
    tw="rounded-full bg-pink-100 relative cursor-pointer hover:bg-pink-200 transition-all"
    css={[
      css`
        width: 12px;
        height: 12px;
      `,
      isActive && tw`bg-pink-400 hover:bg-pink-400 shadow-md`
    ]}
    onClick={onClick}
  >
    <div
      tw="absolute left-1/2 transform -translate-x-1/2 text-xs text-center font-medium opacity-0 transition-all select-none font-content"
      css={[
        css`
          height: 10px;
          width: 20px;
          top: calc(100% + 5px);
        `,
        isActive && tw`opacity-100`
      ]}
    >
      {idx}
    </div>
  </div>
)