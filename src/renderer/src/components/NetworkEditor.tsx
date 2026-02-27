import { useState, useCallback, useEffect } from 'react'
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange,
    Node,
    Edge
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { NetworkAccessNode } from './network/NetworkAccessNode'
import { MobileAccessNode } from './network/MobileAccessNode'

const componentTypes = {
    network: NetworkAccessNode,
    mobile: MobileAccessNode
}

export function NetworkEditor({ backendNodes = [] }: { backendNodes?: any[] }) {
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])

    // Sync backend nodes with React Flow nodes visually
    useEffect(() => {
        if (!backendNodes || backendNodes.length === 0) return

        setNodes(prev => {
            const newNodes = [...prev]
            backendNodes.forEach(bNode => {
                const existing = newNodes.find(n => n.id === bNode.id)
                if (existing) {
                    existing.position = { x: bNode.x, y: bNode.y }
                    existing.data = { ...existing.data, currentNetworkId: bNode.currentNetworkId }
                } else {
                    newNodes.push({
                        id: bNode.id,
                        type: 'mobile',
                        position: { x: bNode.x, y: bNode.y },
                        data: { name: bNode.name, currentNetworkId: bNode.currentNetworkId }
                    })
                }
            })
            return newNodes
        })
    }, [backendNodes])

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    )

    return (
        <div className="flex-1 h-full w-full bg-neutral-950 relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={componentTypes}
                fitView
                className="w-full h-full"
                proOptions={{ hideAttribution: true }}
            >
                <Background gap={24} size={2} color="#262626" />
                <Controls showInteractive={false} />
            </ReactFlow>

            {/* Editor specific overlay UI (Floating Add Buttons) */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <button
                    className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-300 rounded shadow hover:bg-neutral-800 transition-colors"
                    onClick={() => {
                        const newNode = {
                            id: `net-${Date.now()}`,
                            type: 'network',
                            position: { x: Math.random() * 200, y: Math.random() * 200 },
                            data: { name: 'CDMA BS1', type: 'cdma', coverageRadius: 150 }
                        }
                        setNodes((nds) => [...nds, newNode])
                    }}
                >
                    + Add Access Network
                </button>
                <button
                    className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-300 rounded shadow hover:bg-neutral-800 transition-colors"
                    onClick={() => {
                        const newNode = {
                            id: `mob-${Date.now()}`,
                            type: 'mobile',
                            position: { x: Math.random() * 200, y: Math.random() * 200 },
                            data: { name: 'Mobile Node 1', currentNetworkId: null }
                        }
                        setNodes((nds) => [...nds, newNode])
                    }}
                >
                    + Add Mobile Node
                </button>
            </div>
        </div>
    )
}
