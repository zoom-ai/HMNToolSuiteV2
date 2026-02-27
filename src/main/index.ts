import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { ScenarioManager } from './io/ScenarioManager'
import { NetworkEmulator } from './engine/NetworkEmulator'
import { ApavAlgorithm } from './engine/algorithms/ApavAlgorithm'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Global Backend Engine Instance
  const defaultAlgorithm = new ApavAlgorithm()
  const engine = new NetworkEmulator(defaultAlgorithm)

  // IPC Handlers
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('scenario:save', async (_, data) => {
    return await ScenarioManager.saveScenario(data)
  })
  ipcMain.handle('scenario:open', async () => {
    return await ScenarioManager.openScenario()
  })

  ipcMain.on('engine:start', () => engine.start())
  ipcMain.on('engine:stop', () => engine.stop())

  // Wire up the engine update tick to send state back to all WebContents (renderers)
  engine.setOnUpdate(() => {
    const wins = BrowserWindow.getAllWindows()
    // For simplicity, just send the mobile nodes state back
    const nodeState = Array.from(engine.mobileNodes.values())
    wins.forEach(w => {
      w.webContents.send('engine:update', {
        timeMs: Date.now(),
        isRunning: engine.intervalId !== null,
        nodes: nodeState
      })
    })
  })

  // Start with a dummy test node if needed (remove in production)
  // engine.addMobileNode({ id: 'm1', name: 'Mobile 1', x: 50, y: 50, velocity: 10, currentNetworkId: null, supportedInterfaces: ['cdma', 'wlan'], path: [{x:200, y:200}], pathIndex: 0 })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
