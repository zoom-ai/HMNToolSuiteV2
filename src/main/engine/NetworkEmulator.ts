import { NetworkNode, MobileNode, IHandoverAlgorithm, HandoverMetrics } from './algorithms/IHandoverAlgorithm'

export class NetworkEmulator {
    networks: Map<string, NetworkNode> = new Map()
    mobileNodes: Map<string, MobileNode> = new Map()
    algorithm: IHandoverAlgorithm
    tickRateMs: number = 100
    intervalId: NodeJS.Timeout | null = null
    onUpdateCallback: (() => void) | null = null

    constructor(algorithm: IHandoverAlgorithm) {
        this.algorithm = algorithm
    }

    setAlgorithm(algorithm: IHandoverAlgorithm) {
        this.algorithm = algorithm
    }

    addNetwork(network: NetworkNode) {
        this.networks.set(network.id, network)
    }

    addMobileNode(node: MobileNode) {
        this.mobileNodes.set(node.id, node)
    }

    setOnUpdate(cb: () => void) {
        this.onUpdateCallback = cb
    }

    start() {
        if (this.intervalId) return
        this.intervalId = setInterval(() => this.tick(), this.tickRateMs)
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    private tick() {
        // 1. Move the mobile nodes along their path based on velocity
        for (const [_, node] of this.mobileNodes) {
            this.updateNodePosition(node)

            // 2. Evaluate handovers for each node
            this.evaluateHandover(node)
        }

        if (this.onUpdateCallback) this.onUpdateCallback()
    }

    private updateNodePosition(node: MobileNode) {
        if (!node.path || node.path.length === 0) return

        // Simplistic path following for demonstration
        // A full implementation would calculate distance = velocity * time
        const target = node.path[node.pathIndex]
        if (!target) return

        const dx = target.x - node.x
        const dy = target.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Move slightly towards target (e.g. 1 pixel per tick for now)
        const step = 2; // pixel speed per tick
        if (dist < step) {
            node.x = target.x
            node.y = target.y
            node.pathIndex++
            if (node.pathIndex >= node.path.length) {
                node.pathIndex = 0; // loop path for visual purposes
            }
        } else {
            node.x += (dx / dist) * step
            node.y += (dy / dist) * step
        }
    }

    private evaluateHandover(node: MobileNode) {
        const available = this.getAvailableNetworks(node)
        const bestId = this.algorithm.evaluate(node, available)
        if (bestId && bestId !== node.currentNetworkId) {
            console.log(`[Handover] Node ${node.name} changing from ${node.currentNetworkId} to ${bestId}`)
            node.currentNetworkId = bestId
        }
    }

    private getAvailableNetworks(node: MobileNode): { network: NetworkNode, metrics: HandoverMetrics }[] {
        const available: { network: NetworkNode, metrics: HandoverMetrics }[] = []

        for (const [_, net] of this.networks) {
            if (!node.supportedInterfaces.includes(net.type)) continue

            const dx = net.x - node.x
            const dy = net.y - node.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist <= net.coverageRadius) {
                // Calculate mock RSSI based on distance
                // Inner circle = near -40, outer boundary = -95
                const rssiRange = -40 - (-95)
                const ratio = 1 - (dist / net.coverageRadius)
                const rssi = -95 + (rssiRange * ratio)

                available.push({
                    network: net,
                    metrics: {
                        rssi: Math.min(-40, Math.max(-95, rssi)),
                        bandwidth: net.bandwidth,
                        cost: net.costRate,
                        power: net.powerConsumption
                    }
                })
            }
        }

        return available
    }
}
