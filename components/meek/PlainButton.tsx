import {keyframes} from '@emotion/react';
import React, {Dispatch, SetStateAction, useEffect, useMemo} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Icon} from './Icon';
import {StyleRoot} from './StyleRoot';

type UseStateSetter<T> = Dispatch<SetStateAction<T>>

type PlainButtonProps = {
  color?: {bg?: string, text?: string}
  isLoading?: unknown,
  isSuccess?: unknown,
  isError?: unknown,
  setSuccess?: UseStateSetter<boolean>,
  setError?: UseStateSetter<boolean>,
  onReset?: any,
  onClick?: () => any
}

type Extend<T> = T & {[key: string]: any};

const bounce = keyframes`
  from, to {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
`

const translateOutOfView = (dir: 'up' | 'down') => css`
  transform: translateY(${dir === 'up' ? '-30px' : '30px'});
  /* opacity: 0; */
`

const StatusIcon: React.FC<{shown: unknown, icon: string, rotate?: boolean}> = (props) => {
  const {shown, icon, rotate = false} = props;
  return (
    <StyleRoot {...props}>
      <div
        tw="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          tw="transition-all"
          css={[!shown && translateOutOfView('down'), shown ? tw`opacity-100` : tw`opacity-100`]}
        >
          <Icon
            css={[
              shown && rotate && css`
                animation: ${bounce} 1.5s ease infinite;
              `
            ]}
            icon={icon}
          />
        </div>
      </div>
    </StyleRoot>
  )
}

const useAutoReset = (cb: () => any, deps: React.DependencyList) => {
  useEffect(() => {
    if (deps.filter(x => x).length) setTimeout(() => {
      cb?.();
    }, 2000)
  }, deps)
}

export const PlainButton: React.FC<PlainButtonProps> = (props) => {
  const {
    color, isLoading, isSuccess, isError, onReset, onClick, children
  } = props;
  const showText = useMemo(() => !isLoading && !isSuccess && !isError, [isLoading, isSuccess, isError]);
  useAutoReset(onReset, [isSuccess, isError])

  return (
    <button
      tw="
        relative
        flex justify-center items-center
        px-3.5 py-1
        rounded
        bg-blue-700
        text-white
        overflow-hidden
        font-medium
        border-2 border-blue-700
        // ring-4 ring-pink-100
        transition-all
        focus:outline-none
        hover:(
          ring-4 ring-blue-200
        )
      "
      css={[
        !showText && tw`pointer-events-none bg-opacity-100`,
        css`
          color: ${color?.text};
          background-color: ${color?.bg};
        `
      ]}
      onClick={onClick}
    >
      <StatusIcon shown={isLoading} icon="ri-loader-2-line" rotate/>
      <StatusIcon shown={isSuccess} icon="ri-check-line" />
      <StatusIcon tw="text-xl" shown={isError} icon="ri-error-warning-fill" />
      <div
        tw="transition-all font-content"
        css={[!showText && tw`opacity-0`]}
      >
        {children}
      </div>
    </button>
  )
}