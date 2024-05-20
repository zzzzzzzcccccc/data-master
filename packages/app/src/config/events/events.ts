const EVENTS = {
  globalContentSizeChanged: 'globalContentSizeChanged',
} as const

export type EventName = keyof typeof EVENTS

class Events {
  public EVENTS = EVENTS

  private _events = new Map<string, Array<(...args: unknown[]) => void>>()

  public emit(name: EventName, ...args: unknown[]) {
    const handlers = this._events.get(name)
    if (handlers && handlers.length > 0) {
      handlers.forEach((handler) => handler(...args))
    }
  }

  public on(name: EventName, handler: (...args: unknown[]) => void) {
    const handlers = this._events.get(name) || []
    handlers.push(handler)
    this._events.set(name, handlers)
  }

  public off(name: EventName, handler: (...args: unknown[]) => void) {
    const handlers = this._events.get(name)
    if (handlers) {
      this._events.set(
        name,
        handlers.filter((item) => item !== handler),
      )
    }
  }
}

const events = new Events()

export default events
