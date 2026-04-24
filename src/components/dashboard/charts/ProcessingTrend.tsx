import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", value: 60 },
  { day: "Tue", value: 75 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 110 },
  { day: "Sat", value: 130 },
  { day: "Week", value: 145 },
];

export const ProcessingTrend = () => {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(199 89% 65%)" stopOpacity={0.55} />
              <stop offset="100%" stopColor="hsl(199 89% 65%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border) / 0.4)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(199 89% 70%)"
            strokeWidth={2.5}
            fill="url(#trendArea)"
            dot={false}
            activeDot={{ r: 5, fill: "hsl(199 89% 70%)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProcessingTrend;