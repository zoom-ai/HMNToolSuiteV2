<div align="center">

# 🌐 HMNToolSuite V2

### Heterogeneous Mobile Networks Simulator & Emulator (Next-Gen)

*A modernized, high-performance research platform for studying Vertical Handover (VHO) in heterogeneous wireless network environments.*

[![Framework](https://img.shields.io/badge/Framework-Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://electronjs.org/)
[![UI Library](https://img.shields.io/badge/UI-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Award](https://img.shields.io/badge/Award-Best_Paper_CNS'11-FFD700?style=for-the-badge&logo=award&logoColor=black)](https://ecse.postech.ac.kr/dr-joon-myung-kang-was-awarded-the-best-paper-award-at-cns11/)
[![POSTECH](https://img.shields.io/badge/POSTECH-DP%26NM-003580?style=for-the-badge)](http://dpnm.postech.ac.kr)

</div>

---

## 📖 Overview

**HMNToolSuite V2** is the next-generation rebuild of the classic Java-based HMNToolSuite. Originally developed at **POSTECH DP&NM** for studying **Vertical Handover (VHO)**, this new version brings the power of modern web technologies to a desktop application. It allows researchers to seamlessly design, simulate, and visually emulate mobile devices transitioning between different wireless network technologies (e.g., WLAN, CDMA, WiBro/WiMax) while maintaining active sessions.

---

## ✨ Key Features

### 🎨 Modern & Premium GUI
- **Glassmorphic Design**: A sleek, dark-mode first interface giving a premium research experience.
- **Interactive Topology Editor**: Powered by **React Flow**, drag-and-drop cell towers and mobile nodes to build your exact simulation scenario.

### 📡 Heterogeneous Network Simulation
Simulate environments consisting of various network types, each with distinctive characteristics:
- 🛜 **WLAN** (IEEE 802.11)
- 📶 **CDMA** (IS-95)
- 🌀 **WiBro / Mobile WiMax** (IEEE 802.16e)
- ⚡ **HSDPA** (3GPP)

### 🧠 Extensible Handover Logic
A strictly typed, modular architecture via `IHandoverAlgorithm` enabling easy plug-and-play for:
- 🤖 **Autonomic Handover** (APAV/APSV scoring)
- 🧩 **Context-Aware Handover**
- 🌫️ **Fuzzy Logic Engine** (Planned)
- 🎲 **Random Baseline**

### 📊 Real-time Monitoring & Analysis
- View live simulation data with **Recharts** integrations.
- Monitor metrics like Received Signal Strength (RSSI), bandwidth, latency, and power consumption as mobile users move dynamically across coverage zones.

---

## 🛠️ Technology Stack

We transitioned from the aging Java Swing ecosystem to a fast, reliable, and modern desktop stack:

| Technology | Purpose |
| :--- | :--- |
| **Electron** & **Vite** | Lightning-fast Desktop scaffolding and native OS integrations (File System, IPC). |
| **React** | Robust component-based UI rendering. |
| **TypeScript** | Ensuring strict type safety across algorithms and UI states. |
| **Tailwind CSS v4** | Rapid, utility-first styling for beautiful components without writing heavy custom CSS. |
| **React Flow** | Interactive, node-based canvas for the Network Editor. |
| **Recharts** | Rendering high-performance, real-time metric graphs during simulation. |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/zoom-ai/HMNToolSuiteV2.git
cd HMNToolSuiteV2
npm install
```

### Development
Start the application in development mode with Hot-Module Replacement (HMR):
```bash
npm run dev
```

### Build for Production
Create an executable for your OS:
```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

---

## 📜 Core Research

> [!IMPORTANT]
> 🏆 **Winner of the Best Paper Award at CNS '11**  
> This project is recognized for its contribution to mobility management in heterogeneous networks.

This tool suite is based on the research presented in:

> **HMNToolSuite: Tool Support for Mobility Management of Mobile Devices in Heterogeneous Mobile Networks**  
> *Joon-Myung Kang, Sin-seok Seo, John Strassner, and James Won-Ki Hong*  
> Published in: **CNS '11**: Proceedings of the 14th Communications and Networking Symposium, April 2011.

### Abstract
As mobile devices grow and networks become heterogeneous, mobility management at the application layer (Layer 7) becomes critical. Unlike traditional simulators that focus on Layer 2/3 protocols, **HMNToolSuite** focuses on handover decisions and access network selection to satisfy user demands based on context information (location, speed, cost, etc.).

📄 **Read the full paper**: [paper/HMNToolSuite.pdf](paper/HMNToolSuite.pdf)

---

## 🔗 Related Projects

- [HMNToolSuite (v1)](https://github.com/zoom-ai/HMNToolSuite) - The original Java-based implementation.

---

## 📂 Project Architecture

For a detailed look at the software architecture, component design, and research principles, please see the [**System Design Document**](design/SystemDesign.md).

- `src/main/` - Electron backend containing the `NetworkEmulator`, `ScenarioManager`, and Node.js-based VHO logic.
- `src/renderer/` - The React application, containing components like `NetworkEditor`, `MonitorView`, and the layout/styling.
- `src/preload/` - IPC bridges safely securely exposing backend APIs to the React frontend.
- `design/` - High-level system architecture and design principles.
- `paper/` - Original research documentation.

---

## 👤 Credits

Originally developed and researched by **Eliot J.M. Kang** at [**POSTECH DP&NM Lab**](http://dpnm.postech.ac.kr).
Rebuilt and modernized for current technological standards.

> 📄 For core algorithmic details, refer to the [original research paper](paper/HMNToolSuite.pdf) outlining Autonomic Handover Decisions.
