export type AnimalStatus = "healthy" | "warning" | "critical";

export interface Animal {
  id: string;
  tagId: string;
  name: string;
  pen: string;
  breed: string;
  weight: number;
  age: string;
  status: AnimalStatus;
  temp: number;
  heartRate: number;
  jawRhythm: number;
  lastUpdate: string;
  aiPrediction: string;
  riskScore: number;
}

export const animals: Animal[] = [
  { id: "001", tagId: "VT-001", name: "Pig #001", pen: "Pen A", breed: "Large White", weight: 92, age: "8 months", status: "healthy", temp: 38.4, heartRate: 82, jawRhythm: 1.52, lastUpdate: "2 min ago", aiPrediction: "Normal. Chewing rhythm indicates healthy feeding behavior.", riskScore: 5 },
  { id: "002", tagId: "VT-002", name: "Pig #002", pen: "Pen A", breed: "Duroc", weight: 88, age: "7 months", status: "healthy", temp: 38.6, heartRate: 78, jawRhythm: 1.48, lastUpdate: "1 min ago", aiPrediction: "Normal. All vitals within optimal range.", riskScore: 3 },
  { id: "003", tagId: "VT-003", name: "Pig #003", pen: "Pen A", breed: "Hampshire", weight: 95, age: "9 months", status: "healthy", temp: 38.3, heartRate: 80, jawRhythm: 1.55, lastUpdate: "3 min ago", aiPrediction: "Normal. Active feeding cycle detected.", riskScore: 4 },
  { id: "004", tagId: "VT-004", name: "Pig #004", pen: "Pen B", breed: "Landrace", weight: 90, age: "8 months", status: "healthy", temp: 38.5, heartRate: 84, jawRhythm: 1.50, lastUpdate: "1 min ago", aiPrediction: "Normal. Consistent vital patterns.", riskScore: 6 },
  { id: "005", tagId: "VT-005", name: "Pig #005", pen: "Pen B", breed: "Large White", weight: 87, age: "7 months", status: "warning", temp: 39.4, heartRate: 96, jawRhythm: 0.85, lastUpdate: "30 sec ago", aiPrediction: "Warning. Elevated temperature and reduced jaw activity. Possible early-stage infection. Monitor closely.", riskScore: 62 },
  { id: "006", tagId: "VT-006", name: "Pig #006", pen: "Pen B", breed: "Duroc", weight: 91, age: "8 months", status: "healthy", temp: 38.4, heartRate: 81, jawRhythm: 1.47, lastUpdate: "2 min ago", aiPrediction: "Normal. Steady rhythmic feeding.", riskScore: 7 },
  { id: "007", tagId: "VT-007", name: "Pig #007", pen: "Pen C", breed: "Hampshire", weight: 93, age: "9 months", status: "healthy", temp: 38.2, heartRate: 79, jawRhythm: 1.53, lastUpdate: "4 min ago", aiPrediction: "Normal. No anomalies detected.", riskScore: 2 },
  { id: "008", tagId: "VT-008", name: "Pig #008", pen: "Pen C", breed: "Landrace", weight: 86, age: "7 months", status: "healthy", temp: 38.5, heartRate: 83, jawRhythm: 1.49, lastUpdate: "1 min ago", aiPrediction: "Normal. Regular activity patterns.", riskScore: 5 },
  { id: "009", tagId: "VT-009", name: "Pig #009", pen: "Pen C", breed: "Large White", weight: 94, age: "9 months", status: "warning", temp: 39.1, heartRate: 92, jawRhythm: 1.02, lastUpdate: "45 sec ago", aiPrediction: "Warning. Slight jaw rhythm decrease detected. Feeding behavior deviating from baseline. Schedule veterinary check.", riskScore: 45 },
  { id: "010", tagId: "VT-010", name: "Pig #010", pen: "Pen D", breed: "Duroc", weight: 89, age: "8 months", status: "healthy", temp: 38.3, heartRate: 80, jawRhythm: 1.51, lastUpdate: "3 min ago", aiPrediction: "Normal. Optimal health indicators.", riskScore: 4 },
  { id: "011", tagId: "VT-011", name: "Pig #011", pen: "Pen D", breed: "Hampshire", weight: 96, age: "10 months", status: "healthy", temp: 38.6, heartRate: 85, jawRhythm: 1.46, lastUpdate: "2 min ago", aiPrediction: "Normal. Strong vital signs.", riskScore: 8 },
  { id: "104", tagId: "VT-104", name: "Pig #104", pen: "Pen D", breed: "Large White", weight: 84, age: "7 months", status: "critical", temp: 40.2, heartRate: 112, jawRhythm: 0.22, lastUpdate: "10 sec ago", aiPrediction: "CRITICAL. Jaw rhythm at 0.22 Hz — severe lethargy. Temperature 40.2°C indicates active fever. Heart rate elevated at 112 BPM. Immediate isolation recommended. Probable viral onset detected 68 hours before expected visible symptoms.", riskScore: 94 },
];
