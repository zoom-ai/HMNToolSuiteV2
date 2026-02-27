# HMNToolSuite V2 - Developer Guide

## 🧪 Extending the Tool with Custom Algorithms

The core philosophy of **HMNToolSuite V2** is modularity. We've designed the system so that researchers can easily implement, test, and compare new Handover Decision Algorithms without modifying the core simulation engine.

This guide explains how to create your own algorithm module and integrate it into the interactive environment.

---

## 🏗️ The Modular Architecture

The simulation engine (`NetworkEmulator`) is decoupled from the decision logic. It relies on the `IHandoverAlgorithm` interface to make decisions.

- **Interface**: `src/main/engine/algorithms/IHandoverAlgorithm.ts`
- **Engine**: `src/main/engine/NetworkEmulator.ts`
- **UI Registration**: `src/renderer/src/App.tsx` (Sidebar dropdown)

---

## 🛠️ Step-by-Step: Implementing a New Algorithm

### 1. Create the Algorithm Class
Create a new file in `src/main/engine/algorithms/` (e.g., `MyInnovationAlgorithm.ts`). Your class must implement the `IHandoverAlgorithm` interface.

```typescript
import { IHandoverAlgorithm, MobileNode, NetworkNode, HandoverDecision } from './IHandoverAlgorithm'

export class MyInnovationAlgorithm implements IHandoverAlgorithm {
  name = "My Innovation Algorithm"

  evaluate(mobileNode: MobileNode, availableNetworks: NetworkNode[]): HandoverDecision {
    // 1. Your Custom Logic Here
    // Example: Select the network with the lowest cost if signal > -80dBm
    
    let bestNetwork: NetworkNode | null = null
    let minCost = Infinity

    for (const network of availableNetworks) {
      const rssi = this.calculateRSSI(mobileNode, network) // Helper if needed
      
      if (rssi > -80 && network.cost < minCost) {
        minCost = network.cost
        bestNetwork = network
      }
    }

    // 2. Return the decision
    return {
      shouldHandover: bestNetwork !== null && bestNetwork.id !== mobileNode.currentNetworkId,
      targetNetworkId: bestNetwork?.id || null,
      reason: "Optimizing for cost while maintaining basic signal quality"
    }
  }

  // Helper method example
  private calculateRSSI(node: MobileNode, network: NetworkNode): number {
    // Port your own channel model here!
    return -50 // Mock value
  }
}
```

### 2. Register in the Main Process
Open `src/main/index.ts` and import your new algorithm. You can swap the default algorithm or add logic to switch them via IPC.

```typescript
// src/main/index.ts
import { MyInnovationAlgorithm } from './engine/algorithms/MyInnovationAlgorithm'

// Initialize the engine with your new algorithm
const myAlgorithm = new MyInnovationAlgorithm()
const engine = new NetworkEmulator(myAlgorithm)
```

### 3. Update the UI Dropdown
To let users select your algorithm from the sidebar, update the dropdown in `src/renderer/src/App.tsx`:

```tsx
// src/renderer/src/App.tsx
<select className="...">
  <option>Autonomic (APAV/APSV)</option>
  <option>My Innovation Algorithm</option> {/* Add this line */}
  <option>Context-Aware</option>
  <option>Random Baseline</option>
</select>
```

---

## 📊 Testing Your Algorithm

### Unit Testing
We use **Vitest** for testing. Create a test file in `src/main/engine/algorithms/__tests__/MyInnovation.test.ts`:

```typescript
import { expect, test } from 'vitest'
import { MyInnovationAlgorithm } from '../MyInnovationAlgorithm'

test('should stay on current network if signal is good', () => {
  const algo = new MyInnovationAlgorithm()
  const decision = algo.evaluate(mockMobileNode, mockNetworks)
  expect(decision.shouldHandover).toBe(false)
})
```
Run tests with: `npm run test`

### Visual Verification
1. Run the app: `npm run dev`
2. Select your algorithm from the sidebar.
3. Observe the **Monitor View** and node movement.
4. Verify that handover events occur according to your logic (e.g., when cost drops or signal fluctuates).

---

## 💡 Best Practices for Researchers

1.  **Use Context Information**: Leverage the `MobileNode` object's speed, battery level, and location for more "intelligent" decisions.
2.  **Modular Math**: Keep your math formulas in helper methods within the class to make them readable.
3.  **Logging**: Pulse your decision reasons into the `HandoverDecision.reason` field so they can be displayed in future log views.

---

## 🔗 References
- [IHandoverAlgorithm Interface](../../src/main/engine/algorithms/IHandoverAlgorithm.ts)
- [Example: ApavAlgorithm.ts](../../src/main/engine/algorithms/ApavAlgorithm.ts)
