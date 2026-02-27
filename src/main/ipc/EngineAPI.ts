import { NetworkNode, MobileNode } from '../engine/algorithms/IHandoverAlgorithm'

export interface SimulationState {
    timeMs: number
    isRunning: boolean
    nodes: MobileNode[]
    networks: NetworkNode[]
    logs: string[]
    metrics: {
        time: string
        [key: string]: string | number
    }[]
}

/**
 * Exposes commands from Renderer -> Main
 */
export interface BackendEngineAPI {
    startSimulation: () => Promise<void>
    stopSimulation: () => Promise<void>
    updateScenario: (networks: NetworkNode[], mobileNodes: MobileNode[]) => Promise<void>
    setAlgorithm: (algorithmName: string) => Promise<void>

    // Handlers for Renderer to listen to
    onSimulationUpdate: (callback: (state: SimulationState) => void) => void
}
