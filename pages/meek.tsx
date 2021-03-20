import {Layouts} from '../components/Layouts';
import {IconLabel} from '../components/meek/IconLabel';
import {PlainButton} from '../components/meek/PlainButton';
import tw, {css} from 'twin.macro';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useMergeState} from '../utils/common';
import {Spacer} from '../components/meek/Spacer';
import {Pagination} from '../components/meek/Pagination';
import {Switch} from '../components/meek/Switch';
import {Checkbox} from '../components/meek/Checkbox';
import {RadioList} from '../components/meek/RadioList';
import {LoadingGizmo, LoadingGizmoTest} from '../components/meek/LoadingGizmo';
import {TextInput} from '../components/meek/TextInput';
import {Dropdown} from '../components/meek/Dropdown';
import {Icon} from '../components/meek/Icon';

// const Example: React.FC<{css}> = (props) => (
//   <h1 {...props}>Test {JSON.stringify(props)}</h1>
// )
// const App = () => (
//   <Example tw="text-pink-500" css={css`opacity: .2;`} />
// )

const Home: React.FC = ({}) => {
  const [state, mergeState] = useMergeState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    page: 1,
    pageLen: 4,
    switch: 'left',
    checkbox: false,
    radio: 'first',
    username: '',
    dropdown: 'random'
  });
  
  // simulate uploading
  useEffect(() => {
    if (state.isLoading) setTimeout(() => mergeState({isError: true, isLoading: false}), 2000)
  }, [state])

  const reset = useCallback(() => {
    mergeState({isLoading: false, isSuccess: false, isError: false})
  }, []);

  return (
    <Layouts.Playground>
      <PlainButton onClick={() => mergeState({isLoading: true})} onReset={reset} {...state}>
        <IconLabel icon="ri-video-upload-line">
          Upload
        </IconLabel>
      </PlainButton>
      <Spacer h="30px" />
      <Pagination count={state.pageLen} current={state.page} onChange={v => mergeState({page: v})} />
      <Spacer h="30px" />
      <Switch
        active={state.switch as 'left' | 'right'}
        onChange={v => mergeState({switch: v})}
        left={
          <IconLabel icon="ri-question-mark">
            Random
          </IconLabel>
        }
        right={
          <IconLabel icon="ri-user-3-fill">
            Personalized
          </IconLabel>
        }
      />
      <Spacer h="30px" />
      <Switch
        active={state.switch as 'left' | 'right'}
        onChange={v => mergeState({switch: v})}
        left={
          <Icon icon="ri-question-mark" />
        }
        right={
          <Icon icon="ri-user-3-fill" />
        }
      />
      <Spacer h="30px" />
      <Checkbox
        val={state.checkbox}
        onChange={checkbox => mergeState({checkbox})}
      >
        I agree to the Terms and Conditions.
      </Checkbox>

      <Spacer h="30px" />

      <RadioList
        val={state.radio}
        items={[
          ['first', <div>I am over 18</div>],
          ['second', <div>I am not over 18</div>]
        ]}
        onChange={radio => mergeState({radio})}
      />

      <Spacer h="30px" />

      <div tw="width[500px]">
      
        <TextInput val={state.username} onChange={username => mergeState({username})} icon="ri-user-3-fill" label="Full Name" disabled={state.checkbox}/>

        <Spacer h="30px" />

        <Dropdown items={[
          [
            <IconLabel icon="ri-question-mark">
            Random
            </IconLabel>,
            'random'
          ],
          [
            <IconLabel icon="ri-question-mark">
              Personalized
            </IconLabel>,
            'personalized'
          ],
          [
            <IconLabel icon="ri-question-mark">
              Random 2
            </IconLabel>,
            'random 2'
          ],
          [
            <IconLabel icon="ri-question-mark">
              Personalized 2
            </IconLabel>,
            'personalized 2'
          ],
          [
            <IconLabel icon="ri-question-mark">
              Random 3
            </IconLabel>,
            'random 3'
          ],
          [
            <IconLabel icon="ri-question-mark">
              Personalized 3
            </IconLabel>,
            'personalized 3'
          ]
        ]} val={state.dropdown} onChange={dropdown => mergeState({dropdown})} />

      </div>

      <Spacer h="30px" />

      <LoadingGizmo>
        <LoadingGizmoTest />
      </LoadingGizmo>


    </Layouts.Playground>
  )
}

export default Home;