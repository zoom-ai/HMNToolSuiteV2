import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverMetrics } from './IHandoverAlgorithm'

export class AUHOAlgorithm implements IHandoverAlgorithm {
    name = 'AUHO (APAV+APSV)'
    description = 'The AUtonomic HandOver algorithm (APAV+APSV) from Dr. Joon-Myung Kang\'s PhD thesis (2011) and Computer Networks Journal.'

    evaluate(
        mobileNode: MobileNode,
        availableNetworks: { network: NetworkNode; metrics: HandoverMetrics }[]
    ): string | null {
        if (availableNetworks.length === 0) return null

        let bestScore = -Infinity
        let bestNetworkId: string | null = null

        for (const net of availableNetworks) {
            // Basic implementation of APAV score calculation (weighted sum)
            const wRssi = 0.4
            const wBw = 0.3
            const wCost = 0.2
            const wPower = 0.1

            // Normalize metrics roughly for the sake of the equation
            const nRssi = (net.metrics.rssi + 100) / 100 // assuming -100 to 0 dBm
            const nBw = net.metrics.bandwidth / 100 // assuming max 100 Mbps
            const nCost = 1 - (net.metrics.cost / 10) // lower cost is better
            const nPower = 1 - (net.metrics.power / 10) // lower power consumption is better

            const apavScore = (wRssi * nRssi) + (wBw * nBw) + (wCost * nCost) + (wPower * nPower)

            if (apavScore > bestScore) {
                bestScore = apavScore
                bestNetworkId = net.network.id
            }
        }

        return bestNetworkId
    }
}
