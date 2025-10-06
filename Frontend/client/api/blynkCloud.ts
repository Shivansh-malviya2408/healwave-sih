export type BlynkPins = {
  spo2: string; // e.g. "V1"
  glucose: string; // e.g. "V2"
  heartRate: string; // e.g. "V3"
  temperature: string; // e.g. "V4"
};

export type BlynkConfig = {
  token: string;
  pins: BlynkPins;
};

const STORAGE_KEY = "app.blynk.config";

export function loadBlynkConfig(): BlynkConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BlynkConfig;
    if (!parsed?.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBlynkConfig(next: BlynkConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export type MetricKey = keyof BlynkPins;

export const METRIC_UNITS: Record<MetricKey, string> = {
  spo2: "%",
  glucose: "mg/dL",
  heartRate: "bpm",
  temperature: "°C",
};

export async function fetchBlynkValue(token: string, pin: string): Promise<number | null> {
  try {
    const res = await fetch(`/api/blynk/value?token=${encodeURIComponent(token)}&pin=${encodeURIComponent(pin)}`);
    if (!res.ok) throw new Error("Blynk proxy error");
    const data = (await res.json()) as { value: string | number | null };
    if (data == null || data.value == null) return null;
    const n = typeof data.value === "string" ? parseFloat(data.value) : data.value;
    return Number.isFinite(n) ? n : null;
  } catch (e) {
    return null;
  }
}
