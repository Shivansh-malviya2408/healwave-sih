import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function HelpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-[10px]">Help</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Help & Guidance</SheetTitle>
          <SheetDescription>
            Quick tips for using HEALTH360. This assistant is not a medical device.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <p className="font-medium">Blynk Setup</p>
            <ol className="mt-1 list-decimal pl-5 space-y-1">
              <li>Go to Settings and paste your Blynk device auth token.</li>
              <li>Confirm virtual pins for SpO₂, Glucose, Heart Rate, Temperature.</li>
              <li>Data refreshes every 5 seconds automatically.</li>
            </ol>
          </div>
          <div>
            <p className="font-medium">Typical Ranges</p>
            <ul className="mt-1 list-disc pl-5 space-y-1">
              <li>SpO₂: ≥95%</li>
              <li>Glucose: 70–180 mg/dL (context dependent)</li>
              <li>Heart rate: 50–120 bpm (resting varies)</li>
              <li>Temperature: 36–37.8°C</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Get Support</p>
            <p className="text-muted-foreground">For deployment or data connections, use the MCP integrations (Neon, Supabase, Netlify, Vercel, etc.).</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
