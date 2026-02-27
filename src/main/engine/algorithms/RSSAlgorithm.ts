import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

/**
 * RSS (Received Signal Strength) Algorithm
 * The traditional method used in most legacy networks.
 * Always selects the access point with the strongest signal level.
 */
export class RSSAlgorithm implements IHandoverAlgorithm {
    name = "RSS-based"
    description = "Selects the network with the strongest signal strength (RSSI)."

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        let bestNetwork: string | null = null
        let maxRSSI = -Infinity

        for (const entry of availableNetworks) {
            if (entry.metrics.rssi > maxRSSI) {
                maxRSSI = entry.metrics.rssi
                bestNetwork = entry.network.id
            }
        }

        return bestNetwork
    }
}
