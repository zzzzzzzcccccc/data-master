import { Plugin } from 'vite'

type Options = {
  slot: string
  content: string
  enable?: boolean
}

export default function htmlSlotPlugin({ slot, content, enable = true }: Options): Plugin {
  return {
    name: 'html-slot-plugin',
    transformIndexHtml(html: string) {
      if (!enable) return html
      return html.replace(slot, content)
    },
  }
}
