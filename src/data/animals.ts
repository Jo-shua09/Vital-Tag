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

export const animals: Animal[] = [];
