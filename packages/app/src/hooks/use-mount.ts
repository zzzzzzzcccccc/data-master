import { useEffect, useRef } from 'react'

type CallBack = (() => void) | (() => () => void)

export default function useMount(fn: CallBack) {
  const mountedRef = useRef(fn)

  useEffect(() => {
    const unbind = mountedRef.current?.()

    return () => {
      unbind?.()
    }
  }, [])

  return {
    mountedRef,
  }
}
