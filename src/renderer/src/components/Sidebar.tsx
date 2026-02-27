import { ReactNode } from 'react'

interface SidebarProps {
    children?: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
    return (
        <div className="w-80 h-full bg-neutral-900 border-r border-neutral-800 flex flex-col shadow-xl z-10 shrink-0">
            <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <h1 className="font-bold text-sm text-neutral-100 tracking-wide">HMNToolSuite<span className="text-blue-400">V2</span></h1>
                    <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mt-0.5">Network Emulator</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                {children}
            </div>
            <div className="p-4 border-t border-neutral-800 text-xs text-neutral-500 flex justify-between items-center bg-neutral-950/50 block">
                <span>POSTECH DP&NM</span>
                <span>v2.0.0</span>
            </div>
        </div>
    )
}
