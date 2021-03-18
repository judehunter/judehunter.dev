import tw, {css, styled} from 'twin.macro';

const Center = styled.div`
  ${tw`ml-auto mr-auto`}
  ${css`
    max-width: 700px;
  `}
`

const Default: React.FC = ({children}) => {
  return (
    <Center>
      {children}
    </Center>
  )
}

const Playground: React.FC = ({children}) => {
  return (
    <div tw="flex justify-center items-center h-screen flex-col">
      {children}
    </div>
  )
}

export const Layouts = {
  Default,
  Playground
}
