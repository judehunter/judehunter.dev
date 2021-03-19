import tw, {css} from 'twin.macro';

type SimpleSwitchProps = {
  val: boolean,
  icons
  onChange: (val: boolean) => any
}

export const SimpleSwitch: React.VFC<SimpleSwitchProps> = () => {
  return (
    <div
      tw="bg-blue-700"
      css={[
        css`
          width: 50px;
          height: 25px;
        `
      ]}
    >

    </div>
  )
}