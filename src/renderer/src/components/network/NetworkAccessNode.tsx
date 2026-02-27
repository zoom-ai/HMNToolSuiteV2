import { Handle, Position } from '@xyflow/react'

export function NetworkAccessNode({ data }: { data: any }) {
    const getColors = () => {
        switch (data.type) {
            case 'cdma': return 'from-red-500 to-red-600 shadow-red-500/50'
            case 'wlan': return 'from-emerald-400 to-emerald-600 shadow-emerald-500/50'
            case 'wimax': return 'from-amber-400 to-amber-600 shadow-amber-500/50'
            case 'hsdpa': return 'from-purple-500 to-purple-700 shadow-purple-500/50'
            default: return 'from-neutral-500 to-neutral-700 shadow-neutral-500/50'
        }
    }

    // Visualization of Coverage Radius
    const radius = data.coverageRadius || 100
    const d = radius * 2

    return (
        <div className="relative group">
            {/* Coverage Area SVG representation */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-20 bg-current pointer-events-none transition-all duration-500"
                style={{ width: d, height: d, color: `var(--color-${data.type === 'cdma' ? 'red' : 'emerald'}-400)` }}
            />

            {/* Node Itself */}
            <div className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br ${getColors()} shadow-xl border border-white/20 text-white z-10 relative cursor-pointer hover:scale-110 transition-transform`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
            </div>

            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {data.name}
            </div>

            <Handle type="source" position={Position.Bottom} className="w-0 h-0 opacity-0" />
            <Handle type="target" position={Position.Top} className="w-0 h-0 opacity-0" />
        </div>
    )
}
