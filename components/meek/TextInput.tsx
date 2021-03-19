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
        bg-blue-700
        text-white
        border-2 border-blue-700
        outline-none
        transition-all
        focus-within:(
          ring-blue-300
          ring-4
          ring-offset-0
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
        tw="outline-none min-w-0 transition-colors flex-grow bg-blue-700"
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