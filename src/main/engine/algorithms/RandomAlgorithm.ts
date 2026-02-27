import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

/**
 * Random Handover Algorithm
 * Simply picks a random available network. 
 * Often used as a baseline to demonstrate the inefficiency of non-intelligent handover.
 */
export class RandomAlgorithm implements IHandoverAlgorithm {
    name = "Random (Baseline)"
    description = "Stochastically selects an available network regardless of quality."

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        // Pick random
        const index = Math.floor(Math.random() * availableNetworks.length)
        return availableNetworks[index].network.id
    }
}
