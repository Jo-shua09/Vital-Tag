import { Animal } from "@/data/animals";

const API_BASE_URL = "https://vitaltag.onrender.com/api";

export interface Tag {
  _id: string;
  tagId: string;
  pigLabel: string;
  pen: string;
  lastReading: {
    tempC: number;
    chewHz: number;
    pulseBpm: number;
    timestamp: string;
  };
  healthStatus: "healthy" | "warning" | "critical";
  // These fields are from the old 'Animal' type and might need to be mapped or are not available from this endpoint
  breed: string;
  weight: number;
  age: string;
}

export interface Reading {
  _id: string;
  tagId: string;
  tempC: number;
  chewHz: number;
  pulseBpm: number;
  timestamp: string;
}

export interface ApiAlert {
  _id: string;
  tagId: string;
  message: string;
  severity: "info" | "warning" | "critical";
  metric: string;
  value: string;
  timestamp: string;
  acknowledged: boolean;
}

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new Error(errorInfo.message || "An error occurred while fetching data.");
  }
  return response.json();
}

export const getHerdOverview = (): Promise<Tag[]> => {
  return fetcher<Tag[]>("/tags");
};

export const getReadingHistory = (tagId: string, limit = 100): Promise<Reading[]> => {
  return fetcher<Reading[]>(`/readings/${tagId}?limit=${limit}`);
};

export const getAlerts = (acknowledged: boolean): Promise<ApiAlert[]> => {
  return fetcher<ApiAlert[]>(`/alerts?acknowledged=${acknowledged}`);
};

export const acknowledgeAlert = (alertId: string): Promise<{ message: string }> => {
  return fetcher(`/alerts/${alertId}/ack`, {
    method: "PATCH",
  });
};

export const ingestReading = (reading: { tagId: string; tempC: number; chewHz: number; pulseBpm: number }): Promise<Reading> => {
  return fetcher<Reading>("/readings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...reading, timestamp: new Date().toISOString() }),
  });
};

// Helper to adapt API Tag to local Animal type
export const adaptTagToAnimal = (tag: Tag): Animal => ({
  id: tag.tagId,
  tagId: tag.tagId,
  status: tag.healthStatus,
  ...tag.lastReading,
  temp: tag.lastReading.tempC,
  heartRate: tag.lastReading.pulseBpm,
  jawRhythm: tag.lastReading.chewHz,
  ...tag, // includes pen, pigLabel, etc.
  // Provide sensible defaults for properties not available from the API
  name: tag.pigLabel || tag.tagId,
  lastUpdate: new Date(tag.lastReading.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  breed: tag.breed || "N/A",
  weight: tag.weight || 0,
  age: tag.age || "N/A",
  aiPrediction: "Awaiting Data",
  riskScore: 0,
});
