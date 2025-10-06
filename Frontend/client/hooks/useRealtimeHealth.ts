import { useCallback, useEffect, useRef, useState } from "react";
import { BlynkConfig, fetchBlynkValue, loadBlynkConfig } from "@/api/blynkCloud";

export type MetricSeries = {
  label: string;
  unit: string;
  color: string;
  values: number[];
  current: number | null;
};

export type HealthData = {
  spo2: MetricSeries;
  glucose: MetricSeries;
  heartRate: MetricSeries;
  temperature: MetricSeries;
};

const MAX_POINTS = 50;
const INTERVAL_MS = 5000;

export function useRealtimeHealth() {
  const [config, setConfig] = useState<BlynkConfig | null>(() => loadBlynkConfig());
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const [health, setHealth] = useState<HealthData>(() => ({
    spo2: { label: "SpO₂", unit: "%", color: "#0ea5e9", values: [], current: null },
    glucose: { label: "Glucose", unit: "mg/dL", color: "#22c55e", values: [], current: null },
    heartRate: { label: "Heart Rate", unit: "bpm", color: "#ef4444", values: [], current: null },
    temperature: { label: "Temperature", unit: "°C", color: "#f59e0b", values: [], current: null },
  }));

  const timerRef = useRef<number | null>(null);

  const isConfigured = !!config?.token && !!config?.pins?.spo2 && !!config?.pins?.glucose && !!config?.pins?.heartRate && !!config?.pins?.temperature;

  const poll = useCallback(async () => {
    if (!isConfigured || !config) return;
    setError(null);
    const { token, pins } = config;
    const [spo2, glucose, heartRate, temperature] = await Promise.all([
      fetchBlynkValue(token, pins.spo2),
      fetchBlynkValue(token, pins.glucose),
      fetchBlynkValue(token, pins.heartRate),
      fetchBlynkValue(token, pins.temperature),
    ]);

    setHealth((prev) => ({
      spo2: updateSeries(prev.spo2, spo2),
      glucose: updateSeries(prev.glucose, glucose),
      heartRate: updateSeries(prev.heartRate, heartRate),
      temperature: updateSeries(prev.temperature, temperature),
    }));
    setLastUpdated(Date.now());
  }, [config, isConfigured]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    // initial read
    poll();
    // interval
    timerRef.current = window.setInterval(poll, INTERVAL_MS);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [poll, paused]);

  const refreshConfig = useCallback(() => setConfig(loadBlynkConfig()), []);
  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);
  const refresh = useCallback(() => poll(), [poll]);

  return { health, isConfigured, lastUpdated, error, refreshConfig, paused, pause, resume, refresh };
}

function updateSeries(series: MetricSeries, nextVal: number | null): MetricSeries {
  const nextValues = [...series.values];
  const value = nextVal ?? (nextValues.length ? nextValues[nextValues.length - 1] : null);
  if (value != null) nextValues.push(value);
  if (nextValues.length > MAX_POINTS) nextValues.splice(0, nextValues.length - MAX_POINTS);
  return { ...series, values: nextValues, current: nextVal };
}
