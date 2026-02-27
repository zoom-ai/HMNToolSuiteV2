import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen w-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
            {children}
        </div>
    )
}
