import * as electron from 'electron'
import * as path from 'path'

class Client {
  private isRunning = false
  private _mainWindow: electron.BrowserWindow | null = null

  public init() {
    if (this.isRunning) {
      throw new Error('Client is already running')
    }
    this.isRunning = true
    this.listener()
  }

  private createWindow() {
    if (!this._mainWindow) {
      this._mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
        },
      })
    }
    return this._mainWindow
  }

  private listener() {
    const boundReady = this.appOnReady.bind(this)
    const boundWindowAllClosed = this.appOnWindowAllClosed.bind(this)

    electron.app.on('ready', boundReady)
    electron.app.on('window-all-closed', boundWindowAllClosed)

    return () => {
      electron.app.off('ready', boundReady)
      electron.app.off('window-all-closed', boundWindowAllClosed)
    }
  }

  private appOnReady() {
    const window = this.createWindow()

    window.on('closed', () => {
      this._mainWindow = null
    })

    window.loadURL(`http://localhost:3333/macos.html`)
  }

  private appOnWindowAllClosed() {}
}

const client = new Client()

export default client
