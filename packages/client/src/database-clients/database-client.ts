class DatabaseClient {
  public invoke(method: string, ...args: unknown[]) {
    const methodInstance = this[method as keyof this]
    if (!methodInstance || typeof methodInstance !== 'function') {
      throw new Error(`DatabaseClient Method "${method}" not found`)
    } else {
      return methodInstance.apply(this, args)
    }
  }
}

export default DatabaseClient
