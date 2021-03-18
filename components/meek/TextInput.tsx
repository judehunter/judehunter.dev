import tw from 'twin.macro';
import {Icon} from './Icon';

type TextInputProps = {
  disabled?: boolean,
  val: string,
  onChange: (val: string) => any,
  type?: 'text' | 'password',
  icon?: string,
  label?: string,
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const {type = 'text', val, onChange, disabled = false, icon, label} = props;
  return (
    <div
      tw="
        flex items-center
        rounded
        px-3.5 py-1
        border-2 border-pink-400
        outline-none
        focus-within:(
          ring-pink-400
          ring-1
          ring-offset-0 transition-all
        )
      "
      css={[
        disabled && tw`bg-gray-100 border-gray-400 pointer-events-none`
      ]}
    >
      <div tw="flex justify-center items-center font-medium mr-2.5 flex-grow-0">
        {icon && <Icon tw="mr-2.5" icon={icon} />}
        <h1 tw="font-content">{label}:</h1>
      </div>
      <input
        tw="outline-none min-w-0 transition-colors flex-grow"
        css={[
          disabled && tw`bg-gray-100 pointer-events-none`
        ]}
        disabled={disabled}
        type={type}
        value={val}
        onChange={evt => onChange(evt.target.value)}
      />
    </div>
  )
}