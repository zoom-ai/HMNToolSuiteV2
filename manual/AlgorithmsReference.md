# HMNToolSuite V2 - Handover Algorithms Reference

This document provides a detailed explanation of the five reference handover decision algorithms implemented for comparison against the **AUHO (APAV + APSV)** algorithm.

---

## 1. Random (Baseline)
- **Logic**: Stochastically selects any available network from the detected list.
- **Purpose**: Serves as a "worst-case" control group. It demonstrates how a lack of intelligent selection leads to frequent, unnecessary handovers and poor connectivity.
- **Research Use**: Used to establish a baseline for "Number of Handovers" and "Average Throughput" metrics.

## 2. RSS-based (Traditional)
- **Logic**: Always selects the Access Point (AP) with the highest **Received Signal Strength Indicator (RSSI)**.
- **Strengths**: Simple to implement; ensures the device is connected to the strongest physical signal.
- **Weaknesses**: Prone to the **"Ping-Pong" effect** at cell boundaries where two signals are nearly equal. Does not consider network load or service cost.

## 3. Cost-based (Economic)
- **Logic**: Prioritizes the network with the lowest service cost per MB or time unit.
- **Use Case**: Users who want to minimize data charges (e.g., preferring free WLAN over paid 4G/5G).
- **Strengths**: Significant cost savings.
- **Weaknesses**: May lead to staying on a very weak, congested, or slow network simply because it is cheaper.

## 4. Quality-based (Performance)
- **Logic**: A multi-criteria approach that weights both **RSSI** and **Available Bandwidth**.
- **Formula**: $Score = (0.4 \times RSSI_{norm}) + (0.6 \times Bandwidth_{norm})$
- **Strengths**: Better Quality of Experience (QoE) as it avoids base stations that have strong signals but are congested (low available bandwidth).

## 5. Lifetime-based (Mobility-Aware)
- **Logic**: Predicts how long the mobile device will stay within the coverage of a specific network based on its current position and velocity.
- **Strengths**: Drastically reduces unnecessary handovers for high-speed users (e.g., moving in a car) by ignoring small WLAN cells that would only provide coverage for a few seconds.
- **Metric**: $\text{Estimated Lifetime} = \frac{\text{CoverageRadius} - \text{CurrentDistance}}{\text{Velocity}}$

---

## 🚀 How to Compare
To conduct a comparative study:
1.  Open the **Network Map Editor**.
2.  Create a scenario with overlapping WLAN (Small/Fast/Free) and CDMA (Large/Slow/Paid) networks.
3.  Place a **Mobile Node** and assign a path that crosses these zones.
4.  Run the simulation multiple times, switching the **Handover Policy** in the sidebar for each run.
5.  Analyze the results in the **Monitor View** to see how metrics like "Average Cost" and "Handover Count" differ between policies.

---

## 🔗 Related Documentation
- [System Design Doc](../design/SystemDesign.md)
- [Developer Guide (Adding Your Own)](DeveloperGuide.md)
