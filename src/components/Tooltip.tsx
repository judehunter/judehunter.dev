import {ReactNode} from 'react';
import tw, {css} from 'twin.macro';

type Side = 'top' | 'right' | 'bottom' | 'left';

export const Tooltip = ({
  target,
  children,
  side,
}: {
  target: ReactNode;
  children: ReactNode;
  side: Side;
}) => {
  return (
    <div tw="relative" className="group">
      {target}
      <div
        tw="
          absolute
          opacity-0
          pointer-events-none
          group-hover:(
            opacity-100
            pointer-events-auto
          )
          transition-all
        "
        css={[
          {
            top: css`
              top: 0;
              left: 50%;
              padding-bottom: 5px;
              transform: translateX(-50%) translateY(calc(-100% + 10px))
                scale(0.9);
              .group:hover & {
                transform: translateX(-50%) translateY(-100%) scale(1);
              }
            `,
          }[side],
        ]}
      >
        <div
          tw="
            rounded-lg
            bg-[#0E151C]
            border
            border-color[rgba(82, 99, 116, .7)]
            py-2
            px-3
            group-hover:(
              // py-2
              // px-3
            )
            transition-all
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// export const BasicTooltip = ({target, children, side}: {target: ReactNode; children: ReactNode; side: Side}) => {

// };
