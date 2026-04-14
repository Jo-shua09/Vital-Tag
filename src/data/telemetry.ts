export interface TelemetryPoint {
  time: string;
  jawRhythm: number;
  heartRate: number;
  temp: number;
}

export function generateTelemetryPoint(
  status: "healthy" | "warning" | "critical",
  index: number
): TelemetryPoint {
  const t = index * 0.3;
  const now = new Date();
  now.setSeconds(now.getSeconds() - (30 - index));
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (status === "healthy") {
    return {
      time: timeStr,
      jawRhythm: 1.5 + Math.sin(t) * 0.15 + (Math.random() - 0.5) * 0.05,
      heartRate: 82 + Math.sin(t * 0.7) * 4 + (Math.random() - 0.5) * 2,
      temp: 38.4 + Math.sin(t * 0.3) * 0.15 + (Math.random() - 0.5) * 0.05,
    };
  } else if (status === "warning") {
    return {
      time: timeStr,
      jawRhythm: 0.9 + Math.sin(t) * 0.25 + (Math.random() - 0.5) * 0.15,
      heartRate: 94 + Math.sin(t * 0.8) * 6 + (Math.random() - 0.5) * 4,
      temp: 39.3 + Math.sin(t * 0.4) * 0.2 + (Math.random() - 0.5) * 0.1,
    };
  } else {
    return {
      time: timeStr,
      jawRhythm: 0.2 + Math.random() * 0.3 + Math.sin(t * 2) * 0.1,
      heartRate: 110 + Math.random() * 15 + Math.sin(t * 1.5) * 8,
      temp: 40.1 + Math.random() * 0.4 + Math.sin(t * 0.5) * 0.15,
    };
  }
}

export function generateInitialTelemetry(status: "healthy" | "warning" | "critical", count = 30): TelemetryPoint[] {
  return Array.from({ length: count }, (_, i) => generateTelemetryPoint(status, i));
}

export const herdHealthHistory = [
  { day: "Mon", healthy: 118, warning: 1, critical: 0 },
  { day: "Tue", healthy: 117, warning: 2, critical: 0 },
  { day: "Wed", healthy: 118, warning: 1, critical: 0 },
  { day: "Thu", healthy: 116, warning: 3, critical: 0 },
  { day: "Fri", healthy: 115, warning: 3, critical: 1 },
  { day: "Sat", healthy: 114, warning: 4, critical: 1 },
  { day: "Sun", healthy: 117, warning: 2, critical: 1 },
];
