import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

/**
 * Cost-based Algorithm
 * Prioritizes economic factors. It selects the network with the lowest cost per MB/Time.
 * Typically results in a preference for WLAN over Cellular networks.
 */
export class CostAlgorithm implements IHandoverAlgorithm {
    name = "Cost-based"
    description = "Prioritizes the most economical network (lowest service cost)."

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        let bestNetwork: string | null = null
        let minCost = Infinity

        for (const entry of availableNetworks) {
            if (entry.metrics.cost < minCost) {
                minCost = entry.metrics.cost
                bestNetwork = entry.network.id
            }
        }

        return bestNetwork
    }
}
