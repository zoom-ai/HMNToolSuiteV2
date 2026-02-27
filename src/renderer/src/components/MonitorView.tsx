import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function MonitorView({ data }: { data: any[] }) {
    // Mock data structure: { time: '10s', rssi_cdma: -60, rssi_wlan: -80, current_network: 'CDMA' }

    return (
        <div className="w-full h-64 bg-neutral-900 border-t border-neutral-800 p-4 shrink-0 flex flex-col z-10 shadow-2xl relative">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-neutral-300">Live Simulation Monitor</h2>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-400"></div> CDMA Signal</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-400"></div> WLAN Signal</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-amber-400"></div> WiMax Signal</div>
                </div>
            </div>

            <div className="flex-1 w-full relative -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="time" stroke="#666" fontSize={11} tickMargin={10} />
                        <YAxis stroke="#666" fontSize={11} domain={[-100, -30]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#e5e5e5', borderRadius: '8px', fontSize: '12px' }}
                            itemStyle={{ color: '#e5e5e5' }}
                        />
                        {/* The actual lines */}
                        <Line type="monotone" dataKey="rssi_cdma" stroke="#f87171" strokeWidth={2} dot={false} isAnimationActive={false} />
                        <Line type="monotone" dataKey="rssi_wlan" stroke="#34d399" strokeWidth={2} dot={false} isAnimationActive={false} />
                        <Line type="monotone" dataKey="rssi_wimax" stroke="#fbbf24" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
