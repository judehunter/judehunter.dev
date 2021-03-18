import tw, {css} from 'twin.macro';

type SpacerProps = {
  h?: string,
  w?: string
}

export const Spacer: React.VFC<SpacerProps> = (props) => {
  const {h, w} = props;

  return (
    <div
      css={[
        h && css`
          height: ${h};
        `,
        w && css`
          width: ${w};
        `
      ]}
    >

    </div>
  )
}