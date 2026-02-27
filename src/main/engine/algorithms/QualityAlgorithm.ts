import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

/**
 * Quality-based Algorithm
 * Combines physical signal strength with available bandwidth.
 * Seeks to maximize user's Quality of Experience (QoE) by avoiding congested base stations.
 */
export class QualityAlgorithm implements IHandoverAlgorithm {
    name = "Quality-based"
    description = "Maximizes performance by weighting signal strength and bandwidth."

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        let bestNetworkId: string | null = null
        let maxQualityScore = -Infinity

        for (const entry of availableNetworks) {
            // Simple quality score combining normalized RSSI and Bandwidth
            // RSSI normalized (-100 to -30 range) + Bandwidth importance
            const normalizedRSSI = (entry.metrics.rssi + 100) / 70 // approx 0.0 to 1.0
            const normalizedBW = entry.metrics.bandwidth / 100 // assuming 100Mbps max for normal range

            const qualityScore = (normalizedRSSI * 0.4) + (normalizedBW * 0.6)

            if (qualityScore > maxQualityScore) {
                maxQualityScore = qualityScore
                bestNetworkId = entry.network.id
            }
        }

        return bestNetworkId
    }
}
