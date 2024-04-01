import * as electron from 'electron'
import * as path from 'path'
import {
  DARWIN,
  WIN32,
  ELECTRON_APP_EVENT_NAME,
  ELECTRON_WINDOW_EVENT_NAME,
  APP_NAME,
  DEFAULT_MAIN_WINDOW_LAYOUT,
} from '@db-gui/core'
import { rendererListener } from './renderer'
import { logger } from './utils'

class Client {
  private _isRunning = false
  private _mainWindow: electron.BrowserWindow | null = null
  private _unListener: (() => void) | null = null

  public init() {
    if (!this._isRunning) {
      this._isRunning = true
      this._unListener = this.listener()
      rendererListener.init()
    }
  }

  private createWindow() {
    if (!this._mainWindow) {
      const options: electron.BrowserWindowConstructorOptions = {
        title: APP_NAME,
        ...DEFAULT_MAIN_WINDOW_LAYOUT,
        useContentSize: true,
        titleBarStyle: this.isWin32 ? 'hidden' : 'hiddenInset',
        show: false,
        frame: false,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          javascript: true,
          nodeIntegration: false,
        },
      }
      electron.Menu.setApplicationMenu(null)

      this._mainWindow = new electron.BrowserWindow(options)
      logger.info(`Create main window with options = ${JSON.stringify(options)}`)
    }

    return this._mainWindow
  }

  private listener() {
    const boundReady = this.appOnReady.bind(this)
    const boundActivate = this.appOnActivate.bind(this)
    const boundBeforeQuit = this.appOnBeforeQuit.bind(this)
    const boundWindowAllClosed = this.appOnWindowAllClosed.bind(this)

    electron.app.on(ELECTRON_APP_EVENT_NAME.ready, boundReady)
    electron.app.on(ELECTRON_APP_EVENT_NAME.activate, boundActivate)
    electron.app.on(ELECTRON_APP_EVENT_NAME.beforeQuit, boundBeforeQuit)
    electron.app.on(ELECTRON_APP_EVENT_NAME.windowAllClosed, boundWindowAllClosed)

    return () => {
      boundReady?.()
      electron.app.off(ELECTRON_APP_EVENT_NAME.ready, boundReady)
      electron.app.off(ELECTRON_APP_EVENT_NAME.activate, boundActivate)
      electron.app.off(ELECTRON_APP_EVENT_NAME.beforeQuit, boundBeforeQuit)
      electron.app.off(ELECTRON_APP_EVENT_NAME.windowAllClosed, boundWindowAllClosed)
    }
  }

  private appOnReady() {
    logger.info('App on ready')

    const window = this.createWindow()
    const boundReadyToShow = this.mainWindowOnReadyToShow.bind(this)
    const boundClose = this.mainWindowOnClose.bind(this)

    window.on(ELECTRON_WINDOW_EVENT_NAME.readyToShow, boundReadyToShow)
    window.on(ELECTRON_WINDOW_EVENT_NAME.close, boundClose)

    window.webContents.openDevTools()
    window.loadURL(`http://localhost:3333`)

    return () => {
      window.off(ELECTRON_WINDOW_EVENT_NAME.readyToShow, boundReadyToShow)
      window.off(ELECTRON_WINDOW_EVENT_NAME.close, boundClose)
    }
  }

  private appOnActivate() {
    logger.info('App on activate')

    if (this._isRunning && this._mainWindow) {
      this._mainWindow.show()
    } else {
      this.init()
    }
  }

  private appOnBeforeQuit() {
    logger.info('App on before quit')

    this.destroy()
    electron.app.exit()
  }

  private appOnWindowAllClosed() {
    logger.info('App on window all closed')

    if (!this.isDarwin) {
      electron.app.quit()
    }
  }

  private mainWindowOnReadyToShow() {
    logger.info('Main window on ready to show')

    this._mainWindow?.show()
  }

  private mainWindowOnClose(event: electron.Event) {
    logger.info('Main window on close')

    if (this.isDarwin) {
      if (!event.defaultPrevented) {
        event.preventDefault()
        this._mainWindow?.isVisible() ? this._mainWindow?.hide() : electron.app.exit()
      }
    } else {
      electron.app.quit()
    }
  }

  private destroy() {
    rendererListener.destroy()
    this._unListener?.()
    this._mainWindow = null
    this._isRunning = false
    this._unListener = null
  }

  get isDarwin() {
    return process.platform === DARWIN
  }

  get isWin32() {
    return process.platform === WIN32
  }
}

const client = new Client()

export default client
