class DatabaseClient<Configuration = object, Connection = unknown> {
  private readonly _name: string = ''

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  public invokeMethod(method: string, ...args: unknown[]) {
    const methodInstance = this[method as keyof this]
    if (!methodInstance || typeof methodInstance !== 'function') {
      throw new Error(`DatabaseClient Method "${method}" not found`)
    } else {
      return methodInstance(...args)
    }
  }

  public connection(configuration: Configuration, autoDisConnection = true) {
    // TODO implement
  }

  public disconnection(connection: Connection) {
    // TODO implement
  }

  public getTables(configuration: Configuration) {
    // TODO implement
  }
}

export default DatabaseClient
