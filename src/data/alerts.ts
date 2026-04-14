export type AlertSeverity = "critical" | "warning" | "info";

export interface Alert {
  id: string;
  timestamp: string;
  time: string;
  animalId: string;
  tagId: string;
  severity: AlertSeverity;
  message: string;
  metric?: string;
  value?: string;
}

export const alerts: Alert[] = [
  { id: "a1", timestamp: "2025-04-10", time: "10:45 AM", animalId: "104", tagId: "VT-104", severity: "critical", message: "Jaw Rhythm dropped to 0.22 Hz. Severe lethargy detected. Immediate isolation required.", metric: "Jaw Rhythm", value: "0.22 Hz" },
  { id: "a2", timestamp: "2025-04-10", time: "10:42 AM", animalId: "104", tagId: "VT-104", severity: "critical", message: "Body temperature exceeded 40°C threshold. Active fever confirmed.", metric: "Temperature", value: "40.2°C" },
  { id: "a3", timestamp: "2025-04-10", time: "10:40 AM", animalId: "104", tagId: "VT-104", severity: "critical", message: "Heart rate elevated to 112 BPM. Tachycardia alert triggered.", metric: "Heart Rate", value: "112 BPM" },
  { id: "a4", timestamp: "2025-04-10", time: "09:30 AM", animalId: "005", tagId: "VT-005", severity: "warning", message: "Jaw Rhythm declined to 0.85 Hz. Below healthy baseline of 1.5 Hz. Monitoring escalated.", metric: "Jaw Rhythm", value: "0.85 Hz" },
  { id: "a5", timestamp: "2025-04-10", time: "09:28 AM", animalId: "005", tagId: "VT-005", severity: "warning", message: "Temperature reading 39.4°C — approaching fever threshold.", metric: "Temperature", value: "39.4°C" },
  { id: "a6", timestamp: "2025-04-10", time: "08:15 AM", animalId: "009", tagId: "VT-009", severity: "warning", message: "Jaw Rhythm at 1.02 Hz. Feeding pattern deviation detected.", metric: "Jaw Rhythm", value: "1.02 Hz" },
  { id: "a7", timestamp: "2025-04-10", time: "07:00 AM", animalId: "000", tagId: "SYSTEM", severity: "info", message: "Daily health scan complete. 120 tags active. 9 healthy, 2 warnings, 1 critical." },
  { id: "a8", timestamp: "2025-04-09", time: "11:00 PM", animalId: "000", tagId: "SYSTEM", severity: "info", message: "LoRa Gateway firmware updated to v2.4.1. All nodes synchronized." },
  { id: "a9", timestamp: "2025-04-09", time: "06:00 PM", animalId: "104", tagId: "VT-104", severity: "warning", message: "Jaw Rhythm declining trend detected. 1.1 Hz → 0.8 Hz over 6 hours. Escalating to watch list.", metric: "Jaw Rhythm", value: "0.8 Hz" },
  { id: "a10", timestamp: "2025-04-09", time: "02:00 PM", animalId: "000", tagId: "SYSTEM", severity: "info", message: "Edge-AI model retrained with 48,000 new data points. Accuracy improved to 97.2%." },
];
