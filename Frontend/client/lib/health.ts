export type Severity = "normal" | "warning" | "critical";

export function getSpO2Status(v: number | null): Severity {
  if (v == null) return "normal";
  if (v < 90) return "critical";
  if (v < 95) return "warning";
  return "normal";
}

export function getGlucoseStatus(v: number | null): Severity {
  if (v == null) return "normal";
  if (v < 54 || v > 250) return "critical";
  if (v < 70 || v > 180) return "warning";
  return "normal";
}

export function getHeartRateStatus(v: number | null): Severity {
  if (v == null) return "normal";
  if (v < 40 || v > 140) return "critical";
  if (v < 50 || v > 120) return "warning";
  return "normal";
}

export function getTemperatureStatus(v: number | null): Severity {
  if (v == null) return "normal";
  if (v < 35 || v > 39.5) return "critical";
  if (v < 36 || v > 37.8) return "warning";
  return "normal";
}

export function statusClasses(sev: Severity): { ring: string; accent: string } {
  switch (sev) {
    case "critical":
      return { ring: "ring-2 ring-red-200", accent: "bg-red-100 text-red-700" };
    case "warning":
      return { ring: "ring-2 ring-amber-200", accent: "bg-amber-100 text-amber-800" };
    default:
      return { ring: "ring-1 ring-border", accent: "bg-emerald-100 text-emerald-800" };
  }
}
