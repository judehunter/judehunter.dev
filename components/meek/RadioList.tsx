import {ReactNode} from 'react';
import {Checkbox} from './Checkbox';
import tw from 'twin.macro';

type RadioListItem = [
  any,
  ReactNode
];

type RadioListProps = {
  items: RadioListItem[],
  val: any,
  onChange: (val: any) => any,
}

export const RadioList: React.FC<RadioListProps> = (props) => {
  const {items, val, onChange} = props;

  return (
    <div tw="space-y-2">
      {
        items.map(([v, e], i) => (
          <Checkbox key={i} round val={v === val} onChange={() => onChange(v)}>
            {e}
          </Checkbox>
        ))
      }
    </div>
  )
}