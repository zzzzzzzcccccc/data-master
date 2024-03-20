import * as electron from 'electron'
import * as path from 'path'
import * as process from 'process'

class Client {
  private _isRunning = false
  private _mainWindow: electron.BrowserWindow | null = null
  private _unListener: (() => void) | null = null

  public init() {
    if (this._isRunning) {
      throw new Error('Client is already running')
    }
    this._isRunning = true
    this._unListener = this.listener()
  }

  private createWindow() {
    if (!this._mainWindow) {
      this._mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          javascript: true,
          nodeIntegration: true,
        },
      })
      this._mainWindow.webContents.openDevTools()
    }
    return this._mainWindow
  }

  private listener() {
    const boundReady = this.appOnReady.bind(this)
    const boundActivate = this.appOnActivate.bind(this)
    const boundWindowAllClosed = this.appOnWindowAllClosed.bind(this)

    electron.app.on('ready', boundReady)
    electron.app.on('activate', boundActivate)
    electron.app.on('window-all-closed', boundWindowAllClosed)

    return () => {
      electron.app.off('ready', boundReady)
      electron.app.off('activate', boundActivate)
      electron.app.off('window-all-closed', boundWindowAllClosed)
    }
  }

  private appOnReady() {
    const window = this.createWindow()

    window.on('close', (event) => {
      event.preventDefault()
      if (this.isDarwin) {
        window.isVisible() ? window.hide() : electron.app.exit()
      } else {
        electron.app.exit()
      }
    })

    window.loadURL(`http://localhost:3333`)
  }

  private appOnActivate() {
    if (this._isRunning && this._mainWindow) {
      this._mainWindow.show()
    } else {
      this._unListener?.()
      this._mainWindow = null
      this._isRunning = false
      this.init()
    }
  }

  private appOnWindowAllClosed() {
    if (!this.isDarwin) {
      electron.app.quit()
    }
  }

  get isDarwin() {
    return process.platform === 'darwin'
  }
}

const client = new Client()

export default client
