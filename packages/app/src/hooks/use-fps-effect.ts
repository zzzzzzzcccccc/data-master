import { useEffect, useRef } from 'react'

type Callback = () => void | (() => void)

export default function useFpsEffect(fn: Callback) {
  const fnRef = useRef(fn)

  useEffect(() => {
    let unbind: ReturnType<Callback> | undefined

    const timer = setTimeout(() => {
      unbind = fnRef.current()
    }, 1000 / 60)

    return () => {
      clearTimeout(timer)
      unbind?.()
    }
  }, [])
}
