import { CSS_VARS_NAME_SPACE } from '@dm/core'
import configs from './css-configs'

export default function cssVars<Element extends HTMLElement>(target: Element) {
  Object.entries(configs).forEach(([key, value]) => {
    target.style.setProperty(`${CSS_VARS_NAME_SPACE}-${key}`, value)
  })
}
