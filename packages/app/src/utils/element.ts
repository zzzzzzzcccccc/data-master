export function getElementOffsetWidthHeight<Element extends HTMLElement>(el: Element): [number, number] {
  if (!el) {
    return [0, 0]
  }
  return [el.offsetWidth, el.offsetHeight]
}
