import { ResponsiveContainer, LineChart, Line, YAxis, Tooltip } from "recharts";

export default function LiveChart({ data, color = "#0ea5e9" }: { data: number[]; color?: string }) {
  const points = data.map((y, i) => ({ i, y }));
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
          <YAxis hide domain={["auto", "auto"]} />
          <Tooltip cursor={{ stroke: color, strokeOpacity: 0.15 }} formatter={(val) => String(val)} labelFormatter={() => ""} contentStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

 