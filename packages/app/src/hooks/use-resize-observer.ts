import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import { getElementOffsetWidthHeight } from '../utils'

function useResizeObserver<Element extends HTMLElement | null>(
  elementRef: MutableRefObject<Element>,
  onChange?: (payload: [number, number]) => void,
) {
  const onChangeRef = useRef(onChange)

  useLayoutEffect(() => {
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
