import { useState, useRef, useMemo, useCallback } from 'react'
import { debounce } from 'lodash-es'

export function useInheritedState<T>(inheritedState: T) {
  const memoInheritedStateRef = useRef(inheritedState)

  const [value, setValue] = useState(memoInheritedStateRef.current)

  const nextInheritedState = inheritedState
  if (memoInheritedStateRef.current !== nextInheritedState) {
    setValue(nextInheritedState)
    memoInheritedStateRef.current = nextInheritedState
  }

  return [value, setValue] as const
}

export function useDebounceFunc<T extends (...args: any[]) => void>(
  fn: T,
  time: number,
) {
  const cbRef = useRef(fn)
  if (cbRef.current !== fn) {
    cbRef.current = fn
  }

  const fnRef = useRef((...params: Parameters<T>) => {
    cbRef.current(...params)
  })

  return useCallback(debounce(fnRef.current, time), [])
}
