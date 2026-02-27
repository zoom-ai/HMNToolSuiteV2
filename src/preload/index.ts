import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  saveScenario: (data: any) => ipcRenderer.invoke('scenario:save', data),
  openScenario: () => ipcRenderer.invoke('scenario:open'),
  startEngine: () => ipcRenderer.send('engine:start'),
  stopEngine: () => ipcRenderer.send('engine:stop'),
  setAlgorithm: (name: string) => ipcRenderer.send('engine:set-algorithm', name),
  onEngineUpdate: (callback: (data: any) => void) => {
    ipcRenderer.on('engine:update', (_event, value) => callback(value))
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
