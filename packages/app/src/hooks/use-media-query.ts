import { useState, useEffect, useRef } from 'react'

export default function useMediaQuery(target: string) {
  const [enable, setEnable] = useState(false)
  const queryRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    if (!window.matchMedia) return

    queryRef.current = window.matchMedia(target)

    const handler = () => setEnable(!!queryRef.current?.matches)

    handler()

    queryRef.current?.addEventListener('change', handler)

    return () => {
      queryRef.current?.removeEventListener('change', handler)
    }
  }, [target])

  return {
    enable,
    queryRef,
  }
}
