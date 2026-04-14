# VITAL-TAG 🐖📡

> **Predictive Edge-AI for Livestock Health Command Center**

VITAL-TAG is an advanced IoT and Edge-AI platform designed to monitor microscopic shifts in livestock vitals. By tracking jaw rhythm, body temperature, and heart rate, the system detects viral outbreaks up to **72 hours before visible symptoms** appear. Isolating sick animals early saves farmers significant time and money while preventing herd-wide disease spread.

---

## ✨ Core Features

- **🧠 Jaw Rhythm AI:** A micro-accelerometer tracks feeding patterns at 50Hz. A drop below 0.8 Hz triggers an early warning—up to 48 hours before visible lethargy.
- **🌡️ Fever Detection:** Continuous thermistor monitoring with ±0.1°C precision. The Edge-AI baseline calibrates per-animal, detecting fever onset at 39.5°C.
- **🫀 Pulse Monitoring:** Piezoelectric pulse sensor tracks heart rate variability to create a multi-signal diagnostic for viral infection detection.
- **⚡ Edge-AI Processing:** Powered by TensorFlow Lite Micro running on the ESP32-S3, achieving 97.2% model accuracy with inference processed directly on-device in <200ms.
- **📡 LoRa Connectivity:** Transmits compressed alerts over a 2km range using a LoRa SX1276 module, combined with a WiFi fallback bridge.
- **🤖 Gemini AI Copilot:** Smart dashboard assistant for herd-wide health anomaly detection, insight generation, and diagnostic assistance.

---

## 🏗️ Technology & Architecture

### Hardware Architecture

| Component         | Specification                      |
| :---------------- | :--------------------------------- |
| **MCU**           | ESP32-S3 (Dual-core 240MHz)        |
| **Accelerometer** | MPU6050 (50Hz sampling)            |
| **Thermistor**    | NTC 10kΩ ±0.1°C                    |
| **Pulse Sensor**  | Piezoelectric BPM                  |
| **Connectivity**  | LoRa SX1276 + WiFi fallback        |
| **Power**         | LiPo 500mAh (6-month battery life) |
| **Form Factor**   | 40×34mm ear tag                    |

### Software Stack

- **Frontend:** React, Vite, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Charts & Data Viz:** Recharts
- **Routing:** React Router DOM
- **Icons:** Lucide React

---

## 💸 Unit Economics (ROI)

**Without VITAL-TAG:**

- ❌ Diseases detected only after visible symptoms
- ❌ Average 5-7 day response lag
- ❌ ₦150,000+ loss per infected pig
- ❌ Herd-wide spread risk: 40-60%

**With VITAL-TAG:**

- ✅ 72-hour advance disease prediction
- ✅ Real-time automated monitoring 24/7
- ✅ ₦8,000 per tag unit cost at scale
- ✅ Outbreak containment: isolate in hours

_Saving a single pig pays for the entire pen's monitoring system._

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/vital-tag.git
   cd vital-tag
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080` (or the port provided by Vite).

---

## 🛡️ License

This project is proprietary and confidential. Unauthorized copying of this file, via any medium, is strictly prohibited.

---

_© 2026 VITAL-TAG. Predictive Edge-AI for Livestock Health Security._
