import { Handle, Position } from '@xyflow/react'

export function MobileAccessNode({ data }: { data: any }) {
    // Animating based on data? React Flow handles the x/y position update.
    // The Mobile Node should stand out, like a sleek device with a glowing accent

    return (
        <div className="relative group cursor-grab active:cursor-grabbing">
            <div className="w-8 h-12 flex flex-col items-center justify-between py-1 rounded-md bg-neutral-800 shadow-2xl border border-neutral-600 text-white z-20 relative overflow-hidden ring-1 ring-white/10">
                <div className="w-3 h-0.5 bg-neutral-600 rounded-full mt-0.5" />

                {/* Screen */}
                <div className="w-6 h-8 bg-neutral-900 rounded-[2px] border border-neutral-700/50 flex items-center justify-center overflow-hidden relative">
                    {/* Current Network Indicator */}
                    {data.currentNetworkId ? (
                        <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                    ) : (
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                    )}
                </div>
            </div>

            {/* Name Tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold shadow-xl whitespace-nowrap z-30">
                {data.name}
            </div>

            <Handle type="source" position={Position.Bottom} className="w-0 h-0 opacity-0" />
            <Handle type="target" position={Position.Top} className="w-0 h-0 opacity-0" />
        </div>
    )
}
