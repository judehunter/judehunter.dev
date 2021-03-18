import tw, {css} from 'twin.macro';
import {Icon} from './Icon';
import {Spacer} from './Spacer';

type CheckboxProps = {
  // $val: [boolean, (val: boolean) => any],
  val: boolean,
  align?: 'top' | 'center' | 'bottom',
  round?: boolean,
  onChange?: (val: boolean) => any
}

const translateOutOfView = (dir: 'up' | 'down') => css`
  transform: translateY(${dir === 'up' ? '-10px' : '10px'});
`

const CheckboxIcon: React.FC<{active: boolean, round?: boolean}> = (props) => {
  const {active, round} = props;
  return (
    <div
      tw="border-2 rounded border-pink-300 transition-all relative overflow-hidden"
      css={[
        css`
          width: 18px;
          height: 18px;
          transition-duration: 75ms;
        `,
        active && css`
          ${tw`bg-pink-400 border-pink-400`}
        `,
        !active && css`
          transition-delay: 50ms;
        `,
        round && tw`
          rounded-full
        `
      ]}
    >
      <Icon
        tw="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white transition-all"
        css={[
          !active && translateOutOfView('down')
        ]}
        icon="ri-check-line"
      />
    </div>
  )
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {val, align = 'center', onChange, children} = props;
  return (
    <label
      tw="flex cursor-pointer select-none font-display"
      css={[
        css`
          align-items: ${{top: 'flex-start', center: 'center', bottom: 'flex-end'}[align]};
        `
      ]}
      onClick={() => onChange(!val)}
    >
      <CheckboxIcon active={val} {...props} />
      <Spacer w="10px" />
      <div>
        {children}
      </div>
    </label>
  )
}