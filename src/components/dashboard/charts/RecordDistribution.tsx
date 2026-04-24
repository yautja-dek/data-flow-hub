import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Successful Records", value: 95, color: "hsl(var(--success))" },
  { name: "Failed Records", value: 5, color: "hsl(var(--error))" },
];

export const RecordDistribution = () => {
  return (
    <div className="flex h-[260px] flex-col items-center">
      <div className="relative h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tracking-tight text-foreground">95%</span>
          <span className="text-xs text-muted-foreground">Success</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordDistribution;