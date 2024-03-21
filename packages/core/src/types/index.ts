export interface DeviceInfo {
  platform: string
  electronVersion: string
  nodeVersion: string
  chromeVersion: string
}

export interface PreloadInjector {
  getDeviceInfo(): DeviceInfo
}
