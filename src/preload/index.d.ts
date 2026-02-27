import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      saveScenario: (data: any) => Promise<boolean>
      openScenario: () => Promise<any>
      startEngine: () => void
      stopEngine: () => void
      onEngineUpdate: (callback: (data: any) => void) => void
    }
  }
}
