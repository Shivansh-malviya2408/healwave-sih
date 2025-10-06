import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveChart from "./LiveChart";
import { cn } from "@/lib/utils";

export function MetricCard({
  icon,
  label,
  value,
  unit,
  series,
  accentClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | null;
  unit: string;
  series: number[];
  accentClass?: string;
}) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-muted-foreground">{label}</CardTitle>
          <div className={cn("rounded-full p-2", accentClass)}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold tracking-tight">{value != null ? value.toFixed(0) : "--"}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-3">
          <LiveChart data={series} />
        </div>
      </CardContent>
    </Card>
  );
}


 