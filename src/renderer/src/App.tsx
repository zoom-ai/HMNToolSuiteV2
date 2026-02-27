import { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { Sidebar } from './components/Sidebar'
import { NetworkEditor } from './components/NetworkEditor'
import { MonitorView } from './components/MonitorView'

function App() {
  const [mockData, setMockData] = useState<any[]>([])
  const [nodesData, setNodesData] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  // Listen to backend engine tick
  useEffect(() => {
    if (window.api?.onEngineUpdate) {
      window.api.onEngineUpdate((state: any) => {
        setIsRunning(state.isRunning)
        setNodesData(state.nodes)

        // Mock update chart based on backend time for now
        setMockData(prev => {
          const time = Math.floor(state.timeMs / 1000)
          const newData = [...prev, {
            time: `${time}s`,
            rssi_cdma: -50 + Math.sin(time / 5) * 20,
            rssi_wlan: -90 + (time % 20) * 2,
            rssi_wimax: -70 + Math.cos(time / 4) * 10,
          }]
          if (newData.length > 50) return newData.slice(newData.length - 50)
          return newData
        })
      })
    }
  }, [])

  // Dummy data generator just for showing the UI works

  useEffect(() => {
    let time = 0
    const interval = setInterval(() => {
      time++
      setMockData(prev => {
        const newData = [...prev, {
          time: `${time}s`,
          rssi_cdma: -50 + Math.sin(time / 5) * 20,
          rssi_wlan: -90 + (time % 20) * 2,
          rssi_wimax: -70 + Math.cos(time / 4) * 10,
        }]
        if (newData.length > 50) return newData.slice(newData.length - 50)
        return newData
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Sidebar>
        <div className="bg-neutral-800 rounded p-3 border border-neutral-700">
          <label className="text-xs font-semibold text-neutral-400 mb-2 block uppercase tracking-wider">Handover Policy</label>
          <select className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-sm outline-none text-white focus:ring-1 focus:ring-blue-500">
            <option>Autonomic (APAV/APSV)</option>
            <option>Context-Aware</option>
            <option>Fuzzy Logic</option>
            <option>Random Baseline</option>
          </select>
        </div>

        <div className="bg-neutral-800 rounded p-3 border border-neutral-700">
          <label className="text-xs font-semibold text-neutral-400 mb-2 block uppercase tracking-wider">Simulation</label>
          <div className="flex gap-2">
            <button
              className={`flex-1 text-sm font-medium py-1.5 rounded transition ${isRunning ? 'bg-blue-900/50 text-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
              onClick={() => window.api.startEngine()}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className={`flex-1 text-sm font-medium py-1.5 rounded transition border ${!isRunning ? 'bg-red-900/10 text-red-900/50 border-red-900/20 cursor-not-allowed' : 'bg-red-900/50 hover:bg-red-900 text-red-100 border-red-800/50'}`}
              onClick={() => window.api.stopEngine()}
              disabled={!isRunning}
            >
              Stop
            </button>
          </div>
        </div>

        <div className="bg-neutral-800 rounded p-3 border border-neutral-700 mt-auto">
          <label className="text-xs font-semibold text-neutral-400 mb-2 block uppercase tracking-wider">Scenario File</label>
          <div className="flex gap-2">
            <button
              className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium py-1.5 rounded transition"
              onClick={async () => {
                const dummy = { version: '1.0', networks: [], mobileNodes: [] }
                await window.api.saveScenario(dummy)
              }}
            >
              Save
            </button>
            <button
              className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium py-1.5 rounded transition"
              onClick={async () => {
                const data = await window.api.openScenario()
                if (data) console.log('Loaded:', data)
              }}
            >
              Open
            </button>
          </div>
        </div>
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0">
        <NetworkEditor backendNodes={nodesData} />
        <MonitorView data={mockData} />
      </div>
    </Layout>
  )
}

export default App
