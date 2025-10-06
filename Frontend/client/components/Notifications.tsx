import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthData } from "@/hooks/useRealtimeHealth";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Notifications({ health }: { health: HealthData }) {
  const alerts = buildAlerts(health);
  const hasCritical = alerts.some((a) => a.severity === "critical");

  return (
    <Card className="mt-6" style={{ width: "100vh" }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Notifications</CardTitle>
          {hasCritical ? (
            <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-2.5 py-1 text-sm font-medium text-red-700">
              <AlertTriangle className="h-4 w-4" />
              CONSULT YOUR DOCTOR
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.length === 0 ? (
          <div className="flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-sm">All metrics are within normal ranges.</p>
          </div>
        ) : (
          alerts.map((a, i) => (
            <div
              key={i}
              className={
                a.severity === "critical"
                  ? "rounded-md border border-red-200 bg-red-50 p-3 text-red-800"
                  : a.severity === "warning"
                  ? "rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900"
                  : "rounded-md border border-sky-200 bg-sky-50 p-3 text-sky-900"
              }
            >
              <p className="text-sm leading-5">{a.message}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function buildAlerts(health: HealthData): { message: string; severity: "info" | "warning" | "critical" }[] {
  const alerts: { message: string; severity: "info" | "warning" | "critical" }[] = [];

  // SpO2
  const spo2 = health.spo2.current;
  if (typeof spo2 === "number") {
    if (spo2 < 90) alerts.push({ severity: "critical", message: `SpO₂ is ${spo2}%. Severe hypoxemia. Use prescribed oxygen and CONSULT YOUR DOCTOR.` });
    else if (spo2 < 95) alerts.push({ severity: "warning", message: `SpO₂ is ${spo2}%. Low. Sit upright, breathe slowly, check sensor alignment.` });
  }

  // Glucose (mg/dL)
  const glu = health.glucose.current;
  if (typeof glu === "number") {
    if (glu < 54) alerts.push({ severity: "critical", message: `Glucose ${glu} mg/dL. Severe hypoglycemia. Take 15–20g fast-acting carbs and CONSULT YOUR DOCTOR.` });
    else if (glu < 70) alerts.push({ severity: "warning", message: `Glucose ${glu} mg/dL. Hypoglycemia. Take 15g fast-acting carbs and recheck in 15 minutes.` });
    else if (glu > 250) alerts.push({ severity: "critical", message: `Glucose ${glu} mg/dL. Very high. Hydrate, check ketones if applicable, follow insulin plan and CONSULT YOUR DOCTOR.` });
    else if (glu > 180) alerts.push({ severity: "warning", message: `Glucose ${glu} mg/dL. Elevated. Hydrate, take a walk if appropriate, follow care plan.` });
  }

  // Heart rate (bpm)
  const hr = health.heartRate.current;
  if (typeof hr === "number") {
    if (hr < 40 || hr > 140) alerts.push({ severity: "critical", message: `Heart rate ${hr} bpm. Potentially dangerous. Rest and CONSULT YOUR DOCTOR.` });
    else if (hr < 50 || hr > 120) alerts.push({ severity: "warning", message: `Heart rate ${hr} bpm. Abnormal. Rest, hydrate, and monitor symptoms.` });
  }

  // Temperature (°C)
  const t = health.temperature.current;
  if (typeof t === "number") {
    if (t < 35 || t > 39.5) alerts.push({ severity: "critical", message: `Temperature ${t.toFixed(1)}°C. Critical range. Seek immediate medical attention and CONSULT YOUR DOCTOR.` });
    else if (t < 36 || t > 37.8) alerts.push({ severity: "warning", message: `Temperature ${t.toFixed(1)}°C. Abnormal. Rest, hydrate, and monitor.` });
  }

  return alerts;
}
