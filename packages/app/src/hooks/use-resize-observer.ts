import { MutableRefObject, useLayoutEffect, useEffect, useRef } from 'react'
import { getElementOffsetWidthHeight } from '../utils'

function useResizeObserver<Element extends HTMLElement | null>(
  elementRef: MutableRefObject<Element>,
  onChange?: (payload: [number, number]) => void,
  enableLayoutEffect = true,
) {
  const onChangeRef = useRef(onChange)
  const targetEffect = enableLayoutEffect ? useLayoutEffect : useEffect

  targetEffect(() => {
    if (!elementRef.current) return
    const target = elementRef.current
    const ro = new ResizeObserver(() => {
      onChangeRef.current?.(getElementOffsetWidthHeight(target))
    })
    ro.observe(target)
    return () => {
      ro.disconnect()
    }
  }, [elementRef])
}

export default useResizeObserver
