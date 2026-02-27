export interface NetworkNode {
    id: string
    type: 'cdma' | 'wlan' | 'wimax' | 'hsdpa'
    name: string
    x: number
    y: number
    coverageRadius: number
    bandwidth: number // Mbps
    costRate: number
    powerConsumption: number
}

export interface MobileNode {
    id: string
    name: string
    x: number
    y: number
    velocity: number // km/h
    supportedInterfaces: string[]
    currentNetworkId: string | null
    path: { x: number; y: number }[]
    pathIndex: number
}

export interface HandoverMetrics {
    rssi: number // Received Signal Strength
    bandwidth: number
    cost: number
    power: number
}

export interface IHandoverAlgorithm {
    name: string
    description: string

    /**
     * Evaluates available networks and returns the ID of the best network to handover to (or stay on).
     */
    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null
}
