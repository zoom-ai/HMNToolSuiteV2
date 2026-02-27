import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

/**
 * Connection Lifetime Algorithm
 * Considers mobile node mobility.
 * Prefers networks that the user is moving towards or will stay in for the longest duration.
 * Reduces the number of unnecessary handovers in high-mobility scenarios.
 */
export class LifetimeAlgorithm implements IHandoverAlgorithm {
    name = "Lifetime-based"
    description = "Predicts connection duration to minimize unnecessary handovers."

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        let bestNetworkId: string | null = null
        let maxLifetimeValue = -Infinity

        for (const entry of availableNetworks) {
            const distance = Math.sqrt(
                Math.pow(mobileNode.x - entry.network.x, 2) +
                Math.pow(mobileNode.y - entry.network.y, 2)
            )

            // Estimated time until node leaves coverage (Coverage - current distance) / velocity
            // If velocity is 0, we just use the distance from center (closer is better)
            let lifetimeScore: number
            if (mobileNode.velocity > 0) {
                lifetimeScore = (entry.network.coverageRadius - distance) / mobileNode.velocity
            } else {
                lifetimeScore = entry.network.coverageRadius - distance
            }

            if (lifetimeScore > maxLifetimeValue) {
                maxLifetimeValue = lifetimeScore
                bestNetworkId = entry.network.id
            }
        }

        return bestNetworkId
    }
}
