import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const rows = [
  { file: "trade_data_20231026.csv", date: "Apr 12, 2023, 1:30:57 PM" },
  { file: "trade_data_20231102.csv", date: "Apr 13, 2023, 11:15:22 AM" },
  { file: "trade_data_20231105.csv", date: "Apr 14, 2023, 09:05:41 AM" },
  { file: "trade_data_20231105.csv", date: "Apr 14, 2023, 09:05:41 AM" },
];

export const ProcessedFilesTable = () => {
  return (
    <section className="glass-card rounded-2xl p-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Successfully Processed Files</h2>
      </header>

      <div className="overflow-hidden rounded-xl border border-border/50">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">File Name</th>
              <th className="px-5 py-3 font-medium">Upload Date &amp; Time</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-border/40 transition hover:bg-secondary/30"
              >
                <td className="px-5 py-4">
                  <a
                    href="#"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {row.file}
                  </a>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{row.date}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Success
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <TooltipProvider delayDuration={150}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-secondary"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        Hover state
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Pages</span>
        <span className="rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 text-foreground">1</span>
        <span>of 25</span>
        <button
          type="button"
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-secondary/40 text-foreground transition hover:bg-secondary"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-secondary/40 text-foreground transition hover:bg-secondary"
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
};

export default ProcessedFilesTable;