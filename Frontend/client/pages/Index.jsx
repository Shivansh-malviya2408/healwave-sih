import { useRealtimeHealth } from "@/hooks/useRealtimeHealth";
import { MetricCard } from "@/components/MetricCard";
import { Droplets, HeartPulse, Thermometer, FlaskConical } from "lucide-react";
import Notifications from "@/components/Notifications";
import { useAuth } from "@/providers/AuthProvider.jsx";
import NavBar from "@/components/NavBar.jsx";
import {jwtDecode} from "jwt-decode"
import { useState } from "react";
import { jwt } from "zod/v4";

export default function Index() {
  const { health, isConfigured, lastUpdated, refreshConfig } = useRealtimeHealth();
  const { user } = useAuth();

    let userName=""
   
  if(localStorage.getItem("credentials"))
  {
      userName=JSON.parse(localStorage.getItem("credentials")).name.split(" ")[0]
  } 
  else 
  {
    const email=localStorage.getItem("email")
    userName= JSON.parse(localStorage.getItem('users')).find((u)=>
    {
      if(u.email === email)  return u;
    }).name.split(" ")[0];
  
  }

  
  
  
   
  

  return (
    <div className="min-h-[calc(100vh-56px)]">

      <NavBar />
      <section className="container py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight uppercase">WELCOME, {userName}</h1>
            <p className="text-sm text-muted-foreground pl-[3px]">Welcome to Your Health Dashboard<br /></p>
          </div>
        </div>

        {!isConfigured && (
          <div className="mt-6 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            No Blynk token/pins configured. Go to Settings to enter your device auth token and pin mapping.
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<FlaskConical className="h-4 w-4 text-emerald-600" />}
            label="Glucose"
            value={health.glucose.current}
            unit={health.glucose.unit}
            series={health.glucose.values}
            accentClass="bg-emerald-100 text-emerald-700"
          />
          <MetricCard
            icon={<Droplets className="h-4 w-4 text-sky-600" />}
            label="SpO₂"
            value={health.spo2.current}
            unit={health.spo2.unit}
            series={health.spo2.values}
            accentClass="bg-sky-100 text-sky-700"
          />
          <MetricCard
            icon={<HeartPulse className="h-4 w-4 text-rose-600" />}
            label="Heart Rate"
            value={health.heartRate.current}
            unit={health.heartRate.unit}
            series={health.heartRate.values}
            accentClass="bg-rose-100 text-rose-700"
          />
          <MetricCard
            icon={<Thermometer className="h-4 w-4 text-amber-600" />}
            label="Body Temp"
            value={health.temperature.current}
            unit={health.temperature.unit}
            series={health.temperature.values}
            accentClass="bg-amber-100 text-amber-700"
          />
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          {lastUpdated ? (
            <span>Last updated: {new Date(lastUpdated).toLocaleTimeString()}</span>
          ) : (
            <span>Waiting for data...</span>
          )}
        </div>

        <Notifications health={health} />
      </section>
    </div>
  );
}
