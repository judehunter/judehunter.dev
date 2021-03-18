import React, {ReactNode, useContext, useEffect, useMemo, useRef, useState} from 'react'
import tw, {css} from 'twin.macro';
import {Icon} from './Icon';

export const LoadingCtx = React.createContext<(val: Promise<any>) => Promise<any>>(null);

type LoadingGizmoProps = {
}
// export const LoadingProvider: React.FC = (props) => {

// }
const useTaskList = (onError: (err) => any) => {
  const [state, setState] = useState([]);
  const removeAt = (idx: number) => {
    setState(cur => {
      const newState = [...cur];
      newState.splice(idx, 1, null);
      return newState;
    });
  }
  const push = (val: Promise<any>) => {
    if (!process.browser) return val;
    setState(cur => {
      const newState = [...cur, val];
      const idx = newState.length - 1;
      val.catch(onError).finally(() => {
        removeAt(idx);
      })

      return newState;
    });
    return val;
  }
  return [state, push] as const
}

const useAutoResetMemo = (timeout: number) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (state) setTimeout(() => {
      setState(false);
    }, timeout)
  }, [state])

  return [state, setState] as const
}

const translateOutOfView = (dir: 'up' | 'down') => css`
  transform: translateY(${dir === 'up' ? '-70px' : '70px'});
`

export const LoadingGizmo: React.FC<LoadingGizmoProps> = (props) => {
  const {children} = props;
  const [showError, setShowError] = useAutoResetMemo(1000);
  const [tasks, pushTask] = useTaskList(() => setShowError(true));
  const tasksLen = tasks.filter(x => x).length;
  return (
    <>
      <LoadingCtx.Provider value={pushTask}>
        {children}
      </LoadingCtx.Provider>

      <div
        tw="fixed bottom-3.5 right-3.5 flex justify-center items-center bg-black rounded-full z-index[-1] transition-all"
        css={[
          css`
            width: 32px;
            height: 32px;
          `,
          (!tasksLen && !showError) && translateOutOfView('down'),
          showError && tw`bg-red-600`
        ]}
      >
        <div
          tw="animate-spin text-pink-600 transition-opacity"
          css={[
            css`
              animation-duration: 800ms;
              font-size: 30px;
            `,
            (showError || !tasksLen) && tw`opacity-0`
          ]}
        >
          <SpinningLoader />
        </div>
        <div
          tw="text-white font-medium font-content"
        >
          <div
            tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity"
            css={[
              showError && tw`opacity-0`
            ]}
          >
            {`${tasksLen > 1 ? tasksLen : ''}`}
          </div>
          <div
            tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity"
            css={[
              !showError && tw`opacity-0`
            ]}
          >
            <Icon tw="text-2xl" icon="ri-error-warning-fill" />
          </div>
        </div>
      </div>
    </>
  )
}

// const timeoutPromise = (type: 'res' | 'rej', time = 3000) => {
//   return new Promise((res, rej) => {
//     setTimeout({res, rej}[type], time);
//   });
// }

const makeDummyPromise = (type: 'res' | 'rej', pushTask, time = 3000) => {
  const p = new Promise((res, rej) => {
    setTimeout({res, rej}[type], time);
  });
  pushTask(p)
}

export const LoadingGizmoTest: React.FC = () => {
  const pushTask = useContext(LoadingCtx);
  useRef(() => makeDummyPromise('res', pushTask));
  // useEffect(() => {
  //   pushTask(Promise.resolve())
  // }, [])
  
  return (
    <div>
      <button onClick={() => makeDummyPromise('res', pushTask)}>Fetch data</button><br />
      <button onClick={() => makeDummyPromise('rej', pushTask)}>Fetch data and fail</button>
    </div>
  )
}

const SpinningLoader = () => (
  <svg width="24" height="24" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
        <stop stopColor="#fff" stopOpacity="0" offset="0%" />
        <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
        <stop stopColor="#fff" offset="100%" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 1)">
        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth="2">
          {/* <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.9s"
            repeatCount="indefinite" /> */}
        </path>
        <circle fill="#ddd" cx="36" cy="18" r="1">
          {/* <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.9s"
            repeatCount="indefinite" /> */}
        </circle>
      </g>
    </g>
  </svg>
)