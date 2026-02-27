import { dialog } from 'electron'
import fs from 'fs/promises'
import { NetworkNode, MobileNode } from '../engine/algorithms/IHandoverAlgorithm'

export interface ScenarioData {
    version: string
    networks: NetworkNode[]
    mobileNodes: MobileNode[]
}

export class ScenarioManager {
    static async saveScenario(data: ScenarioData): Promise<boolean> {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: 'Save Network Scenario',
            defaultPath: 'scenario.json',
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        })

        if (canceled || !filePath) return false

        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
            return true
        } catch (error) {
            console.error('Failed to save scenario', error)
            return false
        }
    }

    static async openScenario(): Promise<ScenarioData | null> {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            title: 'Open Network Scenario',
            properties: ['openFile'],
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        })

        if (canceled || filePaths.length === 0) return null

        try {
            const content = await fs.readFile(filePaths[0], 'utf-8')
            const data = JSON.parse(content) as ScenarioData
            return data
        } catch (error) {
            console.error('Failed to load scenario', error)
            return null
        }
    }
}
