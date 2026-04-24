import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "12/04", total: 380, processed: 350, failed: 30 },
  { date: "13/04", total: 320, processed: 300, failed: 20 },
  { date: "14/04", total: 410, processed: 380, failed: 30 },
  { date: "15/04", total: 360, processed: 340, failed: 20 },
  { date: "16/04", total: 430, processed: 405, failed: 25 },
  { date: "17/04", total: 395, processed: 370, failed: 25 },
  { date: "18/04", total: 350, processed: 330, failed: 20 },
];

export const FileProcessingBars = () => {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }} barCategoryGap={14}>
          <CartesianGrid stroke="hsl(var(--border) / 0.4)" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "hsl(var(--secondary) / 0.4)" }}
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              fontSize: 12,
            }}
          />
          <Bar dataKey="total" stackId="a" fill="hsl(210 40% 98% / 0.25)" radius={[0, 0, 0, 0]} />
          <Bar dataKey="processed" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} />
          <Bar dataKey="failed" stackId="a" fill="hsl(var(--error))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center justify-center gap-5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-foreground/30" />Total Files</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-success" />Processed</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-error" />Failed</span>
      </div>
    </div>
  );
};

export default FileProcessingBars;