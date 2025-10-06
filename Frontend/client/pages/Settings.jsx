
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// Assuming these imports work correctly in the JS environment
import { loadBlynkConfig, saveBlynkConfig } from "@/api/blynkCloud"; 
import NavBar from "../components/NavBar";

export default function Settings() {
  const [token, setToken] = useState("");
  // Removed explicit type annotation for pins
  const [pins, setPins] = useState({ spo2: "V1", glucose: "V2", heartRate: "V3", temperature: "V4" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const cfg = loadBlynkConfig();
    if (cfg) {
      setToken(cfg.token);
      setPins(cfg.pins);
    }
  }, []);

  function save() {
    // Removed explicit type annotation for cfg
    const cfg = { token: token.trim(), pins };
    saveBlynkConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <NavBar/>
      <div className="container py-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
        Enter your Blynk device auth token and the virtual pins for each metric. Data refreshes every 5 seconds.
      </p>
      <div className="mt-6 grid gap-6 max-w-2xl">
        <div className="grid gap-2">
          <Label htmlFor="token">Blynk Device Auth Token</Label>
          <Input id="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="e.g. abcd1234...." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="spo2">SpO₂ Pin</Label>
            <Input 
              id="spo2" 
              value={pins.spo2} 
              onChange={(e) => setPins({ ...pins, spo2: e.target.value })} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="glucose">Glucose Pin</Label>
            <Input 
              id="glucose" 
              value={pins.glucose} 
              onChange={(e) => setPins({ ...pins, glucose: e.target.value })} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="heart">Heart Rate Pin</Label>
            <Input 
              id="heart" 
              value={pins.heartRate} 
              onChange={(e) => setPins({ ...pins, heartRate: e.target.value })} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="temp">Temperature Pin</Label>
            <Input 
              id="temp" 
              value={pins.temperature} 
              onChange={(e) => setPins({ ...pins, temperature: e.target.value })} 
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={save}>Save</Button>
          {saved && <span className="text-sm text-green-600 self-center">Saved</span>}
        </div>
      </div>
      </div>
    </div>
  );
}