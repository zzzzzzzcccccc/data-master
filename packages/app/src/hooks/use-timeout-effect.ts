import { useEffect, useRef, DependencyList } from 'react'

type CallBack = (() => void) | (() => () => void)

export default function useTimeoutEffect(fn: CallBack, deps: DependencyList = [], delay = 1000 / 60) {
  const fnRef = useRef(fn)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let unbind: ReturnType<CallBack> | null = null
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    timerRef.current = setTimeout(() => {
      unbind = fnRef.current()
    }, delay)

    return () => {
      clearTimer()
      unbind?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
