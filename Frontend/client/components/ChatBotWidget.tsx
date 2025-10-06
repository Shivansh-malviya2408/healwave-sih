import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import { useRealtimeHealth } from "@/hooks/useRealtimeHealth";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! I’m your HEALTH360 assistant. Ask about your readings, safe ranges, or what to do next." },
  ]);
  const { health } = useRealtimeHealth();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  function reply(message: string) {
    const m = message.toLowerCase();
    const h = health;
    let out = "";

    if (/spo2|oxygen/.test(m) && typeof h.spo2.current === "number") {
      const v = h.spo2.current;
      out += `SpO₂ is ${v}%. ` + (v < 90 ? "Severely low — use prescribed oxygen and contact your doctor." : v < 95 ? "Below normal; sit upright, breathe slowly, and recheck." : "Looks normal (>=95%).");
    } else if (/glucose|sugar|mg\/dl/.test(m) && typeof h.glucose.current === "number") {
      const v = h.glucose.current;
      out += `Glucose is ${v} mg/dL. ` + (v < 54 ? "Severe hypoglycemia — take 15–20g fast carbs and consult your doctor." : v < 70 ? "Low — take 15g fast carbs and recheck in 15 minutes." : v > 250 ? "Very high — hydrate, follow insulin plan and contact your doctor if needed." : v > 180 ? "Elevated — hydrate and light activity if appropriate." : "In target range.");
    } else if (/heart|pulse|bpm/.test(m) && typeof h.heartRate.current === "number") {
      const v = h.heartRate.current;
      out += `Heart rate is ${v} bpm. ` + (v < 40 || v > 140 ? "Critical range — rest and contact your doctor." : v < 50 || v > 120 ? "Abnormal — rest, hydrate, and monitor." : "Within normal adult resting range.");
    } else if (/temp|temperature|fever|c/.test(m) && typeof h.temperature.current === "number") {
      const v = h.temperature.current;
      out += `Temperature is ${v.toFixed(1)}°C. ` + (v < 35 || v > 39.5 ? "Critical — seek immediate medical attention." : v < 36 || v > 37.8 ? "Abnormal — rest, hydrate, and monitor." : "Normal.");
    } else if (/help|range|normal/.test(m)) {
      out = "Typical adult ranges: SpO₂ ≥95%, Glucose 70–180 mg/dL (context dependent), Heart rate 50–120 bpm (resting varies), Temperature 36–37.8°C.";
    } else {
      out = "I’m a demo assistant. Ask about SpO₂, glucose, heart rate, or temperature. For medical emergencies, CONSULT YOUR DOCTOR.";
    }

    setMessages((prev) => [...prev, { role: "assistant", content: out }]);
  }

  function onSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => reply(text), 150);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <Button size="lg" className="rounded-full h-12 w-12 p-0 shadow-lg" onClick={() => setOpen(true)} aria-label="Open assistant">
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}
      {open && (
        <Card className="w-[320px] sm:w-[360px] h-[60vh] max-h-[640px] shadow-xl border"> 
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <div className="text-sm font-medium">HEALTH360 Assistant</div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div ref={scrollRef} className="px-3 py-2 overflow-y-auto h-[calc(60vh-116px)]">
            <div className="space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <span className={
                    m.role === "user"
                      ? "inline-block rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm"
                      : "inline-block rounded-md bg-muted text-foreground px-3 py-1.5 text-sm"
                  }>
                    {m.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={onSend} className="flex items-center gap-2 p-3 border-t">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your readings..." />
            <Button type="submit" size="icon" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
  