class DatabaseClient<Configuration = object, Connection = unknown> {
  public invoke(method: string, ...args: unknown[]) {
    const methodInstance = this[method as keyof this]
    if (!methodInstance || typeof methodInstance !== 'function') {
      throw new Error(`DatabaseClient Method "${method}" not found`)
    } else {
      return methodInstance.apply(this, args)
    }
  }
  public testConnection(configuration: Configuration) {
    // TODO implement
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
